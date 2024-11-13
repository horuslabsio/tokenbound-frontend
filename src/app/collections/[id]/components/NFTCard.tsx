import { WalletToken } from "types";
import { useRouter } from "next/navigation";
import { CopyButton } from "ui/copy-button";
interface NFTCard {
  nft: WalletToken;
}
const NFTCard = ({ nft }: NFTCard) => {
  const router = useRouter();
  const redirect = () => {
    router.push(`/${nft?.collection_address}/${nft?.token_id}`);
  };
  return (
    <div
      className="group flex h-[23.2rem] w-full cursor-pointer flex-col gap-4 md:max-w-[19rem] md:gap-2 2xl:h-[28rem] 2xl:max-w-[29rem]"
      onClick={redirect}
    >
      <div className="h-[15.6rem] w-full overflow-clip rounded-[16px] 2xl:h-[20rem]">
        <img
          className="scale-105 rounded-[16px] object-cover transition-all duration-500 group-hover:scale-[1.15]"
          src={nft?.metadata?.image}
        />
      </div>
      <div className="flex w-full flex-1 flex-col justify-between gap-1">
        <p className="text-foreground-secondary">
          {nft?.metadata?.name || "No name available"}
        </p>
        <p className="line-clamp-2">{nft?.metadata?.description || ""}</p>
        <CopyButton
          textToCopy={nft?.collection_address || ""}
          className="flex h-[2.1rem] w-[9rem] items-center justify-between rounded-full bg-gray-100 px-4 py-2 shadow-inner lg:w-[10rem]"
          copyIcon
        />
      </div>
    </div>
  );
};

export default NFTCard;
