"use client";
import { useAccount } from "@starknet-react/core";
import NFTCollection from "./components/NFTCollection";
import { CopyButton } from "ui/CopyButton";

function NFT() {
  const { address } = useAccount();
  return (
    <section className="container mx-auto min-h-screen px-4 pt-32 md:px-16 lg:px-16">
      <div className="mb-16 flex items-center justify-start gap-1 space-x-4">
        <h2 className="text-4xl font-medium text-black">My NFT Collections</h2>
        <CopyButton
          className="inline-flex cursor-pointer items-center rounded-full bg-gray-200 px-3 py-1 text-sm text-gray-700"
          textToCopy={address || ""}
          copyIcon
        />
      </div>
      <NFTCollection />
    </section>
  );
}

export default NFT;
