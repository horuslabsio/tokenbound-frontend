"use client";

import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { alchemyProvider } from "@starknet-react/core";
import { mainnet } from "@starknet-react/chains"
import { argent, braavos, StarknetConfig, starkscan, useInjectedConnectors } from '@starknet-react/core'
export default function StarknetProvider({ children }) {
  const chains = [mainnet]
  const alchemyProviderConfig = alchemyProvider({
    apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
  });
  const { connectors: injected } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: 'always',
  })

  const connectors = [
    ...injected,
    new WebWalletConnector({ url: 'https://web.argent.xyz' }),
    new ArgentMobileConnector(),
  ]

  return (
    <StarknetConfig
      chains={chains}
      provider={alchemyProviderConfig}
      connectors={connectors}
      explorer={starkscan}
      autoConnect
    >
      {children}
    </StarknetConfig>
  );
}
