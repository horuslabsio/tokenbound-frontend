"use client";
import AppWrapper from "components/AppWrapper";
import React, { useEffect, useState } from "react";
import { BiCopyAlt } from "react-icons/bi";
import Card from "@components/Card/page";
import { useAccount } from "@starknet-react/core";
import { copyToClipBoard } from "@utils/helper";
import { toast } from "react-toastify";
import ConnectWallet from "@components/ConnectWallet/page";

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
  console.log(isConnected, address);
  return (
    <AppWrapper>
      {isConnected && !!address ? (
        <main className="min-h-screen pb-16 pt-32">
          <div className="flex items-center space-x-4">
            <h2 className="font-bold text-3xl">My NFTs</h2>
            <p className="inline-flex items-center p-[2px] bg-gray-200 cursor-pointer rounded-full hover:transform hover:scale-110">
              <span
                onClick={() => copyToClipBoardHandler(address!)}
                className="text-gray-400"
              >
                {address?.slice(0, 5)}...{address?.slice(60, 66)}
              </span>
              <span className="ml-1">
                <BiCopyAlt />
              </span>
            </p>
          </div>

          <div className="flex justify-start my-5 items-center">
            <p className="mr-4 text-3xl text-gray-300">Collectibles</p>
            <div className="border-b border-gray flex-grow"></div>
          </div>

          <div className="">
            <Card />
          </div>
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
