import CopyButton from "@components/utils/CopyButton";
import { shortenAddress } from "@utils/helper";
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
        <CopyButton
          textToCopy={nft?.contract_address || ""}
          textDisplayed={shortenAddress(nft?.contract_address) || ""}
          style="flex gap-x-[6px] w-fit items-center py-[6px] px-[12px] bg-[#EFEFEF] border-[1px] border-[#C4C4C4] border-solid cursor-pointer rounded-full text-[#7A7A7A] text-[12px] font-normal"
        />

        <p className="w-full text-[14px] leading-[20px] text-[#5A5A5A] font-medium">
          {nft?.metadata?.normalized.description}{" "}
        </p>
      </div>
    </div>
  );
};

export default NFTCard;
