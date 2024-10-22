import React, { CSSProperties, useState } from "react";
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
import TransferModal from "./TransferModal";
import Button from "ui/button";

const Token = ({
  balance,
  err,
  loading,
  src,
  unit,
  toggleModal,
}: {
  src: string;
  loading: boolean;
  err: Error | null;
  balance: string;
  unit: string;
  toggleModal: () => void;
}) => {
  return (
    <div className="flex w-full items-center gap-3">
      {!err && (
        <div>
          <img src={src} className="!h-[30px] !w-[40px]" alt="asset-logo" />
        </div>
      )}
      <div className="flex-1">
        {loading && !err ? (
          <div aria-label="loader" className="flex justify-between">
            <div className="h-[1.2rem] w-[10rem] animate-pulse rounded-full bg-[#eae9e9]"></div>
            <div className="h-[1.2rem] w-[5rem] animate-pulse rounded-full bg-[#eae9e9]"></div>
          </div>
        ) : (
          <>
            {err ? null : (
              <div className="flex items-center justify-between">
                <h4 className="text-[1.2em]">{`${balance} ${unit}`}</h4>
                <Button
                  disabled={+balance <= 0}
                  onClick={toggleModal}
                  size={"sm"}
                  variant={"border-thin"}
                >
                  Transfer
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const FungibleAsset = ({ tbaAddress }: { tbaAddress: string }) => {
  const [openTransferModal, setOpenTransferModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState({
    src: "",
    abbreviation: "",
    balance: "",
    name: "",
    contractAddress: "",
    decimal: 1e18,
  });
  const toggleTransferModal = (asset: {
    src: string;
    abbreviation: string;
    balance: string;
    name: string;
    contractAddress: string;
    decimal: number;
  }) => {
    setSelectedAsset(asset);
    setOpenTransferModal(!openTransferModal);
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
    <div className="mt-4 flex flex-col gap-4">
      <Token
        balance={Number.isNaN(ETH_BALANCE) ? "0.000" : ETH_BALANCE.toFixed(4)}
        err={ethError}
        loading={ethLoading}
        src={ETH.src}
        unit="ETH"
        toggleModal={() =>
          toggleTransferModal({
            src: ETH.src,
            abbreviation: "ETH",
            balance: Number.isNaN(ETH_BALANCE)
              ? "0.000"
              : ETH_BALANCE.toFixed(4),
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
        loading={starkLoading}
        src={STRK.src}
        unit="STRK"
        toggleModal={() =>
          toggleTransferModal({
            src: STRK.src,
            abbreviation: "STRK",
            balance: Number.isNaN(STARK_BALANCE)
              ? "0.000"
              : STARK_BALANCE.toFixed(4),
            name: "Stark",
            contractAddress: STARK_TOKEN_DETAILS.address,
            decimal: STARK_TOKEN_DETAILS.decimal,
          })
        }
      />

      <Token
        balance={Number.isNaN(USDC_BALANCE) ? "0.000" : USDC_BALANCE.toFixed(4)}
        err={usdcError}
        loading={usdcLoading}
        src={USDC.src}
        unit="USDC"
        toggleModal={() =>
          toggleTransferModal({
            src: USDC.src,
            abbreviation: "USDC",
            balance: Number.isNaN(USDC_BALANCE)
              ? "0.000"
              : USDC_BALANCE.toFixed(4),
            name: "USDC",
            contractAddress: USDC_TOKEN_DETAILS.address,
            decimal: USDC_TOKEN_DETAILS.decimal,
          })
        }
      />

      <Token
        balance={Number.isNaN(DAI_BALANCE) ? "0.000" : DAI_BALANCE.toFixed(4)}
        err={daiError}
        loading={daiLoading}
        src={DAI.src}
        unit="DAI"
        toggleModal={() =>
          toggleTransferModal({
            src: DAI.src,
            abbreviation: "DAI",
            balance: Number.isNaN(DAI_BALANCE)
              ? "0.000"
              : DAI_BALANCE.toFixed(4),
            name: "DAI",
            contractAddress: DAI_TOKEN_DETAILS.address,
            decimal: DAI_TOKEN_DETAILS.decimal,
          })
        }
      />
      <Token
        balance={Number.isNaN(USDT_BALANCE) ? "0.000" : USDT_BALANCE.toFixed(4)}
        err={usdtError}
        loading={usdtLoading}
        src={USDT.src}
        unit="USDT"
        toggleModal={() =>
          toggleTransferModal({
            src: USDT.src,
            abbreviation: "USDT",
            balance: Number.isNaN(USDT_BALANCE)
              ? "0.000"
              : USDT_BALANCE.toFixed(4),
            name: "USDT",
            contractAddress: USDT_TOKEN_DETAILS.address,
            decimal: USDT_TOKEN_DETAILS.decimal,
          })
        }
      />
      <TransferModal
        openModal={openTransferModal}
        closeModal={() => setOpenTransferModal(false)}
        src={selectedAsset?.src}
        abbreviation={selectedAsset?.abbreviation}
        balance={selectedAsset?.balance}
        name={selectedAsset?.name}
        contractAddress={selectedAsset?.contractAddress}
        tokenBoundAddress={tbaAddress}
        decimal={selectedAsset?.decimal}
      />
    </div>
  );
};

export default FungibleAsset;
