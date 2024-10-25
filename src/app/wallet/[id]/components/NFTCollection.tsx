"use client";
import NFTCard from "./NFTCard";
import { useInfiniteQuery } from "@tanstack/react-query";
import { getWalletNft } from "@hooks/index";
import { useParams } from "next/navigation";
import { WalletTokensApiResponse } from "types";
import { Button } from "ui/button";
import { useMemo } from "react";

const NFTCollection = () => {
  const params = useParams();
  let address = params.id as string;
  const {
    data: nfts,
    isLoading,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["walletNft", { address }],
    getNextPageParam: (lastPage: WalletTokensApiResponse) => lastPage.next_page,
    initialPageParam: undefined,
    queryFn: ({ pageParam }) =>
      getWalletNft({
        walletAddress: address,
        page: pageParam,
      }),
  });

  const walletNfts = useMemo(
    () => nfts?.pages.flatMap((page) => page.data) ?? [],
    [nfts]
  );

  return (
    <div className="flex flex-col justify-center">
      <div className="mt-6 grid h-auto auto-cols-auto gap-6 gap-y-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <>
            <div className="h-[60vh] w-full animate-pulse rounded-[5px] bg-[#eae9e9]"></div>
            <div className="h-[60vh] w-full animate-pulse rounded-[5px] bg-[#eae9e9]"></div>
            <div className="hidden h-[60vh] w-full animate-pulse rounded-[5px] bg-[#eae9e9] lg:block"></div>
          </>
        ) : nfts && walletNfts.length > 0 ? (
          nfts.pages.map((page) =>
            page.data.map((item, index) => <NFTCard nft={item} key={index} />)
          )
        ) : (
          <p className="text-red-500">No NFT to display</p>
        )}
      </div>
      {hasNextPage && (
        <Button
          size={"sm"}
          variant={"border-thin"}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="mx-auto my-8"
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
              ? "Load More"
              : "Nothing more to load"}
        </Button>
      )}
    </div>
  );
};

export default NFTCollection;
