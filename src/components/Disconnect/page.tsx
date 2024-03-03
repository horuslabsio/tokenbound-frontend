"use client";
import { useAccount, useDisconnect } from "@starknet-react/core";
import React, { useState } from "react";
import { copyToClipBoard } from "@utils/helper";
import Image from "next/image";
import Link from "next/link";
import CopyIcon from "svg/CopyIcon";
import CopyCheckIcon from "svg/CopyCheckIcon";
function Disconnect({ closeModal }: { closeModal: () => void }) {
  const [copied, setCopied] = useState(false);
  const { address } = useAccount();
  const { disconnect } = useDisconnect();

  const copy = () => {
    let status = copyToClipBoard(address as string);
    if (status) {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 3000);
    }
  };
  return (
    <section>
      <div className="rounded-full bg-[#EFC58E] w-[10rem] h-[10rem] mx-auto">
        {/* if it will be an image */}
        {/* <Image
          className="rounded-full"
          src="/unsplash_hKxsoF4aubY.png"
          alt=""
          width={100}
          height={100}
        /> */}
      </div>
      <div className="flex flex-col gap-4  mt-4">
        <div
          className={`self-end w-[40%] bg-green-600 text-white rounded-full p-2 flex items-center justify-center gap-2 transition-all duration-300 ease-in-out ${
            copied ? "opacity-100 scale-100" : "opacity-0 scale-75"
          }`}
        >
          <p className="text-center">copied!</p>
          <span>
            <CopyCheckIcon copied={copied} />
          </span>
        </div>
        <button
          title="Copy Address"
          onClick={copy}
          className=" border-solid border-[1px] border-[#C4C4C4] rounded-full p-2 flex gap-2"
        >
          <span className="overflow-hidden overflow-ellipsis whitespace-nowrap max-w-[90%]">
            {address}
          </span>
          <span className="border-l-solid border-l-[1px] border-l-[#7A7A7A] pl-2">
            <CopyIcon />
          </span>
        </button>

        <Link href={`/wallet/${address}`}>
          <button
            onClick={closeModal}
            className="w-full p-4 bg-deep-blue rounded-[8px] text-white my-2"
            type="button"
          >
            My NFTs &rarr;
          </button>
        </Link>
        <button
          type="button"
          onClick={() => disconnect()}
          className="w-full p-4  text-[#810E0E] rounded-[8px]  border-solid border-[1px] border-[#810E0E]"
        >
          Disconnect
        </button>
      </div>
    </section>
  );
}

export default Disconnect;
