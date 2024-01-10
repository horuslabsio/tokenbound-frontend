"use client";

import { InjectedConnector } from "starknetkit/injected";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { StarknetConfig, alchemyProvider } from "@starknet-react/core";
import {mainnet } from "@starknet-react/chains"

export default function StarknetProvider({ children }) {
  const chains = [mainnet]
  const provider = alchemyProvider({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  });

  const connectors = [
    new InjectedConnector({ options: { id: "argentX", name: "Argent" } }),
    new InjectedConnector({ options: { id: "braavos", name: "Braavos" } }),
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
  ];

  return (
    <StarknetConfig
      chains={chains}
      provider={provider}
      connectors={connectors}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
