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
    [nfts],
  );
  return (
    <div>
      {!isLoading && nfts && walletNfts.length > 0 ? (
        <div className="mx-auto grid h-auto auto-cols-auto gap-6 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
          {nfts.pages.map((page) =>
            page.data.map((item, index) => <NFTCard nft={item} key={index} />),
          )}
        </div>
      ) : (
        <div className="mx-auto my-auto grid h-[70vh] place-content-center">
          <div className="grid h-[13.5rem] w-[38rem] place-content-center rounded-[16px] bg-gray-100">
            <p className="text-lg">Nothing to show yet.</p>
          </div>
        </div>
      )}

      {hasNextPage && (
        <Button
          size={"sm"}
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
