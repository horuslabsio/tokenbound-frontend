import CopyButton from "@components/utils/CopyButton";
import { useRouter } from "next/navigation";
interface NFTCard {
  nft: any;
}
const NFTCard = ({ nft }: NFTCard) => {
  const router = useRouter();
  const redirect = () => {
    router.push(`/assets/${nft?.contract_address}${nft?.token_id}`);
  };
  return (
    <div
      className="h-[500px] w-full cursor-pointer overflow-hidden rounded-[8px] bg-white"
      onClick={redirect}
    >
      <img
        className="h-[300px] w-full object-cover"
        src={nft?.metadata?.normalized?.image}
      />
      <div className="flex h-[219px] w-full flex-col gap-4 px-[28px] pt-6">
        <p className="text-2xl font-medium text-[#0A0A0A]">
          {" "}
          {nft?.metadata?.normalized?.name}
        </p>
        <CopyButton
          textToCopy={nft?.contract_address || ""}
          copyIcon
          className="flex w-fit cursor-pointer items-center gap-x-[6px] rounded-full border-[1px] border-solid border-[#C4C4C4] bg-[#EFEFEF] px-[12px] py-[6px] text-[12px] font-normal text-[#7A7A7A]"
        />

        <p className="w-full text-[14px] font-medium leading-[20px] text-[#5A5A5A]">
          {nft?.metadata?.normalized.description}{" "}
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
