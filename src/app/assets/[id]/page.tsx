"use client";
import { useState, useEffect } from "react";
import useRefreshMetadata, {
  useFetchNFTMetadata,
  useGetAccountAddress,
} from "@hooks/index";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import CopyButton from "@components/utils/CopyButton";
import { useAccount, useNetwork } from "@starknet-react/core";
import Tooltip from "@components/utils/tooltip";
import { RpcProvider, num } from "starknet";
import { AccountClassHashes } from "@utils/constants";
import Link from "next/link";
import { TBAVersion, TokenboundClient } from "starknet-tokenbound-sdk";
import Button from "ui/button";
import { SwitchIcon } from "@public/icons/icon";
import Portfolio from "./components/Portfolio";

const url = process.env.NEXT_PUBLIC_EXPLORER;
const sepolia_url = process.env.NEXT_PUBLIC_TESTNET_EXPLORER;

function Assets() {
  const [isVisible, setIsVisible] = useState(false);

  const [version, setVersion] = useState<{
    v2: { address: string; status: boolean };
    v3: { address: string; status: boolean };
  }>({
    v2: { address: "", status: false },
    v3: { address: "", status: false },
  });
  const [activeVersion, setActiveVersion] = useState<{
    version: "V3" | "V2";
    address: string;
  }>({
    version: "V3",
    address: "",
  });

  const { chain } = useNetwork();
  const { account } = useAccount();

  const provider = new RpcProvider({
    nodeUrl: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  });

  let { id } = useParams();
  let contractAddress = id.slice(0, 66) as string;
  let tokenId = id.slice(66) as string;
  const { nft } = useFetchNFTMetadata(contractAddress, tokenId);

  const [tokenbound, setTokenbound] = useState<TokenboundClient | undefined>(
    undefined,
  );
  const [tokenboundV2, setTokenboundV2] = useState<
    TokenboundClient | undefined
  >(undefined);

  const [deployedAddress, setDeployedAddress] = useState<string>("");
  const [deployedAddressV2, setDeployedAddressV2] = useState<string>("");

  useEffect(() => {
    if (account && chain) {
      const options = {
        account: account,
        chain_id: chain.network === "mainnet" ? "SN_MAIN" : "SN_SEPOLIA",
        version: "V3",
        jsonRPC: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      };
      const tb = new TokenboundClient(options);
      setTokenbound(tb);
    }
  }, [account, chain]);

  useEffect(() => {
    if (account && chain) {
      const options = {
        account: account,
        chain_id: chain.network === "mainnet" ? "SN_MAIN" : "SN_SEPOLIA",
        version: "V2",
        jsonRPC: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      };
      const tb = new TokenboundClient(options);
      setTokenboundV2(tb);
    }
  }, [account, chain]);

  useEffect(() => {
    if (tokenbound) {
      const getAccountAddress = async () => {
        try {
          const accountResult = await tokenbound.getAccount({
            tokenContract: contractAddress,
            tokenId,
          });
          setDeployedAddress(num.toHex(accountResult));
        } catch (error) {
          console.error(error);
        }
      };
      getAccountAddress();
    }
  }, [tokenbound, account, contractAddress, tokenId, chain]);

  useEffect(() => {
    if (tokenboundV2) {
      const getAccountAddress = async () => {
        try {
          const accountResult = await tokenboundV2.getAccount({
            tokenContract: contractAddress,
            tokenId,
          });
          setDeployedAddressV2(num.toHex(accountResult));
        } catch (error) {
          console.error(error);
        }
      };
      getAccountAddress();
    }
  }, [tokenboundV2, account, contractAddress, tokenId, chain]);

  useEffect(() => {
    let network = chain.network;
    let v2Implementation =
      AccountClassHashes.V2[network as keyof typeof AccountClassHashes.V2];
    let v3Implementation =
      AccountClassHashes.V3[network as keyof typeof AccountClassHashes.V3];
    const fetchClassHash = async () => {
      if (deployedAddress) {
        try {
          const tbaClassHash = await provider.getClassHashAt(deployedAddress);
          if (tbaClassHash) {
            if (tbaClassHash === v3Implementation) {
              setVersion((prev) => {
                return {
                  ...prev,
                  v3: {
                    address: deployedAddress,
                    status: true,
                  },
                };
              });
            }
          }
        } catch (error) {
          console.error(error);
        }
      }
      try {
        const tbaHashV2 = await provider.getClassHashAt(deployedAddressV2);
        if (tbaHashV2) {
          if (tbaHashV2 === v2Implementation) {
            setVersion((prev) => {
              return {
                ...prev,
                v2: {
                  address: deployedAddressV2,
                  status: true,
                },
              };
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchClassHash();
  }, [deployedAddress, deployedAddressV2, account, chain]);

  useEffect(() => {
    if (version.v2.status && version.v3.status) {
      setActiveVersion({ address: version.v3.address, version: "V3" });
    } else if (version.v3.status) {
      setActiveVersion({ address: version.v3.address, version: "V3" });
    } else {
      setActiveVersion({ address: version.v2.address, version: "V2" });
    }
  }, [version]);

  const deployAccount = async () => {
    try {
      await tokenbound?.createAccount({
        tokenContract: contractAddress,
        tokenId: tokenId,
      });
      toast.info("Account was deployed successfully!");
    } catch (err) {
      console.log(err);
      toast.error("An error was encountered during the course of deployment!");
    }
  };

  const upgradeAccount = async () => {
    let network = chain.network;
    let v3Implementation =
      AccountClassHashes.V3[network as keyof typeof AccountClassHashes.V3];
    try {
      await tokenboundV2?.upgrade({
        tbaAddress: deployedAddressV2,
        newClassHash: v3Implementation,
      });
      // handleVersionSwitch(TBAVersion.V3);
      toast.info("Account was upgraded successfully!");
    } catch (err) {
      console.log(err);
      toast.error("An error was encountered during the course of upgrade!");
    }
  };

  const isUpgradable = !version.v3.status && version.v2.status;
  const isDeployable = !version.v2.status && !version.v3.status;

  return (
    <section className="container mx-auto min-h-screen px-4 pb-16 pt-32">
      <div className="mx-auto max-w-[1100px]">
        <h2 className="mb-8 text-deep-blue"> Token Bound Account</h2>

        <div className="grid w-full grid-cols-[1fr] gap-8 md:grid-cols-2">
          <div className="w-full rounded-[8px]">
            {nft?.image ? (
              <img
                className="!h-[480px] !w-[673px] rounded-[8px] object-cover"
                src={nft.image}
                width={673}
                height={480}
                alt="NFT Image"
              />
            ) : (
              <div
                aria-label="loader"
                className="h-full min-h-[500px] w-full animate-pulse rounded-[8px] bg-[#eae9e9]"
              ></div>
            )}
          </div>
          <div>
            <div className="flex h-fit items-center gap-4">
              <h3
                className={`${
                  nft.name
                    ? "text-deep-blue"
                    : "h-[1.2rem] w-[10rem] animate-pulse rounded-full bg-[#eae9e9]"
                } `}
              >
                {nft.name || ""}
              </h3>

              <Button
                variant={"ghost"}
                title="switch versions"
                className="flex w-[74px] items-center justify-center gap-2 rounded-[4px] bg-[#eae9e9] py-3 text-sm"
              >
                <span>V3</span>
                <span>
                  <SwitchIcon />
                </span>
              </Button>

              <div>
                <div className="flex items-center rounded-[6px] bg-[#eae9e9] text-sm">
                  <Tooltip message="Click to copy">
                    <CopyButton
                      className="px-2 py-3 text-center"
                      textToCopy={activeVersion.address}
                    />
                  </Tooltip>
                  <Link
                    href={`${
                      chain.network === "mainnet"
                        ? url
                        : chain.network === "sepolia"
                          ? sepolia_url
                          : ""
                    }/contract/${deployedAddress}`}
                    target="__blank"
                    title="view on starkscan"
                    className="inline-flex h-full items-center rounded-r-[6px] border border-l-deep-blue px-2 py-3 text-lg transition-all hover:bg-deep-blue hover:text-white"
                  >
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="1em"
                        height="1em"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fill="none"
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M7 7h10v10M7 17L17 7"
                        />
                      </svg>
                    </span>
                  </Link>
                </div>
              </div>
              <div>
                <>
                  {isDeployable ? (
                    <Button onClick={deployAccount}>Deploy Account</Button>
                  ) : isUpgradable ? (
                    <Button onClick={upgradeAccount}>Upgrade Account</Button>
                  ) : version.v3.status ? (
                    <Button disabled>TBA Deployed</Button>
                  ) : null}
                </>
              </div>
            </div>
            {nft?.description ? (
              <p className="mt-[18px]">{nft.description}</p>
            ) : (
              <div aria-label="loader" className="flex flex-col gap-4">
                <div className="h-[1.2rem] w-[75%] animate-pulse rounded-full bg-[#eae9e9]"></div>
                <div className="h-[1.2rem] w-[75%] animate-pulse rounded-full bg-[#eae9e9]"></div>
              </div>
            )}
            <Portfolio
              contractAddress={contractAddress}
              tbaAddress={activeVersion.address}
              tokenId={tokenId}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Assets;
