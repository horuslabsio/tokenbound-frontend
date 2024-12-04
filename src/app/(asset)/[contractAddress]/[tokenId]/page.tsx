"use client";
import { useState } from "react";
import {
  getNftToken,
  useDeployAccount,
  useGetTbaAddress,
  useUpgradeAccount,
  useRefreshMetadata,
  useSetTbaVersion,
} from "@hooks/index";
import { useParams } from "next/navigation";
import { useNetwork } from "@starknet-react/core";
import { useTokenBoundSDK } from "@hooks/useTokenboundHookContext";
import { Button } from "ui/button";
import dynamic from "next/dynamic";
import { useQuery } from "@tanstack/react-query";
import { WalletToken } from "types";
import DeployArrow from "./ui/deploy-arrow";
import Loading from "./loading";
import { CopyButton } from "ui/copy-button";
import { RefreshIcon, UpRightArrowIcon } from "@public/icons";
import { formatAddressTo0x0, getVoyagerUrl } from "@utils/helper";
const Portfolio = dynamic(() => import("./components/Portfolio"), {
  ssr: false,
});

function Assets() {
  const {
    tokenboundV2,
    tokenboundV3,
    activeVersion,
    setVersion,
    loading,
    setActiveVersion,
  } = useTokenBoundSDK();
  const { chain } = useNetwork();

  const [v2Address, setV2Address] = useState<string>("");
  const [v3Address, setV3Address] = useState<string>("");

  const params = useParams();

  let contractAddress = params.contractAddress as string;
  let tokenId = params.tokenId as string;

  const { data: nft } = useQuery({
    queryKey: [`${contractAddress}-${tokenId}`, { contractAddress, tokenId }],
    queryFn: () =>
      getNftToken({
        contractAddress,
        tokenId,
        chain,
      }),
  });
  const tokenData = nft?.data as WalletToken;

  useGetTbaAddress({
    contractAddress: contractAddress,
    SetVersionAddress: setV3Address,
    tokenboundClient: tokenboundV3,
    tokenId: tokenId,
  });

  const {
    refreshMetadata,
    loading: loadingRefresh,
    success,
  } = useRefreshMetadata(contractAddress, tokenId);

  useGetTbaAddress({
    contractAddress: contractAddress,
    SetVersionAddress: setV2Address,
    tokenboundClient: tokenboundV2,
    tokenId: tokenId,
  });

  useSetTbaVersion({
    setVersion,
    v2Address: v2Address as `0x${string}`,
    v3Address: v3Address as `0x${string}`,
  });

  const { deployAccount, deploymentStatus } = useDeployAccount({
    contractAddress: contractAddress,
    tokenId: tokenId,
    v3Address,
    setActiveVersion,
  });

  const { upgradeAccount, upgradeStatus } = useUpgradeAccount({
    chain: chain,
    contractAddress: v2Address,
    tokenboundClient: tokenboundV2,
    setActiveVersion,
  });

  if (loading) {
    return <Loading />;
  }

  return (
    <section className="mx-auto min-h-screen max-w-[1125px] px-4 pb-16 pt-32 md:px-8 2xl:max-w-[1490px]">
      <div className="mx-auto w-full max-w-[31.5rem] md:max-w-[40rem] lg:grid lg:max-w-none lg:grid-cols-2">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <div className="h-[20rem] w-full overflow-clip rounded-[16px] md:h-[31.5rem] md:w-[31.5rem] 2xl:h-[41.5rem] 2xl:w-[41.5rem]">
            {tokenData?.metadata?.image && (
              <img
                className="scale-105 rounded-[16px] object-cover transition-all md:scale-110"
                src={tokenData?.metadata?.image}
                alt="NFT Image"
              />
            )}
          </div>
          <div className="flex w-full justify-between gap-2 md:w-[31.5rem]">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl md:text-3xl">
              {tokenData?.metadata?.name || ""}
            </p>
            <CopyButton
              textToCopy={
                activeVersion?.address
                  ? formatAddressTo0x0(activeVersion.address)
                  : formatAddressTo0x0(v3Address)
              }
              className="flex h-[2.1rem] w-[9rem] items-center justify-between rounded-full bg-gray-100 px-4 py-2 shadow-inner lg:w-[10rem]"
              copyIcon
            />
          </div>

          <div className="relative flex w-full items-center gap-8 md:max-w-[31.5rem] lg:max-w-none">
            {activeVersion?.version === "undeployed" && (
              <Button
                disabled={
                  deploymentStatus === "pending" ||
                  deploymentStatus === "success"
                }
                isLoading={deploymentStatus === "pending"}
                onClick={deployAccount}
                className={`w-fit rounded-full transition-all duration-300 ${deploymentStatus === "error" ? "bg-gray-100 text-error" : "bg-black text-white disabled:bg-gray-100 disabled:text-black"}`}
              >
                {deploymentStatus === "error" ? (
                  <span>Failed to deploy</span>
                ) : (
                  <span>Deploy Account</span>
                )}
              </Button>
            )}
            {activeVersion?.version === "V2" && (
              <div className="flex flex-wrap-reverse items-center gap-4">
                <Button
                  onClick={refreshMetadata}
                  isLoading={loadingRefresh}
                  startIcon={success ? null : <RefreshIcon />}
                  className="rounded-full transition-all duration-300"
                >
                  {success ? "success" : "Refresh metadata"}
                </Button>
                <div className="flex h-[2.8rem] items-center rounded-full">
                  <Button
                    disabled={
                      upgradeStatus === "pending" || upgradeStatus === "success"
                    }
                    className={`w-fit rounded-l-full rounded-r-none transition-all duration-300 ${upgradeStatus === "error" ? "bg-gray-100 text-error" : upgradeStatus === "success" ? "disabled:bg-black disabled:opacity-100" : "bg-black text-white disabled:bg-gray-100 disabled:text-black"}`}
                    onClick={upgradeAccount}
                    isLoading={upgradeStatus === "pending"}
                  >
                    {upgradeStatus === "error" ? (
                      <span>Failed to upgrade</span>
                    ) : (
                      <span>Upgrade Account</span>
                    )}
                  </Button>

                  <a
                    href={getVoyagerUrl(
                      chain,
                      activeVersion?.address ? activeVersion.address : v3Address
                    )}
                    target="_blank"
                    className="group inline-grid h-full place-content-center rounded-l-none rounded-r-full border border-b-transparent border-l-gray-100 border-r-transparent border-t-transparent bg-black pl-2 pr-2 md:pr-4"
                  >
                    <span className="inline-block transition-all duration-300 group-hover:translate-x-[2px] group-hover:translate-y-[-1px]">
                      <UpRightArrowIcon gradient />
                    </span>
                  </a>
                </div>
              </div>
            )}

            {activeVersion?.version === "V3" && (
              <div className="flex flex-wrap-reverse gap-4">
                <Button
                  onClick={refreshMetadata}
                  isLoading={loadingRefresh}
                  startIcon={success ? null : <RefreshIcon />}
                  className="rounded-full transition-all duration-300"
                >
                  {success ? "success" : "Refresh metadata"}
                </Button>
                <Button
                  asChild
                  variant={"gray"}
                  endIcon={<UpRightArrowIcon gradient />}
                >
                  <a
                    href={getVoyagerUrl(
                      chain,
                      activeVersion?.address ? activeVersion.address : v3Address
                    )}
                    target="_blank"
                  >
                    TBA Deployed
                  </a>
                </Button>
              </div>
            )}

            {activeVersion?.version === "undeployed" && <DeployArrow />}
          </div>
        </div>
        <div className="mx-auto mt-4 w-full md:max-w-[31.5rem] lg:mt-0 lg:max-w-none">
          <div className="flex w-full flex-col gap-4">
            <p className="text-xl">Description</p>
            {tokenData?.metadata?.description && (
              <p className="line-clamp-2 first-letter:capitalize">
                {tokenData?.metadata?.description}
              </p>
            )}
          </div>

          <Portfolio
            tbaAddress={
              activeVersion?.address ? activeVersion.address : v3Address
            }
            deployed={activeVersion?.version !== "undeployed"}
          />
        </div>
      </div>
    </section>
  );
}

export default Assets;
