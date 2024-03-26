"use client";
import AppWrapper from "@components/AppWrapper";
import Image from "next/image";
import React, { useState } from "react";
import { FaGem, FaCoins, FaArrowAltCircleRight } from "react-icons/fa";
import {
  useFetchNFTMetadata,
  useTokenBoundSDK,
  useGetAccountAddress,
} from "@hooks/index";
import { useParams } from "next/navigation";
import SyncLoader from "react-spinners/SyncLoader";
import { CSSProperties } from "react";
import { copyToClipBoard, shortenAddress } from "@utils/helper";
import { toast } from "react-toastify";
import FungibleAsset from "@components/Assets/index";
import NonFungibleAsset from "@components/Assets/Tbanft";
import { useAccount } from "@starknet-react/core";
import { BiCopyAlt } from "react-icons/bi";
import CopyCheckIcon from "svg/CopyCheckIcon";
import CopyIcon from "svg/CopyIcon";

const url = process.env.NEXT_PUBLIC_EXPLORER;

function Assets() {
  const [isCollectible, setIsCollectible] = useState(true);
  const [copied, setCopied] = useState(false);

  const toggleContent = () => {
    setIsCollectible((prevIsCollectible) => !prevIsCollectible);
  };

  let { id } = useParams();
  let contractAddress = id.slice(0, 66) as string;
  let tokenId = id.slice(66) as string;
  const { nft, loading } = useFetchNFTMetadata(contractAddress, tokenId);
  const { deployedAddress } = useGetAccountAddress({
    contractAddress,
    tokenId,
  });
  const { tokenbound } = useTokenBoundSDK();
  const [status, setStatus] = useState<boolean>(false);

  console.log(nft);

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    textAlign: "center",
  };

  const { address, isConnected } = useAccount();

  const copyToClipBoardHandler = async (text: string) => {
    const success = await copyToClipBoard(text);
    if (success) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
      toast.info(`Copied to clipboard:  ${text}`);
    } else {
      toast.error("Not Copied");
    }
  };

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
      toast.info("Account was deployed successfully!");
    } catch (err) {
      console.log(err);
      toast.error("An error was encountered during the course of deployment!");
    }
  };

  return (
    <section className="min-h-screen pt-32 px-4 md:px-16 lg:px-16 ">
      <section className="min-h-screen">
        <h2 className="text-deep-blue mb-8">My NFT Collections</h2>
        <div className="grid grid-cols-[1fr] md:grid-cols-2 gap-8 w-full">
          <div className=" w-full rounded-[8px]">
            {nft.image ? (
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
                className=" w-full h-full bg-[#eae9e9] rounded-[8px] animate-pulse"
              ></div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-x-3">
                {nft.name ? (
                  <h3 className="text-deep-blue">{nft.name}</h3>
                ) : (
                  <div
                    aria-label="loader"
                    className="w-[10rem] h-[1.2rem] rounded-full bg-[#eae9e9] animate-pulse"
                  ></div>
                )}

                <div>
                  <button
                    className="inline-flex items-center px-[12px] py-[4px] bg-gray-200 text-sm cursor-pointer rounded-full"
                    onClick={() => copyToClipBoardHandler(address!)}
                  >
                    <span className="text-gray-400">
                      {address?.slice(0, 4)}...{address?.slice(61, 66)}
                    </span>

                    <span className="ml-2 border-l border-gray-500 relative">
                      <div
                        style={{
                          color: copied ? "#e5e7eb" : "",
                          transition: "opacity 300ms ease-in-out 2s",
                        }}
                        className={`flex pl-[6px]  py-[2px] ${
                          copied ? "opacity-0" : "opacity-100"
                        }`}
                      >
                        <CopyIcon width="1.3em" height="1.3em" />
                      </div>
                      <div
                        style={{
                          left: "calc(50% - 0.5em / 2)",
                        }}
                        className="absolute top-[4px]"
                      >
                        <CopyCheckIcon
                          copied={copied}
                          width="1.2em"
                          height="1.2em"
                        />
                      </div>
                    </span>
                  </button>
                </div>
              </div>
              <div>
                {status ? (
                  <button
                    disabled={status}
                    className={`bg-[#0c0c4f] opacity-50 text-white text-sm py-[13px] px-6 disabled:cursor-not-allowed rounded-[6px]`}
                    onClick={deployAccount}
                  >
                    TBA Deployed
                  </button>
                ) : (
                  <button
                    className="bg-[#0C0C4F] text-[#fafafa] text-[0.45rem] md:text-sm lg:text-sm  py-[6px] px-2 md:py-[.5rem] md:px-[.5rem] lg:py-[13px] lg:px-6 rounded-[6px]"
                    onClick={deployAccount}
                  >
                    Deploy Account
                  </button>
                )}
              </div>
            </div>
            {nft.description ? (
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
              </div>
              {isCollectible ? (
                <NonFungibleAsset tba={deployedAddress} />
              ) : (
                <FungibleAsset tokenBoundAddress={deployedAddress} />
              )}{" "}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Assets;
