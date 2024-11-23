"use client";
import { getWalletNft } from "@hooks/index";
import { useInfiniteQuery } from "@tanstack/react-query";
import { useAccount } from "@starknet-react/core";
import { WalletTokensApiResponse } from "../../../../types";
import { useMemo } from "react";
import { Button } from "ui/button";
import NFTCard from "./NFTCard";

const NFTCollection = () => {
  const { address } = useAccount();
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
        walletAddress: address || "",
        page: pageParam,
      }),
    enabled: !!address,
  });

  const walletNfts = useMemo(
    () => nfts?.pages.flatMap((page) => page.data) ?? [],
    [nfts]
  );
  return (
    <div className="flex flex-col items-center">
      {!isLoading && nfts && walletNfts.length > 0 ? (
        <div className="mx-auto grid h-auto w-full max-w-[23rem] auto-cols-auto gap-6 md:max-w-none md:grid-cols-3 lg:grid-cols-4">
          {nfts.pages.map((page) =>
            page.data.map((item, index) => <NFTCard nft={item} key={index} />)
          )}
        </div>
      ) : (
        <div className="mx-auto my-auto mt-[25%] h-[70vh] md:mt-0 md:grid md:place-content-center">
          <div className="grid h-[13.5rem] w-[90vw] max-w-[29rem] place-content-center rounded-[16px] bg-gray-100 md:max-w-[38rem] 2xl:max-w-[48rem]">
            <p className="text-lg">Nothing to show yet.</p>
          </div>
        </div>
      )}
      {hasNextPage && (
        <Button
          size={"sm"}
          isLoading={isLoading}
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="mx-auto my-8 rounded-full"
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
