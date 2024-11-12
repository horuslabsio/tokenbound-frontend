import { useState, useEffect } from "react";
import { useAccount, useNetwork } from "@starknet-react/core";
import {
  IAccountParam,
  TokensApiResponse,
  WalletTokensApiResponse,
} from "types";
import { num } from "starknet";
import {
  TBAcontractAddress,
  TBAcontractAddress_SEPOLIA,
  TBAImplementationAccount,
  TBAImplementationAccount_SEPOLIA,
} from "@utils/constants";
import axios from "axios";
import { Chain } from "@starknet-react/chains";

export const useTokenBoundSDK = () => {
  const { account } = useAccount();
  const { chain } = useNetwork();
  const [tokenbound, setTokenbound] = useState<any | null>(null);
  const options = {
    account: account,
    registryAddress:
      chain.network === "mainnet"
        ? TBAcontractAddress
        : TBAcontractAddress_SEPOLIA,
    implementationAddress:
      chain.network === "mainnet"
        ? TBAImplementationAccount
        : TBAImplementationAccount_SEPOLIA,
    chain_id: chain.network === "mainnet" ? "SN_MAIN" : "SN_SEPOLIA",
    version: "V2",
    jsonRPC: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  };

  useEffect(() => {
    if (account) {
      const initTokenbound = async () => {
        const { TokenboundClient } = await import("starknet-tokenbound-sdk");
        const clientInstance = new TokenboundClient(options);
        setTokenbound(clientInstance);
      };
      initTokenbound();
    }
  }, [account]);

  return { tokenbound };
};

export const useGetAccountAddress = ({
  contractAddress,
  tokenId,
}: IAccountParam) => {
  const { tokenbound } = useTokenBoundSDK();
  const { account } = useAccount();
  const { chain } = useNetwork();
  const [deployedAddress, setDeployedAddress] = useState<string>("");

  useEffect(() => {
    const getAccountAddress = async () => {
      try {
        const accountResult = await tokenbound.getAccount({
          tokenContract: contractAddress,
          tokenId,
        });
        setDeployedAddress(num.toHex(accountResult));
      } catch (error) {
        console.error(error);
      }
    };
    getAccountAddress();
  }, [account, contractAddress, tokenId, chain, tokenbound]);

  return {
    deployedAddress,
  };
};

export const useRefreshMetadata = (
  contractAddress: string,
  tokenId: string,
) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess("");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const refreshMetadata = async () => {
    if (!contractAddress) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_MARKETPLACE_API_URL}/metadata/refresh`,
        {
          contract_address: contractAddress,
          token_id: tokenId,
        },
        {
          headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
          },
        },
      );
      setSuccess(response.data.message);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error refreshing metadata:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  return { loading, success, refreshMetadata };
};

export const getWalletNft = async ({
  walletAddress,
  page,
}: {
  walletAddress: string;
  page?: number;
}) => {
  const url = `${
    process.env.NEXT_PUBLIC_MARKETPLACE_API_URL
  }/portfolio/${walletAddress}${page ? `?page=${page}` : ""}`;
  const response = await fetch(url);
  const data = (await response.json()) as WalletTokensApiResponse;
  if (!response.ok) {
    console.error(url, response.status);
    return {
      data: [],
      next_page: null,
      collection_count: 0,
      token_count: 0,
    };
  }
  return data;
};

export const getNftToken = async ({
  contractAddress,
  tokenId,
  chain,
}: {
  contractAddress: string;
  tokenId: string;
  chain: Chain;
}) => {
  const chainId =
    chain.network === "mainnet" ? "0x534e5f4d41494e" : "0x534e5f5345504f4c4941";
  const url = `${process.env.NEXT_PUBLIC_MARKETPLACE_API_URL}/tokens/${contractAddress}/${chainId}/${tokenId}`;
  const response = await fetch(url);
  const data = (await response.json()) as TokensApiResponse;

  if (!response.ok) {
    console.error(url, response.status);
    return {
      data: [],
      next_page: null,
      collection_count: 0,
      token_count: 0,
    };
  }
  return data;
};
