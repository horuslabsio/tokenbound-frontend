"use client";
import AppWrapper from "components/AppWrapper";
import React, { useEffect, useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { useAccount } from "@starknet-react/core";
import { copyToClipBoard } from "@utils/helper";
import { toast } from "react-toastify";
import ConnectWallet from "@components/ConnectWallet/page";
import NFTCollection from "@components/NFTCollection/page";

function NFT() {
  const { address, isConnected } = useAccount();
  const [isWalletOpen, setIsWalletOpen] = useState<boolean>(false);
  function closeWalletModal() {
    if (isConnected) {
      setIsWalletOpen(false);
    }
  }

  function openWalletModal() {
    setIsWalletOpen(true);
  }
  const copyToClipBoardHandler = async (text: string) => {
    const success = await copyToClipBoard(text);
    if (success) {
      toast.info(`Copied to clipboard ${text}`);
    } else {
      toast.error("Not Copied");
    }
  };
  useEffect(() => {
    if (!isConnected && !address) {
      setIsWalletOpen(true);
    }
  }, [isConnected , address]);
  return (
    <AppWrapper>
      {isConnected && !!address ? (
        <main className="min-h-screen pb-16 pt-32">
          <div className="flex items-center space-x-4 justify-start gap-1">
            <h2 className=" text-black text-2xl ">My NFT Collections</h2>
            <p className="inline-flex items-center p-[4px] bg-gray-200 border border-gray-500 text-xs cursor-pointer rounded-full hover:transform hover:scale-110"  onClick={() => copyToClipBoardHandler(address!)}>
              <span
               
                className="text-gray-400"
              >
                {address?.slice(0, 4)}...{address?.slice(62, 66)}
              </span>
              <span className="ml-1 border-l border-gray-500 p-1">
                <BiCopyAlt />
              </span>
            </p>
          </div>
          <NFTCollection />
        </main>
      ) : (
        <main className="min-h-screen pb-16 pt-32">
          <ConnectWallet
            isWalletOpen={isWalletOpen}
            closeWalletModal={closeWalletModal}
            openWalletModal={openWalletModal}
          />
        </main>
      )}
    </AppWrapper>
  );
}

export default NFT;
