import React, { CSSProperties, useState } from "react";
import ETH from "@public/eth.png";
import USDC from "@public/USDC.png";
import DAI from "@public/DAI.png";
import USDT from "@public/usdt.png";
import { useContractRead } from "@starknet-react/core";
import {
  DaiTokenAddress,
  EtherTokenAddress,
  UsdcTokenAddress,
  usdtTokenAddress,
} from "@utils/constants";
import Erc20Abi from "@abis/token.abi.json";
import { BounceLoader } from "react-spinners";

interface AssetProps {
  tokenBoundAddress: string; // Define the 'address' prop
}

const FungibleAsset = ({
  balance,
  err,
  loading,
  src,
  unit,
}: {
  src: string;
  loading: boolean;
  err: Error | null;
  balance: string;
  unit: string;
}) => {
  return (
    <div className="flex w-full items-center gap-3">
      <div>
        <img src={src} className="!w-[40px] !h-[30px]" alt="asset-logo" />
      </div>
      <div className="flex-1">
        {
          //@ts-ignore
          loading ? (
            <div aria-label="loader" className="flex justify-between">
              <div className="w-[10rem] h-[1.2rem] rounded-full bg-[#eae9e9] animate-pulse"></div>
              <div className="w-[5rem] h-[1.2rem] rounded-full bg-[#eae9e9] animate-pulse"></div>
            </div>
          ) : (
            <>
              {err ? (
                <p className="text-red-700">Failed to fetch token</p>
              ) : (
                <div className="flex items-center justify-between">
                  <h4 className="text-[1.2em]">{`${balance} ${unit}`}</h4>
                  <button className="border-solid border-[1px] text-deep-blue border-deep-blue p-2 rounded-[5px]">
                    Transfer
                  </button>
                </div>
              )}
            </>
          )
        }
      </div>
    </div>
  );
};
function Asset({ tokenBoundAddress }: AssetProps) {
  // @notice
  // @dev
  // @detail: token balance to be fetched for Token bound account but temporarily fetching balance of connected address
  const {
    data: eth,
    isLoading: ethLoading,
    error: ethError,
  } = useContractRead({
    address: EtherTokenAddress,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [tokenBoundAddress!],
    watch: true,
  });
  const {
    data: dai,
    isLoading: daiLoading,
    error: daiError,
  } = useContractRead({
    address: DaiTokenAddress,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [tokenBoundAddress!],
    watch: true,
  });
  const {
    data: usdc,
    isLoading: usdcLoading,
    error: usdcError,
  } = useContractRead({
    address: UsdcTokenAddress,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [tokenBoundAddress!],
    watch: true,
  });

  const {
    data: usdt,
    isLoading: usdtLoading,
    error: usdtError,
  } = useContractRead({
    address: usdtTokenAddress,
    abi: Erc20Abi,
    functionName: "balanceOf",
    args: [tokenBoundAddress!],
    watch: true,
  });

  // @ts-ignore
  let ETH_BALANCE = eth?.balance?.low.toString() / 1e18;
  // @ts-ignore
  let DAI_BALANCE = dai?.balance?.low.toString() / 1e18;
  // @ts-ignore
  let USDC_BALANCE = usdc?.balance?.low.toString() / 1e6;
  //@ts-ignore
  let USDT_BALANCE = usdt?.balance?.low.toString() / 1e6;

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    position: "relative",
    left: "20px",
  };

  return (
    <div className="mt-4 flex flex-col  gap-6">
      <FungibleAsset
        balance={Number.isNaN(ETH_BALANCE) ? "0.000" : ETH_BALANCE.toFixed(4)}
        err={ethError}
        loading={ethLoading}
        src={ETH.src}
        unit="ETH"
      />

      <FungibleAsset
        balance={USDC_BALANCE.toFixed(4)}
        err={usdcError}
        loading={usdcLoading}
        src={USDC.src}
        unit="USDC"
      />

      <FungibleAsset
        balance={DAI_BALANCE?.toFixed(4)}
        err={daiError}
        loading={daiLoading}
        src={DAI.src}
        unit="DAI"
      />

      <FungibleAsset
        balance={USDT_BALANCE.toFixed(4)}
        err={usdtError}
        loading={usdtLoading}
        src={USDT.src}
        unit="USDT"
      />
    </div>
  );
}

export default Asset;
