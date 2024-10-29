"use client";
import { useAccount } from "@starknet-react/core";
import NFTCollection from "./components/NFTCollection";
import { CopyButton } from "ui/copy-button";

function NFT() {
  const { address } = useAccount();
  return (
    <section className="container mx-auto min-h-screen  pt-32 px-4 md:px-16 lg:px-16">
      <div className="flex items-center space-x-4 justify-start gap-1 mb-16">
        <h2 className=" text-black text-4xl font-medium ">
          My NFT Collections
        </h2>
        <CopyButton textToCopy={address || ""} />
      </div>
      <NFTCollection />
    </section>
  );
}

export default NFT;
