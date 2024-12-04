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

  const [addresses, setAddresses] = useState<{
    implHash: string;
    registry: string;
  } | null>(null);

  const [version, setVersion] = useState<{
    v2: { address: string; status: boolean };
    v3: { address: string; status: boolean };
  }>({
    v2: { address: "", status: false },
    v3: { address: "", status: false },
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
    if (version.v3.status) {
      setActiveVersion({ address: version.v3.address, version: "V3" });
      setLoading(false);
    } else if (version.v2.status) {
      setActiveVersion({ address: version.v2.address, version: "V2" });
      setLoading(false);
    } else if (!activeVersion && version.v3.address) {
      setActiveVersion({
        address: version.v3.address,
        version: "undeployed",
      });
      setLoading(false);
    } else if (!version.v3.status && !version.v2.status) {
      setActiveVersion({
        address: version.v3.address,
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
    setAddresses,
  };

  return (
    <TokenboundContext.Provider value={value}>
      {children}
    </TokenboundContext.Provider>
  );
};
