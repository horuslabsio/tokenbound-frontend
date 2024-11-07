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
    <div className="flex flex-col justify-center">
      <div className="mx-auto grid h-auto auto-cols-auto gap-6 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
        {!isLoading && nfts && walletNfts.length > 0 ? (
          nfts.pages.map((page) =>
            page.data.map((item, index) => <NFTCard nft={item} key={index} />),
          )
        ) : (
          <p className="text-red-500">No NFT to display</p>
        )}
      </div>
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
