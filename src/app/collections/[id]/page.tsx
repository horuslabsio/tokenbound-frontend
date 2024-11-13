"use client";
import { useAccount } from "@starknet-react/core";
import dynamic from "next/dynamic";
import { CopyButton } from "ui/copy-button";
const NFTCollection = dynamic(() => import("./components/NFTCollection"), {
  ssr: false,
});

function NFT() {
  const { address } = useAccount();
  return (
    <section className="mx-auto min-h-screen max-w-[23rem] px-4 pt-16 md:max-w-[1125px] md:px-8 md:pt-32 2xl:max-w-[1536px]">
      <div className="mb-8 flex items-center justify-start gap-1 space-x-4">
        <h2 className="text-4xl font-medium text-black">
          My <span className="text-gradient">NFTs</span>
        </h2>
        <CopyButton
          textToCopy={address || ""}
          className="flex h-[2.1rem] w-[9rem] items-center justify-between rounded-full bg-gray-100 px-4 py-2 shadow-inner lg:w-[10rem]"
          copyIcon
        />
      </div>

      <NFTCollection />
    </section>
  );
}

export default NFT;
