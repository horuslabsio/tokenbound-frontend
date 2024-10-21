"use client";

import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { sepolia, mainnet } from "@starknet-react/chains";
import {
  argent,
  braavos,
  StarknetConfig,
  starkscan,
  useInjectedConnectors,
} from "@starknet-react/core";

import { jsonRpcProvider } from "@starknet-react/core";

function rpc(chain) {
  return {
    nodeUrl: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  };
}

const provider = jsonRpcProvider({ rpc });

export default function StarknetProvider({ children }) {
  const chains = [mainnet, sepolia];
  const { connectors: injected } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "always",
  });

  const connectors = [
    ...injected,
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
  ];

  return (
    <StarknetConfig
      chains={chains}
      provider={provider}
      connectors={connectors}
      explorer={starkscan}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
