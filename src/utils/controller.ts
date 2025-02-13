"use client";
import ControllerConnector from "@cartridge/connector/controller";
import { Connector } from "@starknet-react/core";
import { constants } from "starknet";

export const cartridgeInstance = new ControllerConnector({
  chains: [
    { rpcUrl: "https://api.cartridge.gg/x/starknet/sepolia" },
    { rpcUrl: "https://api.cartridge.gg/x/starknet/mainnet" },
  ],
  defaultChainId: constants.StarknetChainId.SN_MAIN,
}) as never as Connector;
