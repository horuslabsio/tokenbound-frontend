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
      className="group flex h-[23.2rem] w-[19rem] cursor-pointer flex-col gap-2"
      onClick={redirect}
    >
      <div className="h-[15.6rem] w-full overflow-clip rounded-[16px]">
        <img
          className="rounded-[16px] object-cover transition-all duration-500 group-hover:scale-110"
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
          className="flex h-[2rem] w-[9rem] items-center justify-between rounded-full bg-gray-100 p-1 shadow-inner"
          copyIcon
        />
      </div>
    </div>
  );
};

export default NFTCard;
