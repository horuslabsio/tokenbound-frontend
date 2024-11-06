import { getWalletNft } from "@hooks/index";
import Link from "next/link";
import { useMemo, useState } from "react";
import TransferNftModal from "./TransferNftModal";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "ui/button";
import { WalletTokensApiResponse } from "../../../../../types";

const NonFungibleAsset = ({ tbaAddress }: { tbaAddress: string }) => {
  const formatted_address = tbaAddress.replace("0x", "0x0");
  const [open, setOpen] = useState(false);

  const Handler = () => {
    setOpen(!open);
  };

  const {
    data: nfts,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: [`tba-nfts-${formatted_address}`, { formatted_address }],
    getNextPageParam: (lastPage: WalletTokensApiResponse) => lastPage.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getWalletNft({
        walletAddress: formatted_address || "",
        page: pageParam,
      }),
    enabled: !!formatted_address,
  });
  const walletNfts = useMemo(
    () => nfts?.pages.flatMap((page) => page.data) ?? [],
    [nfts],
  );

  return (
    <div className="w-full">
      {isLoading ? (
        <div
          aria-label="loader"
          className="mt-8 grid max-w-[350px] grid-cols-3 justify-between gap-2"
        >
          <div className="h-[7rem] w-full animate-pulse rounded-[5px] bg-gray-50"></div>
          <div className="h-[7rem] w-full animate-pulse rounded-[5px] bg-gray-50"></div>
          <div className="h-[7rem] w-full animate-pulse rounded-[5px] bg-gray-50"></div>
        </div>
      ) : (
        <>
          {nfts && walletNfts.length > 0 ? (
            <div className="mt-8 grid max-h-[310px] max-w-[350px] grid-cols-3 justify-between gap-2 overflow-auto">
              {nfts.pages.map((page) =>
                page.data.map((item, index) => (
                  <div className="group relative" key={index}>
                    <Link
                      href={`/assets/${item.collection_address}${item?.token_id}`}
                      key={index}
                    >
                      <div className="h-[7rem] w-full rounded-[6px]">
                        <img
                          className="w-full rounded-[6px] object-cover object-center"
                          src={
                            item.metadata?.image ||
                            `https://placehold.co/250x250?text=${item.token_id}`
                          }
                          alt="Card Image"
                        />
                      </div>
                    </Link>
                    <div className="absolute left-0 top-0 grid h-full w-full place-content-center bg-[#ffffffd1] opacity-0 transition-all group-hover:opacity-100">
                      <Button size={"sm"} onClick={Handler}>
                        Transfer
                      </Button>
                    </div>
                    {open && (
                      <TransferNftModal
                        openModal={open}
                        closeModal={Handler}
                        tokenBoundAddress={tbaAddress}
                        contractAddress={item.collection_address}
                        tokenId={item.token_id}
                      />
                    )}
                  </div>
                )),
              )}
            </div>
          ) : (
            <p className="mt-8 text-red-500">No NFT Asset yet</p>
          )}
        </>
      )}
    </div>
  );
};

export default NonFungibleAsset;
