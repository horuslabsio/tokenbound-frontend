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
      className="h-[500px] w-full bg-white cursor-pointer rounded-[8px] overflow-hidden"
      onClick={redirect}
    >
      <img
        className="w-full h-[300px] object-cover "
        src={nft?.metadata?.normalized?.image}
      />
      <div className="h-[219px] w-full px-[28px] pt-6 flex flex-col gap-4">
        <p className="text-2xl text-[#0A0A0A] font-medium">
          {" "}
          {nft?.metadata?.normalized?.name}
        </p>
        <button
          className="flex gap-x-[6px] w-fit items-center py-[4px] px-[12px] bg-[#EFEFEF] border-[1px] border-[#C4C4C4] border-solid cursor-pointer rounded-full"
          title="NFT address"
          onClick={(e) => copyToClipBoardHandler(e, nft?.contract_address)}
        >
          <span className="text-[#7A7A7A] text-[12px] font-normal">
            {shortenAddress(nft?.contract_address)}
          </span>
          <span className="p-[2px]">
            <BiCopyAlt className="text-[22px]"/>
          </span>
        </button>
        <p className="w-full text-[14px] leading-[20px] text-[#5A5A5A] font-medium">
          {nft?.metadata?.normalized.description}{" "}
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
