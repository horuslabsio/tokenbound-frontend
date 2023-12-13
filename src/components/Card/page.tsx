"use client"

import { BiCopyAlt } from "react-icons/bi";
import Link from "next/link";
import { useFetchUserNFT } from "@/hooks";
import { copyToClipBoard, shortenAddress } from "../../../utils/helper";
import { CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import { toast } from "react-toastify";


const Card = () => {
  let { nft, loading } = useFetchUserNFT()

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    textAlign: 'center'

  };
  const copyToClipBoardHandler = async (text: string) => {
    const success = await copyToClipBoard(text);
    if (success) {
      toast.info(`Copied to clipboard ${text}`);
    } else {
      toast.error("Not Copied");
    }
  };

  return (
    <div className="w-full cursor-pointer  p-4">
      {
        loading &&

        <SyncLoader cssOverride={override} aria-label="Loading Spinner" size={50} color="#36d7b7" />
      }
      {
        !nft ? <p className="text-red-500">No NFT to display</p> :
          nft.map((item, index) => (
            <Link href={`/assets/${item.contract.address}`} key={index} >
              <div className=" rounded overflow-hidden shadow-lg">
                <img className="w-full" src={item?.image.pngUrl} alt="Card Image" />

                <div className="px-6 py-4 bg-white">
                  <div className="font-bold text-xl mb-2">{item.name}</div>
                  <div className="font-normal text-xl mb-2">{item.description}</div>

                  <p className="inline-flex items-center p-[2px] bg-gray-200 cursor-pointer rounded-full hover:transform hover:scale-110">
                    <span onClick={() => copyToClipBoardHandler(item.contract.address)} className="text-gray-400">{shortenAddress(item.contract.address)}</span>
                    <span className="ml-1">
                      <BiCopyAlt />
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))
      }

    </div>
  );
};

export default Card;
