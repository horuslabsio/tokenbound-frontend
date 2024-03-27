"use client";
import { useFetchUserNFT } from "@hooks/index";
import { CSSProperties } from "react";
import SyncLoader from "react-spinners/SyncLoader";
import NFTCard from "@components/NFTCard/page";

const NFTCollection = () => {
  let { nft, loading } = useFetchUserNFT();
  console.log(nft);
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    textAlign: "center",
  };
  return (
    <div className="grid gap-y-6 auto-cols-auto gap-6 lg:grid-cols-3 md:grid-cols-2  h-auto mt-6">
      {Boolean(loading) ? (
        <>
          <div className="w-full h-[60vh] rounded-[5px] bg-[#eae9e9] animate-pulse"></div>
          <div className="w-full h-[60vh] rounded-[5px] bg-[#eae9e9] animate-pulse"></div>
          <div className="w-full h-[60vh] rounded-[5px] bg-[#eae9e9] animate-pulse hidden lg:block"></div>
        </>
      ) : Array.isArray(nft) && nft?.length > 0 ? (
        nft?.map((item, index) => <NFTCard nft={item} key={index} />)
      ) : (
        <p className="text-red-500">No NFT to display</p>
      )}

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

export default NFTCollection;
