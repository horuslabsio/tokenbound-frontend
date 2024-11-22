import { getWalletNft } from "@hooks/index";
import { useMemo, useRef, useState } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import { Button } from "ui/button";
import { WalletTokensApiResponse } from "../../../../../types";
import NothingToSee from "../ui/nothing-to-see";
import dynamic from "next/dynamic";
import Modal from "ui/modal";
const TransferNftModal = dynamic(() => import("./TransferNftModal"), {
  ssr: false,
});
const NonFungibleAsset = ({ tbaAddress }: { tbaAddress: string }) => {
  const formatted_address = tbaAddress.replace("0x", "0x0");
  const [selectedNft, setSelectedNft] = useState({
    contractAddress: "",
    tokenId: "",
  });
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
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
    [nfts]
  );

  const openTransferModal = ({
    address,
    id,
  }: {
    address: string;
    id: string;
  }) => {
    setSelectedNft({
      contractAddress: address,
      tokenId: id,
    });
    setOpenModal(true);
  };

  return (
    <div className="w-full">
      {nfts && walletNfts.length > 0 ? (
        <div className="mt-4 flex h-[23rem] max-w-[38rem] flex-col items-center overflow-y-auto rounded-[16px] bg-gray-100 p-2 2xl:max-w-[50rem]">
          <div className="grid w-full grid-cols-2 justify-between gap-2 md:grid-cols-3 2xl:grid-cols-4">
            {nfts.pages.map((page) =>
              page.data.map((item, index) => (
                <div
                  className="group relative h-[91.rem] w-full max-w-[10.4rem] md:h-[10.8rem] md:max-w-[11.8rem]"
                  key={index}
                >
                  <div className="h-full w-full overflow-clip rounded-[12px]">
                    <img
                      className="w-full scale-110 rounded-[6px] object-cover object-center"
                      src={
                        item.metadata?.image ||
                        `https://placehold.co/250x250?text=${item.token_id}`
                      }
                      alt="Card Image"
                    />
                  </div>

                  <div className="absolute left-0 top-0 grid h-full w-full place-content-center rounded-[12px] bg-black/50 opacity-0 transition-all duration-300 group-hover:opacity-100">
                    <Button
                      size={"sm"}
                      className="rounded-full"
                      onClick={() =>
                        openTransferModal({
                          address: item.collection_address,
                          id: item.token_id,
                        })
                      }
                    >
                      Transfer
                    </Button>
                  </div>
                </div>
              ))
            )}

            <Modal closeModal={closeModal} modalOpen={openModal}>
              <TransferNftModal
                closeModal={closeModal}
                tokenBoundAddress={tbaAddress}
                contractAddress={selectedNft.contractAddress}
                tokenId={selectedNft.tokenId}
              />
            </Modal>
          </div>
          {hasNextPage && (
            <Button
              isLoading={isLoading}
              size={"sm"}
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
      ) : (
        <NothingToSee />
      )}
    </div>
  );
};

export default NonFungibleAsset;
