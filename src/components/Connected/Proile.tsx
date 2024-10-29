"use client";
import { useAccount, useDisconnect } from "@starknet-react/core";
import React, { useState } from "react";
import { copyToClipBoard } from "@utils/helper";
import Link from "next/link";
import { CopyCheckIcon, CopyIcon } from "@public/icons";

const Profile = ({ closeModal }: { closeModal: () => void }) => {
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
      <div className="mx-auto h-[10rem] w-[10rem] rounded-full bg-[#EFC58E]"></div>
      <div className="mt-4 flex flex-col gap-4">
        <div
          className={`flex w-[40%] items-center justify-center gap-2 self-end rounded-full bg-green-600 p-2 text-white transition-all duration-300 ease-in-out ${
            copied ? "scale-100 opacity-100" : "scale-75 opacity-0"
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
          className="flex items-center gap-2 rounded-full border-[1px] border-solid border-[#C4C4C4] p-2"
        >
          <span className="max-w-[90%] overflow-hidden overflow-ellipsis whitespace-nowrap">
            {address}
          </span>
          <span className="border-l-solid border-l-[1px] border-l-[#7A7A7A] pl-2">
            <CopyIcon />
          </span>
        </button>

        <Link href={`/collections/${address}`}>
          <button
            onClick={closeModal}
            className="my-2 h-[3rem] w-full rounded-[8px] bg-deep-blue px-4 text-white"
            type="button"
          >
            My NFTs &rarr;
          </button>
        </Link>
        <button
          type="button"
          onClick={() => disconnect()}
          className="h-[3rem] w-full rounded-[8px] border-[1px] border-solid border-[#810E0E] px-4 text-[#810E0E]"
        >
          Disconnect
        </button>
      </div>
    </section>
  );
};

export default Profile;
