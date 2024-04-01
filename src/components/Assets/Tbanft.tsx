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
  const [open, setOpen] = useState(false);

  const Handler = () => {
    setOpen(!open);
  };
  return (
    <div className="w-full cursor-pointer  p-4 grid grid-cols-3   gap-4">
      {loadingTba ? (
        <div aria-label="loader" className="grid grid-cols-3 gap-4  lg:w-[80%]">
          <div className="w-full h-[7rem] rounded-[5px] bg-[#eae9e9] animate-pulse"></div>
          <div className="w-full h-[7rem] rounded-[5px] bg-[#eae9e9] animate-pulse"></div>
          <div className="w-full h-[7rem] rounded-[5px] bg-[#eae9e9] animate-pulse"></div>
          <div className="w-full h-[7rem] rounded-[5px] bg-[#eae9e9] animate-pulse"></div>
          <div className="w-full h-[7rem] rounded-[5px] bg-[#eae9e9] animate-pulse"></div>
          <div className="w-full h-[7rem] rounded-[5px] bg-[#eae9e9] animate-pulse"></div>
        </div>
      ) : (
        <>
          {tbanft.length == 0 ? (
            <p className="text-red-500">No NFT Asset yet</p>
          ) : (
            tbanft.map((item, index) => (
              <div key={index}>
                <Link
                  href={`/assets/${item?.contract_address}${item?.token_id}`}
                  key={index}
                >
                  <div className="rounded  overflow-hidden shadow-lg">
                    <img
                      className="w-full object-center object-cover"
                      src={item?.metadata.normalized.image}
                      alt="Card Image"
                    />
                  </div>
                </Link>
                <button
                  onClick={Handler}
                  className="mt-2 border-solid border-[1px] text-deep-blue border-deep-blue w-full rounded-[5px] "
                >
                  Transfer NFT
                </button>
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
            ))
          )}
        </>
      )}
    </div>
  );
};

export default TBANFT;
