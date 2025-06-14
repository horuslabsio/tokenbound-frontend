"use client";
import ControllerConnector from "@cartridge/connector/controller";
import { Connector } from "@starknet-react/core";
import { constants } from "starknet";
const isProduction = process.env.NEXT_PUBLIC_ENV === "production";
export const cartridgeInstance = new ControllerConnector({
  chains: [
    { rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia" },
    { rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet" },
  ],
  defaultChainId: isProduction
    ? constants.StarknetChainId.SN_MAIN
    : constants.StarknetChainId.SN_SEPOLIA,
}) as never as Connector;
