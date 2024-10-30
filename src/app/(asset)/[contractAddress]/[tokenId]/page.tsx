"use client";
import { useState } from "react";
import {
  useTokenBoundSDK,
  useGetAccountAddress,
  getNftToken,
} from "@hooks/index";
import { useParams } from "next/navigation";
import { useNetwork } from "@starknet-react/core";
import Portfolio from "./components/Portfolio";
import { NewTabIcon } from "@public/icons";
import Link from "next/link";
import { WalletToken } from "../../../../types";
import { useQuery } from "@tanstack/react-query";
import { CopyButton } from "ui/copy-button";
import { Button } from "ui/button";
import { Tooltip } from "ui/tooltip";
const url = process.env.NEXT_PUBLIC_EXPLORER;
const sepolia_url = process.env.NEXT_PUBLIC_TESTNET_EXPLORER;

function Assets() {
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

  const { deployedAddress } = useGetAccountAddress({
    contractAddress,
    tokenId,
  });
  const { tokenbound } = useTokenBoundSDK();
  const [status, setStatus] = useState<boolean | null>(null);

  const getAccountStatus = async () => {
    try {
      const accountStatus = await tokenbound.checkAccountDeployment({
        tokenContract: contractAddress,
        tokenId,
      });
      setStatus(accountStatus?.deployed);
    } catch (error) {
      console.error(error);
    }
  };

  getAccountStatus();

  const deployAccount = async () => {
    try {
      await tokenbound.createAccount({
        tokenContract: contractAddress,
        tokenId: tokenId,
      });
    } catch (err) {
      console.log(err);
    }
  };
  const { chain } = useNetwork();
  return (
    <section className="container mx-auto min-h-screen px-4 pb-16 pt-32">
      <h2 className="mb-8 text-deep-blue"> Token Bound Account</h2>
      <div className="grid w-full grid-cols-[1fr] gap-8 md:grid-cols-2">
        <div className="w-full rounded-[8px]">
          {tokenData?.metadata?.image ? (
            <img
              className="!h-[480px] !w-[673px] rounded-[8px] object-cover"
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
        <div>
          <div className="flex h-fit flex-wrap items-center justify-between gap-4">
            <h3
              className={`${
                tokenData?.metadata?.name
                  ? "max-w-[20rem] overflow-hidden text-ellipsis whitespace-nowrap text-deep-blue"
                  : "h-[1.2rem] w-[10rem] animate-pulse rounded-full bg-gray-50"
              } `}
            >
              {tokenData?.metadata?.name || ""}
            </h3>

            <div className="flex gap-4">
              <div className="flex items-center rounded-[6px] bg-gray-50 text-sm">
                <Tooltip message="Click to copy">
                  <CopyButton
                    className="px-2 py-3 text-center"
                    textToCopy={deployedAddress}
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
                    <NewTabIcon />
                  </span>
                </Link>
              </div>
              <div>
                {status === null ? (
                  <div
                    className="bg-[#0C0C4F] text-[#fafafa] h-[3.5rem] w-[8rem]   rounded-[6px] animate-pulse"
                    onClick={deployAccount}
                  ></div>
                ) : (
                  <>
                    {status ? (
                      <Button disabled={status} onClick={deployAccount}>
                        TBA Deployed
                      </Button>
                    ) : (
                      <Button onClick={deployAccount}>Deploy Account</Button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
          {tokenData?.metadata?.description ? (
            <p className="mt-[18px]">{tokenData?.metadata?.description}</p>
          ) : (
            <div aria-label="loading" className="mt-[18px] flex flex-col gap-4">
              <div className="h-[1.2rem] w-[75%] animate-pulse rounded-full bg-gray-50"></div>
              <div className="h-[1.2rem] w-[75%] animate-pulse rounded-full bg-gray-50"></div>
            </div>
          )}
          <Portfolio
            contractAddress={contractAddress}
            tbaAddress={deployedAddress}
            tokenId={tokenId}
          />
        </div>
      </div>
    </section>
  );
}

export default Assets;
