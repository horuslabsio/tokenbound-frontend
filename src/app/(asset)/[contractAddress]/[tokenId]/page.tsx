"use client";
import { useEffect, useState } from "react";
import {
  useTokenBoundSDK,
  useGetAccountAddress,
  getNftToken,
} from "@hooks/index";
import { useParams } from "next/navigation";
import { useNetwork } from "@starknet-react/core";
import dynamic from "next/dynamic";
import { NewTabIcon } from "@public/icons";
import Link from "next/link";
import { WalletToken } from "../../../../types";
import { useQuery } from "@tanstack/react-query";
import { CopyButton } from "ui/copy-button";
import { Button } from "ui/button";
import DeployArrow from "./ui/deploy-arrow";
import Loading from "./loading";
const Portfolio = dynamic(() => import("./components/Portfolio"), {
  ssr: false,
});

const url = process.env.NEXT_PUBLIC_EXPLORER;
const sepolia_url = process.env.NEXT_PUBLIC_TESTNET_EXPLORER;

function Assets() {
  const params = useParams();

  let contractAddress = params.contractAddress as string;
  let tokenId = params.tokenId as string;

  const { deployedAddress } = useGetAccountAddress({
    contractAddress,
    tokenId,
  });

  const { tokenbound } = useTokenBoundSDK();
  const { chain } = useNetwork();

  const [status, setStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAccountStatus = async () => {
      if (tokenbound) {
        try {
          const accountStatus = await tokenbound?.checkAccountDeployment({
            tokenContract: contractAddress,
            tokenId,
          });
          setStatus(accountStatus?.deployed || null);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      }
    };

    getAccountStatus();
  }, [tokenbound]);

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

  const deployAccount = async () => {
    try {
      await tokenbound?.createAccount({
        tokenContract: contractAddress,
        tokenId: tokenId,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (loading) {
    return <Loading />;
  }
  return (
    <section className="mx-auto min-h-screen max-w-[1125px] px-8 pb-16 pt-32">
      <div className="mx-auto w-full max-w-[23rem] md:max-w-[40rem] lg:grid lg:max-w-none lg:grid-cols-2">
        <div className="flex flex-col items-center gap-4 lg:items-start">
          <div className="h-[17.1rem] w-full overflow-clip rounded-[16px] md:h-[31.5rem] md:w-[31.5rem]">
            {tokenData?.metadata?.image ? (
              <img
                className="scale-110 rounded-[16px] object-cover"
                src={tokenData?.metadata?.image}
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
          <div className="flex w-full justify-between gap-2 md:w-[31.5rem]">
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-2xl md:text-3xl">
              {tokenData?.metadata?.name || ""}
            </p>
            <CopyButton
              textToCopy={deployedAddress}
              className="flex h-[2.1rem] w-[9rem] items-center justify-between rounded-full bg-gray-100 px-4 py-2 shadow-inner lg:w-[10rem]"
              copyIcon
            />
            {/* <Link
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
                <NewTabIcon />
              </span>
            </Link> */}
          </div>
          <div className="relative flex w-full items-center gap-8 md:max-w-[31.5rem] lg:max-w-none">
            {status ? (
              <Button
                asChild
                className="w-fit rounded-full bg-gray-100 text-foreground-primary"
              >
                <span>TBA Deployed</span>
              </Button>
            ) : (
              <Button className="w-fit rounded-full" onClick={deployAccount}>
                Deploy Account
              </Button>
            )}
            {!status && <DeployArrow />}
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
            contractAddress={contractAddress}
            tbaAddress={deployedAddress}
            tokenId={tokenId}
            deployed={status}
          />
        </div>
      </div>
    </section>
  );
}

export default Assets;
