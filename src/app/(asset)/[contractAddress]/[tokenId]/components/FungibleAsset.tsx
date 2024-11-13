import { useRef, useState } from "react";
import ETH from "@public/eth.png";
import USDC from "@public/USDC.png";
import DAI from "@public/DAI.png";
import USDT from "@public/usdt.png";
import STRK from "@public/starknet.jpeg";
import { useContractRead } from "@starknet-react/core";
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
  const transferDialogRef = useRef<HTMLDialogElement | null>(null);
  // const [openTransferModal, setOpenTransferModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState({
    src: "",
    abbreviation: "",
    balance: "",
    name: "",
    contractAddress: "",
    decimal: 1e18,
  });

  const closeModal = () => {
    transferDialogRef?.current?.close();
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
    transferDialogRef?.current?.showModal();
  };
  // @notice
  // @dev
  // @detail: token balance to be fetched for Token bound account but temporarily fetching balance of connected address
  const {
    data: eth,
    isLoading: ethLoading,
    error: ethError,
  } = useContractRead({
    address: ETHER_TOKEN_DETAILS.address,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [tbaAddress!],
    watch: true,
  });
  const {
    data: stark,
    isLoading: starkLoading,
    error: starkError,
  } = useContractRead({
    address: STARK_TOKEN_DETAILS.address,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [tbaAddress!],
    watch: true,
  });
  const {
    data: dai,
    isLoading: daiLoading,
    error: daiError,
  } = useContractRead({
    address: DAI_TOKEN_DETAILS.address,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [tbaAddress!],
    watch: true,
  });
  const {
    data: usdc,
    isLoading: usdcLoading,
    error: usdcError,
  } = useContractRead({
    address: USDC_TOKEN_DETAILS.address,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [tbaAddress!],
    watch: true,
  });

  const {
    data: usdt,
    isLoading: usdtLoading,
    error: usdtError,
  } = useContractRead({
    address: USDT_TOKEN_DETAILS.address,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [tbaAddress!],
    watch: true,
  });

  // @ts-ignore
  let ETH_BALANCE = eth?.balance?.low.toString() / 1e18;
  // @ts-ignore
  let STARK_BALANCE = stark?.balance?.low.toString() / 1e18;
  // @ts-ignore
  let DAI_BALANCE = dai?.balance?.low.toString() / 1e18;
  // @ts-ignore
  let USDC_BALANCE = usdc?.balance?.low.toString() / 1e6;
  //@ts-ignore
  let USDT_BALANCE = usdt?.balance?.low.toString() / 1e6;
  return (
    <div className="relative mt-4 flex max-w-[38rem] flex-col rounded-[16px] bg-gray-100 p-4 2xl:max-w-[50rem]">
      <Token
        balance={Number.isNaN(ETH_BALANCE) ? "0.000" : ETH_BALANCE.toFixed(4)}
        err={ethError}
        src={ETH.src}
        unit="ETH"
        name="Ether"
        toggleModal={() =>
          openTransferModal({
            src: ETH.src,
            abbreviation: "ETH",
            balance: Number.isNaN(ETH_BALANCE)
              ? "0.000"
              : ETH_BALANCE.toFixed(3),
            name: "Ethereum",
            contractAddress: ETHER_TOKEN_DETAILS.address,
            decimal: ETHER_TOKEN_DETAILS.decimal,
          })
        }
      />

      <Token
        balance={
          Number.isNaN(STARK_BALANCE) ? "0.000" : STARK_BALANCE.toFixed(4)
        }
        err={starkError}
        src={STRK.src}
        unit="STRK"
        name="Stark"
        toggleModal={() =>
          openTransferModal({
            src: STRK.src,
            abbreviation: "STRK",
            balance: Number.isNaN(STARK_BALANCE)
              ? "0.000"
              : STARK_BALANCE.toFixed(3),
            name: "Stark",
            contractAddress: STARK_TOKEN_DETAILS.address,
            decimal: STARK_TOKEN_DETAILS.decimal,
          })
        }
      />
      <Token
        balance={Number.isNaN(USDT_BALANCE) ? "0.000" : USDT_BALANCE.toFixed(4)}
        err={usdtError}
        src={USDT.src}
        unit="USDT"
        name="Tether USD"
        toggleModal={() =>
          openTransferModal({
            src: USDT.src,
            abbreviation: "USDT",
            balance: Number.isNaN(USDT_BALANCE)
              ? "0.000"
              : USDT_BALANCE.toFixed(3),
            name: "USDT",
            contractAddress: USDT_TOKEN_DETAILS.address,
            decimal: USDT_TOKEN_DETAILS.decimal,
          })
        }
      />

      <Token
        balance={Number.isNaN(USDC_BALANCE) ? "0.000" : USDC_BALANCE.toFixed(4)}
        err={usdcError}
        src={USDC.src}
        unit="USDC"
        name="USD coin"
        toggleModal={() =>
          openTransferModal({
            src: USDC.src,
            abbreviation: "USDC",
            balance: Number.isNaN(USDC_BALANCE)
              ? "0.000"
              : USDC_BALANCE.toFixed(3),
            name: "USDC",
            contractAddress: USDC_TOKEN_DETAILS.address,
            decimal: USDC_TOKEN_DETAILS.decimal,
          })
        }
      />

      <Token
        balance={Number.isNaN(DAI_BALANCE) ? "0.000" : DAI_BALANCE.toFixed(4)}
        err={daiError}
        src={DAI.src}
        unit="DAI"
        name="DAI"
        toggleModal={() =>
          openTransferModal({
            src: DAI.src,
            abbreviation: "DAI",
            balance: Number.isNaN(DAI_BALANCE)
              ? "0.000"
              : DAI_BALANCE.toFixed(3),
            name: "DAI",
            contractAddress: DAI_TOKEN_DETAILS.address,
            decimal: DAI_TOKEN_DETAILS.decimal,
          })
        }
      />
      <dialog
        className="inset-0 h-screen w-screen bg-transparent"
        ref={transferDialogRef}
      >
        <TransferModal
          closeModal={closeModal}
          abbreviation={selectedAsset?.abbreviation}
          balance={selectedAsset?.balance}
          contractAddress={selectedAsset?.contractAddress}
          tokenBoundAddress={tbaAddress}
          decimal={selectedAsset?.decimal}
        />
      </dialog>
      {/* UI div to cover all last borders */}
      <div className="absolute bottom-2 h-4 w-[95%] bg-gray-100"></div>
    </div>
  );
};

export default FungibleAsset;
