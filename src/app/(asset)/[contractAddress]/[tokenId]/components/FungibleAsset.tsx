import { useRef, useState } from "react";
import ETH from "@public/eth.png";
import USDC from "@public/USDC.png";
import DAI from "@public/DAI.png";
import USDT from "@public/usdt.png";
import STRK from "@public/starknet.jpeg";
import { useReadContract } from "@starknet-react/core";
import {
  DAI_TOKEN_DETAILS,
  ETHER_TOKEN_DETAILS,
  STARK_TOKEN_DETAILS,
  USDC_TOKEN_DETAILS,
  USDT_TOKEN_DETAILS,
} from "@utils/constants";
import Erc20Abi from "@abis/token.abi.json";
import { Button } from "ui/button";
import { RightArrow } from "@public/icons";
import dynamic from "next/dynamic";
import Modal from "ui/modal";
const TransferModal = dynamic(() => import("./TransferModal"), { ssr: false });

const Token = ({
  balance,
  err,
  src,
  unit,
  toggleModal,
  name,
}: {
  src: string;

  err: Error | null;
  balance: string;
  unit: string;
  name: string;
  toggleModal: () => void;
}) => {
  return (
    <>
      {err ? null : (
        <div
          className={`flex w-full items-center justify-between border-b border-[#EAEAEA] py-2`}
        >
          <div className="flex gap-2 md:gap-4">
            <div>
              <img
                src={src}
                className="h-[28px] w-[28px] md:h-[32px] md:w-[32px]"
                alt="asset-logo"
              />
            </div>
            <div>
              <p className="uppercase">{unit}</p>
              <p className="text-sm capitalize">{name}</p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4">
            <p className="md:text-base">{`${balance} ${unit}`}</p>
            <Button
              variant={"ghost"}
              className="rounded-full bg-white px-1 py-2 text-black md:px-3"
              disabled={+balance <= 0}
              onClick={toggleModal}
              size={"sm"}
              endIcon={<RightArrow />}
            >
              <span>Send</span>
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

const FungibleAsset = ({ tbaAddress }: { tbaAddress: string }) => {
  const [selectedAsset, setSelectedAsset] = useState({
    src: "",
    abbreviation: "",
    balance: "",
    name: "",
    contractAddress: "",
    decimal: 1e18,
  });
  const [openModal, setOpenModal] = useState(false);

  const closeModal = () => {
    setOpenModal(false);
  };
  const openTransferModal = (asset: {
    src: string;
    abbreviation: string;
    balance: string;
    name: string;
    contractAddress: string;
    decimal: number;
  }) => {
    setSelectedAsset(asset);
    setOpenModal(true);
  };

  const tokens = [
    {
      details: ETHER_TOKEN_DETAILS,
      src: ETH.src,
      unit: "ETH",
      name: "Ether",
      decimal: 1e18,
    },
    {
      details: STARK_TOKEN_DETAILS,
      src: STRK.src,
      unit: "STRK",
      name: "Stark",
      decimal: 1e18,
    },
    {
      details: USDT_TOKEN_DETAILS,
      src: USDT.src,
      unit: "USDT",
      name: "Tether USD",
      decimal: 1e6,
    },
    {
      details: USDC_TOKEN_DETAILS,
      src: USDC.src,
      unit: "USDC",
      name: "USD Coin",
      decimal: 1e6,
    },
    {
      details: DAI_TOKEN_DETAILS,
      src: DAI.src,
      unit: "DAI",
      name: "DAI",
      decimal: 1e18,
    },
  ];

  const tokenData = tokens.map(({ details, src, unit, name, decimal }) => {
    const { data, error } = useReadContract({
      address: `0x${details.address.slice(2)}`,
      abi: Erc20Abi,
      functionName: "balanceOf",
      args: [tbaAddress!],
      watch: true,
    });
    const BALANCE = data?.balance?.low.toString() / decimal;
    // Convert balance to a human-readable format
    const balance = Number.isNaN(BALANCE) ? "0.000" : BALANCE.toFixed(4);

    return { src, unit, name, balance, error, details, decimal };
  });

  return (
    <div className="relative mt-4 flex max-w-[38rem] flex-col rounded-[16px] bg-gray-100 p-4 2xl:max-w-[50rem]">
      {tokenData.map(
        ({ src, unit, name, balance, error, details, decimal }) => (
          <Token
            key={unit}
            src={src}
            unit={unit}
            name={name}
            balance={balance}
            err={error}
            toggleModal={() =>
              openTransferModal({
                src,
                abbreviation: unit,
                balance,
                name,
                contractAddress: details.address,
                decimal,
              })
            }
          />
        )
      )}

      <Modal closeModal={closeModal} modalOpen={openModal}>
        <TransferModal
          closeModal={closeModal}
          abbreviation={selectedAsset?.abbreviation}
          balance={selectedAsset?.balance}
          contractAddress={selectedAsset?.contractAddress}
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
