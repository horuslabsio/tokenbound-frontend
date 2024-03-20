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

const url = process.env.NEXT_PUBLIC_EXPLORER;

function Assets() {
  const [isCollectible, setIsCollectible] = useState(true);
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

  console.log(nft)

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    textAlign: "center",
  };

  const { address, isConnected } = useAccount();

  const copyToClipBoardHandler = async (text: string) => {
    const success = await copyToClipBoard(text);
    if (success) {
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
    <AppWrapper>
      {loading ? (
        <SyncLoader
          cssOverride={override}
          aria-label="Loading Spinner"
          size={50}
          color="#36d7b7"
        />
      ) : (
        <section className="min-h-screen pb-16 pt-32">
          <h2 className=" text-black text-[36px] leading-10 mb-[32px] font-medium ">
            My NFT Collections
          </h2>
          <div className="grid grid-cols-[1fr] lg:grid-cols-[673px_1fr] lg:gap-x-[24px] w-full md:p-4 lg:p-4">
            <div className="mb-4 md:mb-0 mr-4 md:w-full md:h-[480px] lg:w-[673px] lg:h-[480px]">
              {" "}
              <img
                className="md:!w-full md:!h-[480px] lg:!w-[673px] lg:!h-[480px] rounded-[12px] object-cover"
                src={nft.image}
                width={673}
                height={480}
                alt="Card Image"
              />
            </div>
            <div className="md:mt-6 lg:mt-0 w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <h2 className="text-[24px] leading-[40px] font-medium text-black">
                    {nft.name}
                  </h2>
                  <button
                    className="inline-flex items-center px-[12px] py-[4px] bg-gray-200 text-sm cursor-pointer rounded-full"
                    onClick={() => copyToClipBoardHandler(address!)}
                  >
                    <span className="text-gray-400">
                      {address?.slice(0, 4)}...{address?.slice(61, 66)}
                    </span>
                    <span className="ml-2 border-l border-gray-500 pl-[6px] py-[2px]">
                      <BiCopyAlt />
                    </span>
                  </button>
                </div>
                <div>
                  {status ? (
                    <button
                      disabled={status}
                      className={`${"bg-gray-500"} text-white text-[0.45rem] md:text-sm lg:text-sm  py-[6px] px-2 md:py-[.5rem] md:px-[.5rem] lg:py-[13px] lg:px-6 disabled:cursor-not-allowed rounded-[6px]`}
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
              <p className="mt-[18px] text-base leading-6 text-[#5A5A5A]">{nft.description}</p>
              <div>
                <div className="mt-6 flex items-center gap-x-[12px] p-[7px] bg-[#EFEFEF] rounded-[8px] w-fit">
                    <button
                      onClick={toggleContent}
                      className={`${isCollectible ? 'bg-[#0C0C4F] text-white' : 'bg-[#F2F2F2] text-gray-400'} cursor-pointer  rounded-[6px] gap-x-1 flex items-center py-[10px] px-4`}
                    >
                      <FaGem size={24} />
                      Collectible
                    </button>
                    <button
                      onClick={toggleContent}
                      className={`${!isCollectible ? 'bg-[#0C0C4F] text-white' : 'bg-[#F2F2F2] text-gray-400'} cursor-pointer gap-x-1 rounded-[6px] py-[10px] px-4 flex items-center`}
                    >
                      <FaCoins size={24} />
                      Assets
                    </button>
                </div>
                {isCollectible ? (
                  <NonFungibleAsset tba={deployedAddress} />
                ) : (
                  <FungibleAsset tokenboundaddress={deployedAddress} />
                )}{" "}
              </div>
            </div>
          </div>
        </section>
      )}
    </AppWrapper>
  );
}

export default Assets;
