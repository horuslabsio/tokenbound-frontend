"use client";
import { useState, useEffect } from "react";
import { FaGem, FaCoins } from "react-icons/fa";
import useRefreshMetadata, {
  useFetchNFTMetadata,
  useGetAccountAddress,
} from "@hooks/index";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import FungibleAsset from "@components/Assets/index";
import NonFungibleAsset from "@components/Assets/Tbanft";
import CopyButton from "@components/utils/CopyButton";
import { useAccount, useNetwork } from "@starknet-react/core";
import Tooltip from "@components/utils/tooltip";
import { RpcProvider, num } from "starknet";
import { AccountClassHashes } from "@utils/constants";
import Link from "next/link";
import { TBAVersion, TokenboundClient } from "starknet-tokenbound-sdk";

const url = process.env.NEXT_PUBLIC_EXPLORER;
const sepolia_url = process.env.NEXT_PUBLIC_TESTNET_EXPLORER;

function Assets() {
  const [isCollectible, setIsCollectible] = useState(true);
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

  const toggleContent = () => {
    setIsCollectible((prevIsCollectible) => !prevIsCollectible);
  };

  const provider = new RpcProvider({
    nodeUrl: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  });

  let { id } = useParams();
  let contractAddress = id.slice(0, 66) as string;
  let tokenId = id.slice(66) as string;
  const { nft } = useFetchNFTMetadata(contractAddress, tokenId);

  const [tokenbound, setTokenbound] = useState<TokenboundClient | undefined>(
    undefined
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
  }, [account, chain, status]);

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
  }, [account, chain, status]);

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

  const { refreshMetadata, loading, success } = useRefreshMetadata(
    contractAddress,
    tokenId
  );

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
      await tokenbound?.upgrade({
        tbaAddress: deployedAddress,
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
    <section className="container mx-auto min-h-screen pt-32 pb-16 px-4 ">
      <section className="min-h-screen">
        <h2 className="text-deep-blue mb-8">My NFT Collections</h2>

        <div className="grid grid-cols-[1fr] md:grid-cols-2 gap-8 w-full">
          <div className=" w-full rounded-[8px]">
            {nft?.image ? (
              <img
                className="!w-[673px] !h-[480px] rounded-[8px] object-cover"
                src={nft.image}
                width={673}
                height={480}
                alt="NFT Image"
              />
            ) : (
              <div
                aria-label="loader"
                className=" w-full min-h-[500px] h-full bg-[#eae9e9] rounded-[8px] animate-pulse"
              ></div>
            )}
          </div>
          <div>
            <div className="flex  gap-4 items-center h-fit">
              <h3
                className={`${
                  nft.name
                    ? "text-deep-blue"
                    : "w-[10rem] h-[1.2rem] rounded-full bg-[#eae9e9] animate-pulse"
                }  `}
              >
                {nft.name || ""}
              </h3>
              {version.v2.status && version.v3.status && (
                <button
                  title="switch versions"
                  className="bg-[#eae9e9] flex items-center text-sm justify-center  gap-2  w-[74px] py-3 rounded-[4px]"
                >
                  <span>V3</span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="1em"
                      height="1em"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="currentColor"
                        fill-rule="evenodd"
                        d="M8 1a.5.5 0 0 1 .374.168l4 4.5l-.748.664L8 2.252l-3.626 4.08l-.748-.664l4-4.5A.5.5 0 0 1 8 1m0 12.747l-3.626-4.08l-.748.665l4 4.5a.5.5 0 0 0 .748 0l4-4.5l-.748-.664z"
                        clip-rule="evenodd"
                      />
                    </svg>
                  </span>
                </button>
              )}

              <div>
                <div className="flex bg-[#eae9e9] rounded-[6px] text-sm  items-center">
                  <CopyButton
                    className="px-2 py-3 text-center"
                    textToCopy={activeVersion.address}
                  />
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
                    className="text-lg inline-flex rounded-r-[6px] items-center py-3 px-2 h-full border border-l-deep-blue hover:bg-deep-blue transition-all hover:text-white"
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
                    <button
                      onClick={deployAccount}
                      className="bg-deep-blue text-sm text-white px-4 py-3 rounded-[6px] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Deploy Account
                    </button>
                  ) : isUpgradable ? (
                    <button
                      className="bg-deep-blue text-sm text-white px-4 py-3 rounded-[6px] disabled:cursor-not-allowed disabled:opacity-50"
                      onClick={upgradeAccount}
                    >
                      Upgrade Account
                    </button>
                  ) : version.v3.status ? (
                    <button
                      disabled
                      className="bg-deep-blue text-sm text-white px-4 py-3 rounded-[6px] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      TBA Deployed
                    </button>
                  ) : null}
                </>
              </div>
            </div>
            {nft?.description ? (
              <p className="mt-[18px]">{nft.description}</p>
            ) : (
              <div aria-label="loader" className="flex flex-col gap-4">
                <div className="w-[75%] h-[1.2rem] rounded-full bg-[#eae9e9] animate-pulse"></div>
                <div className="w-[75%] h-[1.2rem] rounded-full bg-[#eae9e9] animate-pulse"></div>
              </div>
            )}
            <div>
              <div className="mt-6 flex items-center gap-[12px] p-2 bg-[#EFEFEF] rounded-[8px] w-fit">
                <button
                  onClick={toggleContent}
                  className={`${
                    isCollectible
                      ? "bg-[#0C0C4F] text-white"
                      : "bg-[#F2F2F2] text-gray-400"
                  } cursor-pointer  rounded-[6px] gap-x-1 p-2 flex items-center transition-all duration-500`}
                >
                  <FaGem size={20} />
                  Collectible
                </button>
                <button
                  onClick={toggleContent}
                  className={`${
                    !isCollectible
                      ? "bg-[#0C0C4F] text-white"
                      : "bg-[#F2F2F2] text-gray-400"
                  } cursor-pointer gap-x-1 rounded-[6px] flex items-center p-2 transition-all duration-500`}
                >
                  <FaCoins size={20} />
                  Assets
                </button>
                <Tooltip message="click to refresh asset if metadata does not display">
                  <button
                    onClick={refreshMetadata}
                    disabled={loading}
                    type="button"
                    className={`${
                      loading ? "bg-red-300" : ""
                    } cursor-pointer  bg-red-500 text-white rounded-[6px] gap-x-1 p-2 flex items-center transition-all duration-500`}
                  >
                    Refresh metadata
                  </button>
                  {success?.status == 200 && isVisible ? (
                    <p className="absolute bg-blue-500 text-white text-xs pl-1 pr-1  rounded-lg  transition ease-in-out duration-300">
                      {success?.data.result}
                    </p>
                  ) : (
                    ""
                  )}
                </Tooltip>
              </div>
              {isCollectible ? (
                <NonFungibleAsset tba={activeVersion.address} />
              ) : (
                <FungibleAsset tokenBoundAddress={activeVersion.address} />
              )}{" "}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Assets;
