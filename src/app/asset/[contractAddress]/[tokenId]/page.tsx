"use client";
import { useState, useEffect } from "react";
import { useFetchNFTMetadata, useGetTbaAddress } from "@hooks/index";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import CopyButton from "@components/utils/CopyButton";
import { useAccount, useNetwork } from "@starknet-react/core";
import Tooltip from "@components/utils/tooltip";
import { RpcProvider } from "starknet";
import { AccountClassHashes } from "@utils/constants";
import Link from "next/link";
import Button from "ui/button";
import { NewTbaIcon, SwitchIcon } from "@public/icons/icon";
import Portfolio from "./components/Portfolio";
import { useTokenBoundSDK } from "@hooks/useTokenboundHookContext";

const url = process.env.NEXT_PUBLIC_EXPLORER;
const sepolia_url = process.env.NEXT_PUBLIC_TESTNET_EXPLORER;

function Assets() {
  const { tokenboundV2, tokenboundV3, activeVersion, setVersion } =
    useTokenBoundSDK();
  const [v2Address, setV2Address] = useState<string>("");
  const [v3Address, setV3Address] = useState<string>("");

  const { chain } = useNetwork();
  const { account } = useAccount();

  const provider = new RpcProvider({
    nodeUrl: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  });

  const params = useParams();

  let contractAddress = params.contractAddress as string;
  let tokenId = params.tokenId as string;

  const { nft } = useFetchNFTMetadata(contractAddress, tokenId);

  useGetTbaAddress({
    contractAddress: contractAddress,
    SetVersionAddress: setV3Address,
    tokenboundClient: tokenboundV3,
    tokenId: tokenId,
  });
  useGetTbaAddress({
    contractAddress: contractAddress,
    SetVersionAddress: setV2Address,
    tokenboundClient: tokenboundV2,
    tokenId: tokenId,
  });

  useEffect(() => {
    let network = chain.network;
    let v2Implementation =
      AccountClassHashes.V2[network as keyof typeof AccountClassHashes.V2];
    let v3Implementation =
      AccountClassHashes.V3[network as keyof typeof AccountClassHashes.V3];
    const fetchClassHash = async () => {
      if (v3Address) {
        try {
          const tbaClassHash = await provider.getClassHashAt(v3Address);
          if (tbaClassHash) {
            if (tbaClassHash === v3Implementation) {
              setVersion((prev) => {
                return {
                  ...prev,
                  v3: {
                    address: v3Address,
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
        const tbaHashV2 = await provider.getClassHashAt(v2Address);
        if (tbaHashV2) {
          if (tbaHashV2 === v2Implementation) {
            setVersion((prev) => {
              return {
                ...prev,
                v2: {
                  address: v2Address,
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
  }, [v3Address, v2Address, account, chain]);

  const deployAccount = async () => {
    try {
      await tokenboundV3?.createAccount({
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
        tbaAddress: v2Address,
        newClassHash: v3Implementation,
      });
      // handleVersionSwitch(TBAVersion.V3);
      toast.info("Account was upgraded successfully!");
    } catch (err) {
      console.log(err);
      toast.error("An error was encountered during the course of upgrade!");
    }
  };

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
              {activeVersion.version === "V2" ? (
                <Tooltip message="Switch to V3">
                  <Button
                    aria-label="Switch to V3"
                    variant={"ghost"}
                    className="flex w-[74px] items-center justify-center gap-2 rounded-[4px] bg-[#eae9e9] py-3 text-sm"
                  >
                    <span>V3</span>
                    <span>
                      <SwitchIcon />
                    </span>
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip message="Switch to V2">
                  <Button
                    aria-label="Switch to V2"
                    variant={"ghost"}
                    className="flex w-[74px] items-center justify-center gap-2 rounded-[4px] bg-[#eae9e9] py-3 text-sm"
                  >
                    <span>V2</span>
                    <span>
                      <SwitchIcon />
                    </span>
                  </Button>
                </Tooltip>
              )}

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
                    }/contract/${activeVersion.address}`}
                    target="__blank"
                    title="view on starkscan"
                    className="inline-flex h-full items-center rounded-r-[6px] border border-l-deep-blue px-2 py-3 text-lg transition-all hover:bg-deep-blue hover:text-white"
                  >
                    <span>
                      <NewTbaIcon />
                    </span>
                  </Link>
                </div>
              </div>
              <div>
                <>
                  {activeVersion.version === "undeployed" ? (
                    <Button onClick={deployAccount}>Deploy Account</Button>
                  ) : activeVersion.version === "V2" ? (
                    <Button onClick={upgradeAccount}>Upgrade Account</Button>
                  ) : activeVersion.version === "V3" ? (
                    <Button disabled>TBA Deployed</Button>
                  ) : null}
                </>
              </div>
            </div>
            {nft?.description ? (
              <p className="mt-[18px]">{nft.description}</p>
            ) : (
              <div
                aria-label="loader"
                className="mt-[18px] flex flex-col gap-4"
              >
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
