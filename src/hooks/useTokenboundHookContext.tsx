import { useAccount, useNetwork } from "@starknet-react/core";
import React, { useState, useMemo, ReactNode, createContext, useContext, useEffect } from "react";
import { TBAChainID, TBAVersion, TokenboundClient } from "starknet-tokenbound-sdk";

interface TokenboundType {
  tokenbound: TokenboundClient | undefined;
  handleVersionSwitch: (version: string) => void;
  activeVersion: string;
}

const TokenboundContext = createContext<TokenboundType | undefined>(undefined);

interface TokenboundProviderProps {
  children: ReactNode; 
}

const TokenboundProvider: React.FC<TokenboundProviderProps> = ({ children }) => {
  const { account } = useAccount();
  const { chain } = useNetwork();

  const [activeVersion, setVersion] = useState<string>(TBAVersion.V3)
  const [tokenbound, setTokenbound] = useState<TokenboundClient | undefined>(undefined); 


  const handleVersionSwitch = (version: string) => {
    setVersion(version);
  };

  useEffect(() => {
    if (account && chain) {
      const options = {
        account: account,
        chain_id: chain.network === 'mainnet' ? TBAChainID.main : TBAChainID.sepolia,
        version: activeVersion,
        jsonRPC: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      };

      const tb = new TokenboundClient(options);
      setTokenbound(tb);
    }
  }, [account, chain, activeVersion]);


  const value = useMemo(() => ({ tokenbound, handleVersionSwitch, activeVersion }), [tokenbound, activeVersion]);

  return (
    <TokenboundContext.Provider value={value}>
      {children}
    </TokenboundContext.Provider>
  );
};

export const useTokenBoundSDK2 = () => {
  const context = useContext(TokenboundContext);
  if (!context) {
    throw new Error("useTokenBoundSDK must be used within a TokenboundProvider");
  }
  return context;
};

export { TokenboundProvider };
