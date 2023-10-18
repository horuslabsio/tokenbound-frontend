"use client"

import AppWrapper from "@/components/AppWrapper";
import React from "react";
import { BiCopyAlt } from "react-icons/bi";
import Card from "@/components/Card/page";
import { useAccount } from "@starknet-react/core";

function NFT() {
  const { address } = useAccount()

  return (
    <AppWrapper>
      <section>
        <div className="flex items-center space-x-4">
          <h2 className="font-bold text-3xl">My NFTs</h2>

          <p className="inline-flex items-center p-[2px] bg-gray-200 cursor-pointer rounded-full hover:transform hover:scale-110">
            <span className="text-gray-400">{address?.slice(0, 5)}...{address?.slice(60, 66)}</span>
            <span className="ml-1">
              <BiCopyAlt />
            </span>
          </p>
        </div>

        <div className="flex justify-start my-5 items-center">
          <p className="mr-4 text-3xl text-gray-300">Collectibles</p>
          <div className="border-b border-gray flex-grow"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </section>
    </AppWrapper>
  );
}

export default NFT;
