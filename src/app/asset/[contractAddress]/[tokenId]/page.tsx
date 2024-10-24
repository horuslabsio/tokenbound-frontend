"use client";
import { useState, useEffect } from "react";
import {
  useDeployAccount,
  useFetchNFTMetadata,
  useGetTbaAddress,
  useUpgradeAccount,
} from "@hooks/index";
import { useParams } from "next/navigation";
import { useAccount, useNetwork } from "@starknet-react/core";
import { RpcProvider } from "starknet";
import { AccountClassHashes } from "@utils/constants";
import Link from "next/link";
import { NewTbaIcon, SwitchIcon } from "@public/icons/icon";
import Portfolio from "./components/Portfolio";
import { useTokenBoundSDK } from "@hooks/useTokenboundHookContext";
import { Tooltip } from "ui/tooltip";
import { CopyButton } from "ui/CopyButton";
import { Button } from "ui/button";
import Spinner from "ui/Spinner";

const url = process.env.NEXT_PUBLIC_EXPLORER;
const sepolia_url = process.env.NEXT_PUBLIC_TESTNET_EXPLORER;

function Assets() {
  const { tokenboundV2, tokenboundV3, activeVersion, setVersion } =
    useTokenBoundSDK();
  const { chain } = useNetwork();
  const { account } = useAccount();

  const [v2Address, setV2Address] = useState<string>("");
  const [v3Address, setV3Address] = useState<string>("");

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
    const network = chain.network;
    const v2Implementation =
      AccountClassHashes.V2[network as keyof typeof AccountClassHashes.V2];
    const v3Implementation =
      AccountClassHashes.V3[network as keyof typeof AccountClassHashes.V3];

    const fetchClassHash = async () => {
      if (v2Address || v3Address) {
        try {
          if (v2Address) {
            const tbaClassHashV2 = await provider.getClassHashAt(v2Address);

            if (tbaClassHashV2 === v2Implementation) {
              setVersion((prev) => ({
                ...prev,
                v2: {
                  address: v2Address,
                  status: true,
                },
              }));
              return;
            }
            if (tbaClassHashV2 === v3Implementation) {
              setVersion((prev) => ({
                ...prev,
                v3: {
                  address: v2Address,
                  status: true,
                },
              }));
              return;
            }
          }
          if (v3Address) {
            const tbaClassHashV3 = await provider.getClassHashAt(v3Address);
            if (tbaClassHashV3 === v3Implementation) {
              setVersion((prev) => ({
                ...prev,
                v3: {
                  address: v3Address,
                  status: true,
                },
              }));
            }
          }
        } catch (error) {
          if (process.env.NODE_ENV !== "production") {
          }
          console.error(error);
        }
      }
    };

    fetchClassHash();
  }, [v3Address, v2Address, account, chain]);

  const { deployAccount, deploymentStatus } = useDeployAccount({
    contractAddress: contractAddress,
    tokenId: tokenId,
  });

  const { upgradeAccount, upgradeStatus } = useUpgradeAccount({
    chain: chain,
    contractAddress: v2Address,
    tokenboundClient: tokenboundV2,
  });

  return (
    <section className="container mx-auto min-h-screen px-4 pb-16 pt-32">
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
              className="h-full min-h-[500px] w-full animate-pulse rounded-[8px] bg-gray-50"
            ></div>
          )}
        </div>
        <div>
          <div className="flex h-fit flex-wrap items-center justify-between gap-4">
            <h3
              className={`${
                nft?.name
                  ? "max-w-[20rem] overflow-hidden text-ellipsis whitespace-nowrap text-deep-blue"
                  : "h-[1.2rem] w-[10rem] animate-pulse rounded-full bg-gray-50"
              } `}
            >
              {nft?.name || ""}
            </h3>

            <div className="flex gap-4">
              {activeVersion.version === "V2" && (
                <Tooltip message="Switch to V3">
                  <Button
                    aria-label="Switch to V3"
                    variant={"ghost"}
                    className="flex w-[74px] items-center justify-center gap-2 rounded-[4px] bg-gray-50 py-3 text-sm"
                    onClick={upgradeAccount}
                  >
                    <span>V3</span>
                    <span>
                      <SwitchIcon />
                    </span>
                  </Button>
                </Tooltip>
              )}
              <div>
                <div className="flex items-center rounded-[6px] bg-gray-50 text-sm">
                  <Tooltip message="Click to copy">
                    <CopyButton
                      className="px-2 py-3 text-center"
                      textToCopy={
                        activeVersion.address
                          ? activeVersion.address
                          : v3Address
                      }
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
                    <Button
                      disabled={
                        deploymentStatus === "ongoing" ||
                        deploymentStatus === "success"
                      }
                      onClick={deployAccount}
                      className={`${deploymentStatus === "failed" && "!bg-red-500"} transition-all`}
                    >
                      {deploymentStatus === "idle" ? (
                        "Deploy Account"
                      ) : deploymentStatus === "ongoing" ? (
                        <Spinner size="20px" color="white" />
                      ) : deploymentStatus === "failed" ? (
                        "Failed"
                      ) : (
                        "TBA Deployed"
                      )}
                    </Button>
                  ) : activeVersion.version === "V2" ? (
                    <Button
                      className={`${upgradeStatus === "failed" && "!bg-red-500"}`}
                      onClick={upgradeAccount}
                    >
                      {upgradeStatus === "idle" ? (
                        "Upgrade Account"
                      ) : deploymentStatus === "ongoing" ? (
                        <Spinner size="20px" color="white" />
                      ) : deploymentStatus === "failed" ? (
                        "Failed"
                      ) : (
                        "TBA Deployed"
                      )}
                    </Button>
                  ) : activeVersion.version === "V3" ? (
                    <Button disabled>TBA Deployed</Button>
                  ) : null}
                </>
              </div>
            </div>
          </div>
          {nft?.description ? (
            <p className="mt-[18px]">{nft.description}</p>
          ) : (
            <div aria-label="loader" className="mt-[18px] flex flex-col gap-4">
              <div className="h-[1.2rem] w-[75%] animate-pulse rounded-full bg-gray-50"></div>
              <div className="h-[1.2rem] w-[75%] animate-pulse rounded-full bg-gray-50"></div>
            </div>
          )}
          <Portfolio
            contractAddress={contractAddress}
            tbaAddress={activeVersion.address}
            tokenId={tokenId}
          />
        </div>
      </div>
    </section>
  );
}

export default Assets;
