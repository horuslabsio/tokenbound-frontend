"use client";
import { useFetchUserNFT } from "@hooks/index";
import NFTCard from "./NFTCard";

const NFTCollection = () => {
  let { nft, loading } = useFetchUserNFT();
  return (
    <div className="mt-6 grid h-auto auto-cols-auto gap-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
      {Boolean(loading) ? (
        <>
          <div className="h-[60vh] w-full animate-pulse rounded-[5px] bg-[#eae9e9]"></div>
          <div className="h-[60vh] w-full animate-pulse rounded-[5px] bg-[#eae9e9]"></div>
          <div className="hidden h-[60vh] w-full animate-pulse rounded-[5px] bg-[#eae9e9] lg:block"></div>
        </>
      ) : Array.isArray(nft) && nft?.length > 0 ? (
        nft?.map((item, index) => <NFTCard nft={item} key={index} />)
      ) : (
        <p className="text-red-500">No NFT to display</p>
      )}
    </div>
  );
};

export default NFTCollection;
