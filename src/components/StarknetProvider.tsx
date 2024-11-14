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
import ControllerConnector from "@cartridge/connector";
import { jsonRpcProvider } from "@starknet-react/core";
import { ReactNode, useCallback } from "react";

const StarknetProvider = ({ children }: { children: ReactNode }) => {
  console.log(ControllerConnector);
  const chains = [mainnet, sepolia];
  const { connectors: injected } = useInjectedConnectors({
    recommended: [argent(), braavos()],
    includeRecommended: "always",
  });

  const rpc = useCallback((chain: Chain) => {
    return {
      nodeUrl: `https://api.cartridge.gg/x/starknet/${chain.network}`,
      //   nodeUrl: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
    };
  }, []);

  const controllerRpc = useCallback((chain: Chain) => {
    return { nodeUrl: `https://api.cartridge.gg/x/starknet/${chain.network}` };
  }, []);

  const provider = jsonRpcProvider({ rpc });

  const connectors = [
    ...injected,
    new WebWalletConnector({ url: "https://web.argent.xyz" }),
    new ArgentMobileConnector(),
    new ControllerConnector() as never as Connector,
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
