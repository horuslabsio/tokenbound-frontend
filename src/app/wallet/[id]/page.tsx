"use client";
import { useEffect, useState } from "react";
import { useAccount } from "@starknet-react/core";
import { copyToClipBoard } from "@utils/helper";
import ConnectWallet from "@components/ConnectWallet/page";
import NFTCollection from "@components/NFTCollection/page";
import CopyButton from "@components/utils/CopyButton";

function NFT() {
  const { address, isConnected } = useAccount();
  const [isWalletOpen, setIsWalletOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState(false);
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
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };
  useEffect(() => {
    if (!isConnected && !address) {
      setIsWalletOpen(true);
    }
  }, [isConnected, address]);
  return (
    <>
      {isConnected && !!address ? (
        <section className="min-h-screen  pt-32 px-4 md:px-16 lg:px-16">
          <div className="flex items-center space-x-4 justify-start gap-1 mb-16">
            <h2 className=" text-black text-4xl font-medium ">
              My NFT Collections
            </h2>
            <CopyButton textToCopy={address} />
          </div>
          <NFTCollection />
        </section>
      ) : (
        <section className="min-h-screen pb-16 pt-32">
          <ConnectWallet
            isWalletOpen={isWalletOpen}
            closeWalletModal={closeWalletModal}
            openWalletModal={openWalletModal}
          />
        </section>
      )}
    </>
  );
}

export default NFT;
