"use client";
import Link from "next/link";
import { useTBAAsset } from "@hooks/index";
import { useState } from "react";
import TransferNftModal from "./TransferNftModal";
import Button from "ui/button";

interface Itba {
  tba: string;
}

const TBANFT = ({ tba }: Itba) => {
  let formatted_address = tba.replace("0x", "0x0");
  const { tbanft, loadingTba } = useTBAAsset(formatted_address);
  const [open, setOpen] = useState(false);

  const Handler = () => {
    setOpen(!open);
  };
  return (
    <div className="w-full cursor-pointer">
      {loadingTba ? (
        <div
          aria-label="loader"
          className="mt-8 grid max-w-[350px] grid-cols-3 justify-between gap-2"
        >
          <div className="h-[7rem] w-full animate-pulse rounded-[5px] bg-[#eae9e9]"></div>
          <div className="h-[7rem] w-full animate-pulse rounded-[5px] bg-[#eae9e9]"></div>
          <div className="h-[7rem] w-full animate-pulse rounded-[5px] bg-[#eae9e9]"></div>
        </div>
      ) : (
        <>
          {tbanft.length == 0 ? (
            <p className="mt-8 text-red-500">No NFT Asset yet</p>
          ) : (
            <div className="mt-8 grid max-w-[350px] grid-cols-3 justify-between gap-2">
              {tbanft.map((item, index) => (
                <div className="group relative" key={index}>
                  <Link
                    href={`/assets/${item?.contract_address}${item?.token_id}`}
                    key={index}
                  >
                    <div className="h-[7rem] w-full rounded-[6px]">
                      <img
                        className="w-full rounded-[6px] object-cover object-center"
                        src={
                          item?.metadata?.normalized?.image ||
                          `https://placehold.co/250x250?text=${item.token_id}`
                        }
                        alt="Card Image"
                      />
                    </div>
                  </Link>
                  <div className="absolute left-0 top-0 grid h-full w-full place-content-center bg-[#ffffffd1] opacity-0 transition-all group-hover:opacity-100">
                    <Button
                      size={"sm"}
                      variant={"border-thin"}
                      onClick={Handler}
                    >
                      Transfer
                    </Button>
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
