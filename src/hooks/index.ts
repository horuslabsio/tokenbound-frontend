import { useState, useEffect } from "react";
import { instance } from "@utils/helper";
import { useAccount, useNetwork } from "@starknet-react/core";
import { IAccountParam, raw, TokenInfo } from "types";
import { AccountInterface, num } from "starknet";
import axios from "axios";
import { TokenboundClient } from "starknet-tokenbound-sdk";
import { Chain } from "@starknet-react/chains";
// import { useTokenBoundSDK } from "./useTokenboundHookContext";

export const useFetchUserNFT = () => {
  const { address } = useAccount();
  const [nft, setNft] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { chain } = useNetwork();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) {
          console.error("Address is undefined. Unable to make the request.");
          setLoading(false);
          return;
        }
        const url = `https://${
          chain.network === "mainnet"
            ? process.env.NEXT_PUBLIC_NETWORK_MAINNET
            : process.env.NEXT_PUBLIC_NETWORK_SEPOLIA
        }/v1/owners/${address}/tokens`;
        const response = await instance.get(url);
        const { data } = response;
        setNft(data?.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user NFT:", error);
        setLoading(false);
      }
    };
    if (address) {
      fetchData();
    }
  }, [address, chain]);

  return {
    nft,
    loading,
  };
};

export const useFetchNFTMetadata = (address: string, id: string) => {
  const [nft, setNft] = useState<raw>({ name: "", description: "", image: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const { chain } = useNetwork();

  // const { tokenbound } = useTokenBoundSDK();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) {
          console.error("Address is undefined. Unable to make the request.");
          setLoading(false);
          return;
        }
        const url = `https://${
          chain.network === "mainnet"
            ? process.env.NEXT_PUBLIC_NETWORK_MAINNET
            : process.env.NEXT_PUBLIC_NETWORK_SEPOLIA
        }/v1/tokens/${address}/${id}`;

        const response = await instance.get(url);
        const { data } = await response;

        setNft(data?.result?.metadata?.normalized);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user NFT:", error);
        setLoading(false);
      }
    };
    if (address) {
      fetchData();
    }
  }, [address, chain]);

  return {
    nft,
    loading,
  };
};

export const useTBAAsset = (tokenBoundAddress: string) => {
  const { address } = useAccount();
  const [tbanft, setTbaNft] = useState<TokenInfo[]>([]);
  const [loadingTba, setTbaLoading] = useState<boolean>(true);
  const { chain } = useNetwork();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tokenBoundAddress) {
          console.error("Address is undefined. Unable to make the request.");
          setTbaLoading(false);
          return;
        }

        const url = `https://${
          chain.network === "mainnet"
            ? process.env.NEXT_PUBLIC_NETWORK_MAINNET
            : process.env.NEXT_PUBLIC_NETWORK_SEPOLIA
        }/v1/owners/${tokenBoundAddress}/tokens`;
        const response = await instance.get(url);
        const { data } = response;
        setTbaNft(data?.result);
        setTbaLoading(false);
      } catch (error) {
        console.error("Error fetching user NFT:", error);
        setTbaLoading(false);
      }
    };
    if (address) {
      fetchData();
    }
  }, [address, tokenBoundAddress, chain]);
  return {
    tbanft,
    loadingTba,
  };
};

// export const useGetAccountAddress = ({
//   contractAddress,
//   tokenId,
// }: IAccountParam) => {
//   const { tokenbound } = useTokenBoundSDK();

//   const { account } = useAccount();
//   const { chain } = useNetwork();
//   const [deployedAddress, setDeployedAddress] = useState<string>("");

//   useEffect(() => {
//     if (tokenbound) {
//       const getAccountAddress = async () => {
//         try {
//           const accountResult = await tokenbound.getAccount({
//             tokenContract: contractAddress,
//             tokenId,
//           });
//           setDeployedAddress(num.toHex(accountResult));
//         } catch (error) {
//           console.error(error);
//         }
//       };
//       getAccountAddress();
//     }
//   }, [tokenbound, account, contractAddress, tokenId, chain]);

//   return {
//     deployedAddress,
//   };
// };

type RefreshType = {
  status: number;
  data: { result: string };
};

const useRefreshMetadata = (contractAddress: string, tokenId: string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<RefreshType>({
    status: 0,
    data: { result: "" },
  });
  const { chain } = useNetwork();

  const refreshMetadata = async () => {
    if (!contractAddress) {
      console.error("Address is undefined. Unable to make the request.");
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const url = `https://${
        chain.network === "mainnet"
          ? process.env.NEXT_PUBLIC_NETWORK_MAINNET
          : process.env.NEXT_PUBLIC_NETWORK_SEPOLIA
      }/v1/tokens/${contractAddress}/${tokenId}/metadata/refresh`;
      const result: string = await axios.post(
        url,
        {},
        {
          headers: {
            accept: "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_ARK_API_KEY,
          },
          withCredentials: false,
        },
      );
      // @ts-ignore
      setSuccess(result);
    } catch (error) {
      console.error("Error fetching user NFT:", error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, refreshMetadata };
};

export default useRefreshMetadata;

// CODE //

export const useGetTbaAddress = ({
  contractAddress,
  tokenId,
  tokenboundClient,
  SetVersionAddress,
}: {
  contractAddress: string;
  tokenId: string;
  tokenboundClient: TokenboundClient | undefined;
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

export const useInitializeTokenboundV3 = () => {
  const [tokenboundV3, setTokenboundV3] = useState<
    TokenboundClient | undefined
  >(undefined);
  const { chain } = useNetwork();
  const { account } = useAccount();

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
  return tokenboundV3;
};

export const useInitializeTokenboundV2 = () => {
  const [tokenboundV2, setTokenboundV2] = useState<
    TokenboundClient | undefined
  >(undefined);
  const { chain } = useNetwork();
  const { account } = useAccount();

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
  return tokenboundV2;
};
