"use client";
import { CryptoIcon, ImageIcon } from "@public/icons";
import { useState } from "react";
import NonFungibleAsset from "./NonFungibleAsset";
import FungibleAsset from "./FungibleAsset";
import { useRefreshMetadata } from "@hooks/index";
import { Button } from "ui/button";
import NothingToSee from "../ui/nothing-to-see";

const Portfolio = ({
  tbaAddress,
  contractAddress,
  tokenId,
  deployed,
}: {
  tbaAddress: string;
  contractAddress: string;
  tokenId: string;
  deployed: boolean | null;
}) => {
  const [isCollectible, setIsCollectible] = useState(true);
  const toggleContent = () => {
    setIsCollectible((prevIsCollectible) => !prevIsCollectible);
  };
  const { refreshMetadata, loading, success } = useRefreshMetadata(
    contractAddress,
    tokenId,
  );

  return (
    <>
      <div className="mt-4 flex w-fit items-center gap-[12px] rounded-full bg-gray-100 p-1 md:min-h-[3rem]">
        <Button
          startIcon={<ImageIcon />}
          onClick={toggleContent}
          className={`transition-all duration-300 ${isCollectible ? "rounded-full bg-black" : "bg-grey-100 text-foreground-primary"}`}
        >
          Collectible
        </Button>
        <Button
          startIcon={<CryptoIcon />}
          onClick={toggleContent}
          className={`transition-all duration-300 ${!isCollectible ? "rounded-full bg-black" : "bg-grey-100 text-foreground-primary"}`}
        >
          Assets
        </Button>
      </div>

      <div className="relative z-10 grid grid-cols-[1fr] grid-rows-[1fr]">
        <div
          className={`col-start-1 row-start-1 transition-all duration-300 ${
            isCollectible
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <NonFungibleAsset tbaAddress={tbaAddress} />
        </div>
        <div
          className={`col-start-1 row-start-1 transition-all duration-300 ${
            isCollectible
              ? "pointer-events-none opacity-0"
              : "pointer-events-auto opacity-100"
          }`}
        >
          {deployed ? (
            <FungibleAsset tbaAddress={tbaAddress} />
          ) : (
            <NothingToSee />
          )}
        </div>
        <div className="absolute bottom-0 h-6 w-full translate-y-full bg-white"></div>
      </div>
    </>
  );
};

export default Portfolio;
