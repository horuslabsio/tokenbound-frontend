"use client";

import { useAccount } from "@starknet-react/core";
import { shortenAddress } from "@utils/helper";
import Image from "next/image";
import React from "react";

export default function NFTCard({image}) {
  const { address, account } = useAccount();
  return (
    <div className="w-full rounded-lg flex flex-col items-center overflow-hidden">
        <div className="h-[303px] overflow-hidden w-full">
      <Image src={image} alt="nft" 
      width={509} 
      height={380} 
    className="!w-auto !h-[auto]"
      />
        </div>
      <div className="px-7 py-6 bg-white h-[219px] text-left w-full">
        <h2 className="mb-3 text-2xl font-medium leading-[29px] text-[#0A0A0A]">
          Rainbow Palm #452
        </h2>
        <div className="bg-gray-200 cursor-pointer xsm:w-[90%] w-fit flex items-center gap-x-2 text-xs font-normal leading-[14px]  px-3  py-1 border-solid border-[1px] border-[#C4C4C4] rounded-full ">
          <p className="text-center">{shortenAddress(address as any)}</p>
          <button className="w-[22px] h-[22px]">
            <Image
              src="/copy-icon.svg"
              height={22}
              width={22}
              alt="copy icon"
            />
          </button>
        </div>
        <p className="mt-3 text-sm leading-5 font-medium text-[
#5A5A5A]">Rainbow Palm minted by Stoneclave  that can own tokens </p>
      </div>
    </div>
  );
}
