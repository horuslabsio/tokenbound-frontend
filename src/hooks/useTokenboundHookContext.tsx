import { useAccount, useNetwork } from "@starknet-react/core";
import React, {
  useState,
  useMemo,
  ReactNode,
  createContext,
  useContext,
  useEffect,
} from "react";
import { num } from "starknet";
import {
  TBAChainID,
  TBAVersion,
  TokenboundClient,
} from "starknet-tokenbound-sdk";

interface TokenboundType {
  tokenboundV3: TokenboundClient | undefined;
  tokenboundV2: TokenboundClient | undefined;
}

const TokenboundContext = createContext<TokenboundType | undefined>(undefined);

interface TokenboundProviderProps {
  children: ReactNode;
}

const TokenboundProvider: React.FC<TokenboundProviderProps> = ({
  children,
}) => {
  const { account } = useAccount();
  const { chain } = useNetwork();

  const [activeVersion, setVersion] = useState<string>(TBAVersion.V3);
  const [tokenboundV3, setTokenboundV3] = useState<
    TokenboundClient | undefined
  >(undefined);
  const [tokenboundV2, setTokenboundV2] = useState<
    TokenboundClient | undefined
  >(undefined);

  const handleVersionSwitch = (version: string) => {
    setVersion(version);
  };

  // useEffect(() => {
  //   if (account && chain) {
  //     const options = {
  //       account: account,
  //       chain_id:
  //         chain.network === "mainnet" ? TBAChainID.main : TBAChainID.sepolia,
  //       version: activeVersion,
  //       jsonRPC: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  //     };

  //     const tb = new TokenboundClient(options);
  //     setTokenbound(tb);
  //   }
  // }, [account, chain, activeVersion]);

  // // // MY CODE // // //

  useEffect(() => {
    if (account && chain) {
      const options = {
        account: account,
        chain_id: chain.network === "mainnet" ? "SN_MAIN" : "SN_SEPOLIA",
        version: "V3",
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
        version: "V2",
        jsonRPC: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      };
      const tb = new TokenboundClient(options);
      setTokenboundV2(tb);
    }
  }, [account, chain]);

  const getTbaAddress = ({
    contractAddress,
    tokenId,
    tokenboundClient,
    SetVersionAddress,
  }: {
    contractAddress: string;
    tokenId: string;
    tokenboundClient: TokenboundClient;
    SetVersionAddress: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    useEffect(() => {
      if (tokenboundClient) {
        const getAccountAddress = async () => {
          try {
            const accountResult = await tokenboundClient.getAccount({
              tokenContract: contractAddress,
              tokenId,
            });
            SetVersionAddress(num.toHex(accountResult));
          } catch (error) {
            console.error(error);
          }
        };
        getAccountAddress();
      }
    }, [tokenboundClient, contractAddress, tokenId]);
  };

  const value = { tokenboundV2, tokenboundV3 };
  // const value = useMemo(
  //   () => ({ tokenbound, handleVersionSwitch, activeVersion }),
  //   [tokenbound, activeVersion],
  // );

  return (
    <TokenboundContext.Provider value={value}>
      {children}
    </TokenboundContext.Provider>
  );
};

// export const useTokenBoundSDK = () => {
//   const context = useContext(TokenboundContext);
//   if (!context) {
//     throw new Error(
//       "useTokenBoundSDK must be used within a TokenboundProvider",
//     );
//   }
//   return context;
// };

export { TokenboundProvider };
