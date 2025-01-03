import { useAccount, useNetwork } from "@starknet-react/core";
import { TokenboundClient, TBAVersion } from "starknet-tokenbound-sdk";
import { useState, ReactNode, createContext, useEffect } from "react";
import { TokenboundContextType } from "../types";

export const TokenboundContext = createContext<
  TokenboundContextType | undefined
>(undefined);

interface TokenboundProviderProps {
  children: ReactNode;
}

export const TokenboundProvider: React.FC<TokenboundProviderProps> = ({
  children,
}) => {
  const { account } = useAccount();
  const { chain } = useNetwork();
  const [loading, setLoading] = useState(true);
  const [activeVersion, setActiveVersion] = useState<{
    version: "V3" | "V2" | "undeployed";
    address: string;
  } | null>(null);
  const [version, setVersion] = useState<{
    V2: { address: string; status: boolean };
    V3: { address: string; status: boolean };
  }>({
    V2: { address: "", status: false },
    V3: { address: "", status: false },
  });

  const [tokenboundV3, setTokenboundV3] = useState<
    TokenboundClient | undefined
  >(undefined);
  const [tokenboundV2, setTokenboundV2] = useState<
    TokenboundClient | undefined
  >(undefined);

  useEffect(() => {
    if (account && chain) {
      const options = {
        account: account,
        chain_id: chain.network === "mainnet" ? "SN_MAIN" : "SN_SEPOLIA",
        version: TBAVersion.V3,
        jsonRPC: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      };
      const tb = new TokenboundClient(options);
      setTokenboundV3(tb);
    }
  }, [account, chain]);

  useEffect(() => {
    if (account && chain) {
      const options = {
        account: account,
        chain_id: chain.network === "mainnet" ? "SN_MAIN" : "SN_SEPOLIA",
        version: TBAVersion.V2,
        jsonRPC: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      };
      const tb = new TokenboundClient(options);
      setTokenboundV2(tb);
    }
  }, [account, chain]);

  useEffect(() => {
    if (version.V3.status) {
      setActiveVersion({ address: version.V3.address, version: "V3" });
      setLoading(false);
    } else if (version.V2.status) {
      setActiveVersion({ address: version.V2.address, version: "V2" });
      setLoading(false);
    } else if (!activeVersion && version.V3.address) {
      setActiveVersion({
        address: version.V3.address,
        version: "undeployed",
      });
      setLoading(false);
    }
  }, [version]);
  const value = {
    tokenboundV2,
    tokenboundV3,
    activeVersion,
    setVersion,
    loading,
    setActiveVersion,
  };

  return (
    <TokenboundContext.Provider value={value}>
      {children}
    </TokenboundContext.Provider>
  );
};
