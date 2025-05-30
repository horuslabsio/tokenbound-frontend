"use client";
import { ArgentMobileConnector } from "starknetkit/argentMobile";
import { WebWalletConnector } from "starknetkit/webwallet";
import { sepolia, mainnet, Chain } from "@starknet-react/chains";
import {
  argent,
  braavos,
  Connector,
  StarknetConfig,
  starkscan,
  useInjectedConnectors,
} from "@starknet-react/core";
import { jsonRpcProvider } from "@starknet-react/core";
import { ReactNode, useCallback } from "react";
import { cartridgeInstance } from "@utils/controller";

const StarknetProvider = ({ children }: { children: ReactNode }) => {
  const chains = [mainnet, sepolia];
  const { connectors: injected } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "always",
  });

  const rpc = useCallback((chain: Chain) => {
    return {
      nodeUrl: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    };
  }, []);

  const provider = jsonRpcProvider({ rpc });

  const ArgentMobile = ArgentMobileConnector.init({
    options: {
      dappName: "Token bound explorer",
      url: "https://www.tbaexplorer.com/",
    },
    inAppBrowserOptions: {},
  });

  const connectors = [
    ...injected,
    new WebWalletConnector({
      url: "https://web.argent.xyz",
    }) as never as Connector,
    cartridgeInstance,
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
};

export default StarknetProvider;
