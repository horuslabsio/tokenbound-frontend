import { useState } from "react";
import ETH from "@public/eth.png";
import USDC from "@public/USDC.png";
import DAI from "@public/DAI.png";
import USDT from "@public/usdt.png";
import STRK from "@public/starknet.jpeg";
import {
  DAI_TOKEN_DETAILS,
  ETHER_TOKEN_DETAILS,
  STARK_TOKEN_DETAILS,
  USDC_TOKEN_DETAILS,
  USDT_TOKEN_DETAILS,
} from "@utils/constants";
import { Button } from "ui/button";
import { RightArrow } from "@public/icons";
import dynamic from "next/dynamic";
import Modal from "ui/modal";
import { useTokenBalance } from "@utils/helper";
import { TokenDetailsProps } from "../../../../../types/index";

const TransferModal = dynamic(() => import("./TransferModal"), { ssr: false });

const FungibleAsset = ({ tbaAddress }: { tbaAddress: string }) => {
  const [selectedAsset, setSelectedAsset] = useState({
    src: "",
    symbol: "",
    balance: "",
    tokenAddress: "",
    decimal: 1e18,
  });
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };
  const openTransferModal = (asset: {
    src: string;
    symbol: string;
    balance: string;
    tokenAddress: string;
    decimal: number;
  }) => {
    setSelectedAsset(asset);
    setOpenModal(true);
  };

  return (
    <div className="relative mt-4 flex max-w-[38rem] flex-col rounded-[16px] bg-gray-100 p-4 2xl:max-w-[50rem]">
      <Token
        src={ETH.src}
        name="Ether"
        tokenDetails={ETHER_TOKEN_DETAILS}
        tbaAddress={tbaAddress}
        toggleModal={openTransferModal}
      />

      <Token
        src={STRK.src}
        name="Stark"
        tokenDetails={STARK_TOKEN_DETAILS}
        tbaAddress={tbaAddress}
        toggleModal={openTransferModal}
      />
      <Token
        src={USDT.src}
        name="Tether USD"
        tokenDetails={USDT_TOKEN_DETAILS}
        tbaAddress={tbaAddress}
        toggleModal={openTransferModal}
      />

      <Token
        src={USDC.src}
        name="USD coin"
        tokenDetails={USDC_TOKEN_DETAILS}
        tbaAddress={tbaAddress}
        toggleModal={openTransferModal}
      />
      <Token
        src={DAI.src}
        tokenDetails={DAI_TOKEN_DETAILS}
        tbaAddress={tbaAddress}
        name="DAI"
        toggleModal={openTransferModal}
      />

      <Modal closeModal={closeModal} modalOpen={openModal}>
        <TransferModal
          closeModal={closeModal}
          abbreviation={selectedAsset?.symbol}
          balance={selectedAsset?.balance}
          contractAddress={selectedAsset?.tokenAddress}
          tokenBoundAddress={tbaAddress}
          decimal={selectedAsset?.decimal}
        />
      </Modal>

      {/* UI div to cover all last borders */}
      <div className="absolute bottom-2 h-4 w-[95%] bg-gray-100"></div>
    </div>
  );
};

export default FungibleAsset;

const Token = ({
  src,
  toggleModal,
  name,
  tokenDetails,
  tbaAddress,
}: {
  src: string;
  name: string;

  tokenDetails: TokenDetailsProps;
  tbaAddress: string;
  toggleModal: (asset: {
    src: string;
    symbol: string;
    balance: string;
    tokenAddress: string;
    decimal: number;
  }) => void;
}) => {
  const { formatted, error, symbol, decimals } = useTokenBalance({
    tokenAddress: tokenDetails.address as `0x${string}`,
    accountAddress: tbaAddress as `0x${string}`,
  });
  const balance = Number(formatted).toFixed(3);

  const asset = {
    src,
    symbol: symbol || "",
    balance,
    tokenAddress: tokenDetails.address,
    decimal: 10 ** (decimals ?? 18),
  };

  if (error) return null;

  return (
    <>
      <div
        className={`flex w-full items-center justify-between border-b border-[#EAEAEA] py-2`}
      >
        <div className="flex items-center gap-2 md:gap-4">
          <div>
            <img
              src={src}
              className="h-[28px] w-[28px] md:h-[32px] md:w-[32px]"
              alt="asset-logo"
            />
          </div>
          <div>
            <p className="uppercase">{symbol}</p>
            <p className="md:hidden">{`${balance} ${symbol}`}</p>
            <p className="hidden text-sm capitalize md:block">{name}</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="hidden text-base md:block">{`${balance} ${symbol}`}</p>
          <Button
            variant={"ghost"}
            className="rounded-full bg-white px-1 py-2 text-black md:px-3"
            disabled={+balance <= 0}
            onClick={() => toggleModal(asset)}
            size={"sm"}
            endIcon={<RightArrow />}
          >
            <span>Send</span>
          </Button>
        </div>
      </div>
    </>
  );
};
