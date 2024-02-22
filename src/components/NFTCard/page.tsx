import { copyToClipBoard, shortenAddress } from "@utils/helper";
import { useRouter } from "next/navigation";
import React, { SyntheticEvent } from "react";
import { BiCopyAlt } from "react-icons/bi";
import { toast } from "react-toastify";
interface NFTCard {
  nft: any;
}
const NFTCard = ({ nft }: NFTCard) => {
  const router = useRouter();
  const copyToClipBoardHandler = async (e: SyntheticEvent, text: string) => {
    e.stopPropagation();
    const success = await copyToClipBoard(text);
    if (success) {
      toast.info(`Copied to clipboard ${text}`);
    } else {
      toast.error("Not Copied");
    }
  };
  const redirect = () => {
    router.push(`/assets/${nft?.contract_address}${nft?.token_id}`);
  };
  return (
    <div
      className="h-[500px] w-full rounded-xl bg-white cursor-pointer "
      onClick={redirect}
    >
      <img
        className="w-full h-[300px] object-cover rounded-xl"
        src={nft?.metadata?.normalized?.image}
      />
      <div className="h-full w-full p-8 flex flex-col gap-4">
        <p className="text-2xl text-black">
          {" "}
          {nft?.metadata?.normalized?.name}
        </p>
        <p
          className="inline-flex items-center p-[4px] bg-gray-200 cursor-pointer rounded-full hover:transform hover:scale-110 w-[124px]"
          title="NFT address"
          onClick={(e) => copyToClipBoardHandler(e, nft?.contract_address)}
        >
          <span className="text-gray-400">
            {shortenAddress(nft?.contract_address)}
          </span>
          <span className="ml-1 border-l p-[2px] border-gray-500">
            <BiCopyAlt />
          </span>
        </p>
        <p className="w-full text-lg line-clamp-2 ">
          {nft?.metadata?.normalized.description}{" "}
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
