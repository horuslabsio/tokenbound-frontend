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

  const src = nft.image;

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
        <section className="pt-[240px]">
          <h2 className=" text-black text-[36px] leading-10 mb-[32px] font-medium ">
            My NFT Collections
          </h2>
          <div className="grid grid-cols-[1fr] md:grid-cols-[673px_1fr] gap-x-[24px] w-full p-4">
            <div className="mb-4 md:mb-0 mr-4 w-[673px] h-[480px]">
              {" "}
              <Image
                className="!w-[673px] !h-[480px] rounded-[12px] object-cover"
                src="/unsplash_hKxsoF4aubY.png"
                width={673}
                height={480}
                alt="Card Image"
              />
            </div>
            <div className="w-full">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <h2 className="text-[24px] leading-[40px] font-medium text-black">
                    Rainbow Palm #452
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
                      disabled={!!status}
                      className={`${"bg-gray-500"} text-white text-sm py-[13px] px-6 rounded-[6px]`}
                      onClick={deployAccount}
                    >
                      TBA Deployed
                    </button>
                  ) : (
                    <button
                      className="bg-[#0C0C4F] text-[#fafafa] text-sm py-[13px] px-6 rounded-[6px]"
                      onClick={deployAccount}
                    >
                      Deploy Account
                    </button>
                  )}
                </div>
              </div>
              <p className="mt-[18px] text-base leading-6 text-[#5A5A5A]">Our implementation focuses on ease of use and adoption. Unlike other proposals and projects, Token Bound works with no action needed by project owners, no wrapping contracts, and no change to the ERC-721 standard. Most importantly, every ERC-721 and ERC-1155 NFT you already.</p>
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
