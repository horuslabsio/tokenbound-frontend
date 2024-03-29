"use client";
import { BiCopyAlt } from "react-icons/bi";
import Link from "next/link";
import { useTBAAsset } from "@hooks/index";
import { copyToClipBoard, shortenAddress } from "@utils/helper";
import { toast } from "react-toastify";
import CopyButton from "@components/utils/CopyButton";

interface Itba {
  tba: string;
}

const TBANFT = ({ tba }: Itba) => {
  let formatted_address = tba.replace("0x", "0x0");
  const { tbanft, loadingTba } = useTBAAsset(formatted_address);


console.log('asset:', tbanft)
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
        <div>
          {tbanft.length == 0 ? (
            <p className="text-red-500">No NFT Asset yet</p>
          ) : (
            tbanft.map((item, index) => (
              <Link
                href={`/assets/${item?.contract_address}${item?.token_id}`}
                key={index}
              >
                <div className="h-full rounded overflow-hidden shadow-lg">
                  <img
                    className="w-full object-contain"
                    src={item?.metadata.normalized.image}
                    alt="Card Image"
                  />
                </div>
              </Link>
            ))
          )}
          </div>
        </>
      )}
    </div>
  );
};

export default TBANFT;
