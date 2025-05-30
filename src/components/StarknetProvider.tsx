"use client";
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
import { ReactNode, useCallback, useEffect, useState } from "react";

const StarknetProvider = ({ children }: { children: ReactNode }) => {
  const chains = [mainnet, sepolia];

  const [mounted, setMounted] = useState(false);
  const [extraConnectors, setExtraConnectors] = useState<Connector[]>([]);

  useEffect(() => {
    setMounted(true);
    async function loadConnectors() {
      const { WebWalletConnector } = await import("starknetkit/webwallet");
      const { cartridgeInstance } = await import("@utils/controller");

      setExtraConnectors([
        new WebWalletConnector({
          url: "https://web.argent.xyz",
        }) as unknown as Connector,
        cartridgeInstance,
      ]);
    }

    loadConnectors();
  }, []);

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

  // Only set connectors after mount and after dynamic import
  if (!mounted) return null;

  const connectors = [...injected, ...extraConnectors];

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
