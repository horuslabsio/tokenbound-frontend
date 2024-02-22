"use client";
import NFT from "@app/wallet/[id]/page";
import NFTCard from "@components/NFTCard/page";
import { useAccount } from "@starknet-react/core";
import { shortenAddress } from "@utils/helper";
import Image from "next/image";
import React from "react";

export default function Dashboard() {
  const { address, account } = useAccount();
  return (
    <div className="pt-32 pb-[71px] px-[70px]">
      <div className="flex items-center gap-x-3">
        <h1 className="font-medium text-[36px] leading-10 text-black">
          My NFT Collections
        </h1>
        <div className="bg-gray-200 cursor-pointer xsm:w-[90%] w-[133px] flex items-center gap-x-3 text-xs font-normal leading-[14px]  px-3  py-1 border-solid border-[1px] border-[#C4C4C4] rounded-full ">
          <p className="text-center">{shortenAddress(address as any)}</p>
          <button className="w-[28px] h-[26px] border-l-[1.25px] border-l-[#BABABA] py-[2px] pl-[6px]">
            <Image
              src="/copy-icon.svg"
              height={22}
              width={22}
              alt="copy icon"
            />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-[1fr_1fr_1fr] mt-[21px] gap-x-9 gap-y-8">
        <NFTCard image="/nft1.png"/>
        <NFTCard image="/nft2.png"/>
        <NFTCard image="/nft3.png"/>
        <NFTCard image="/nft4.png" />
        <NFTCard image="/nft5.png" />
        <NFTCard image="/nft6.png" />

      </div>
    </div>
  );
}
