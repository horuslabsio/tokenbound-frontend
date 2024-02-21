"use client"

import { BiCopyAlt } from "react-icons/bi";
import Link from "next/link";
import { useFetchUserNFT } from "@hooks/index";
import { copyToClipBoard, shortenAddress } from "@utils/helper";
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
    <div className="w-full cursor-pointer  p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {
        loading &&

        <SyncLoader cssOverride={override} aria-label="Loading Spinner" size={50} color="#36d7b7" />
      }
      {
        nft.length == 0 ? <p className="text-red-500">No NFT to display</p> : nft.map((item, index) => (
          <Link href={`/assets/${item?.contract_address}${item?.token_id}`} key={index} >
            <div className="h-full rounded overflow-hidden shadow-lg">
              <img className="w-full" src={item?.metadata.normalized.image} alt="Card Image" />

              <div className="px-6 py-4 bg-white">
                <div className="font-bold text-xl mb-2">{item?.metadata.normalized.name}</div>
                <div className="font-normal text-xl mb-2">{item?.metadata.normalized.description?.slice(0, 60)}...</div>

                <p className="inline-flex items-center p-[2px] bg-gray-200 cursor-pointer rounded-full hover:transform hover:scale-110" title="NFT address">
                  <span onClick={() => copyToClipBoardHandler(item?.contract_address)} className="text-gray-400">{shortenAddress(item.contract_address)}</span>
                  <span className="ml-1">
                    <BiCopyAlt />
                  </span>
                </p>
              </div>
            </div>
          </Link>
        ))
      }
      

      {/* {
        nft.length == 0 ? <p className="text-red-500">No NFT to display</p> :
          nft.map((item, index) => (
            <Link href={`/assets/${item.contract?.address}${item?.tokenId}`} key={index} >
              <div className="h-full rounded overflow-hidden shadow-lg">
                <img className="w-full" src={item?.image.pngUrl} alt="Card Image" />

                <div className="px-6 py-4 bg-white">
                  <div className="font-bold text-xl mb-2">{item?.name}</div>
                  <div className="font-normal text-xl mb-2">{item?.description?.slice(0, 60)}...</div>

                  <p className="inline-flex items-center p-[2px] bg-gray-200 cursor-pointer rounded-full hover:transform hover:scale-110" title="NFT address">
                    <span onClick={() => copyToClipBoardHandler(item?.contract.address)} className="text-gray-400">{shortenAddress(item.contract.address)}</span>
                    <span className="ml-1">
                      <BiCopyAlt />
                    </span>
                  </p>
                </div>
              </div>
            </Link>
          ))
      } */}

    </div>
  );
};

export default Card;
