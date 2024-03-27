"use client";
import { useFetchUserNFT } from "@hooks/index";
import NFTCard from "@components/NFTCard/page";

const NFTCollection = () => {
  let { nft, loading } = useFetchUserNFT();
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
    </div>
  );
};

export default NFTCollection;
