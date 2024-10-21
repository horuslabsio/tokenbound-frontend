"use client";
import Link from "next/link";
import { useTBAAsset } from "@hooks/index";
import { useState } from "react";
import TransferNftModal from "./TransferNftModal";

interface Itba {
  tba: string;
}

const TBANFT = ({ tba }: Itba) => {
  let formatted_address = tba.replace("0x", "0x0");
  const { tbanft, loadingTba } = useTBAAsset(formatted_address);
  console.log(tbanft);

  const [open, setOpen] = useState(false);

  const Handler = () => {
    setOpen(!open);
  };
  return (
    <div className="w-full cursor-pointer  ">
      {loadingTba ? (
        <div
          aria-label="loader"
          className="grid grid-cols-3 max-w-[350px] justify-between gap-2 mt-8"
        >
          <div className="w-full h-[7rem] rounded-[5px] bg-[#eae9e9] animate-pulse"></div>
          <div className="w-full h-[7rem] rounded-[5px] bg-[#eae9e9] animate-pulse"></div>
          <div className="w-full h-[7rem] rounded-[5px] bg-[#eae9e9] animate-pulse"></div>
        </div>
      ) : (
        <>
          {tbanft.length == 0 ? (
            <p className="text-red-500 mt-8">No NFT Asset yet</p>
          ) : (
            <div className="grid grid-cols-3 max-w-[350px] justify-between gap-2 mt-8">
              {tbanft.map((item, index) => (
                <div className="relative group" key={index}>
                  <Link
                    href={`/assets/${item?.contract_address}${item?.token_id}`}
                    key={index}
                  >
                    <div className="rounded-[6px] w-full h-[7rem]">
                      <img
                        className="w-full rounded-[6px] object-center object-cover"
                        src={
                          item?.metadata?.normalized?.image ||
                          `https://placehold.co/250x250?text=${item.token_id}`
                        }
                        alt="Card Image"
                      />
                    </div>
                  </Link>
                  <div className="absolute bg-[#ffffffd1] transition-all opacity-0 group-hover:opacity-100 top-0 left-0 w-full h-full grid place-content-center">
                    <button
                      onClick={Handler}
                      className="border-deep-blue border text-sm text-deep-blue py-1 px-2 rounded-[6px] disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Transfer
                    </button>
                  </div>
                  {open && (
                    <TransferNftModal
                      openModal={open}
                      closeModal={Handler}
                      tokenBoundAddress={tba}
                      contractAddress={item?.contract_address}
                      tokenId={item.token_id}
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TBANFT;
