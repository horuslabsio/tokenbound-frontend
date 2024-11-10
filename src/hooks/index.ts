import { useState, useEffect } from "react";
import { instance, launchConfetti } from "@utils/helper";
import { useAccount, useNetwork } from "@starknet-react/core";
import {
  raw,
  TokenInfo,
  TokensApiResponse,
  WalletTokensApiResponse,
} from "types";
import { num } from "starknet";
import axios from "axios";
import { TokenboundClient } from "starknet-tokenbound-sdk";
import { Chain } from "@starknet-react/chains";
import { AccountClassHashes } from "@utils/constants";
import { useTokenBoundSDK } from "./useTokenboundHookContext";

export const useTBAAsset = (tokenBoundAddress: string) => {
  const { address } = useAccount();
  const [tbanft, setTbaNft] = useState<TokenInfo[]>([]);
  const [loadingTba, setTbaLoading] = useState<boolean>(false);
  const { chain } = useNetwork();
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (tokenBoundAddress) {
          const url = `https://${
            chain.network === "mainnet"
              ? process.env.NEXT_PUBLIC_NETWORK_MAINNET
              : process.env.NEXT_PUBLIC_NETWORK_SEPOLIA
          }/v1/owners/${tokenBoundAddress}/tokens`;
          setTbaLoading(true);
          const response = await instance.get(url);
          const { data } = response;
          setTbaNft(data?.result);
          setTbaLoading(false);
        }
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

export const useDeployAccount = ({
  contractAddress,
  tokenId,
}: {
  contractAddress: string;
  tokenId: string;
}) => {
  const { tokenboundV3 } = useTokenBoundSDK();
  const [deploymentStatus, setDeploymentStatus] = useState<
    "idle" | "success" | "error" | "pending"
  >("idle");
  const deployAccount = async () => {
    setDeploymentStatus("pending");
    try {
      await tokenboundV3?.createAccount({
        tokenContract: contractAddress,
        tokenId: tokenId,
      });
      setDeploymentStatus("success");
      launchConfetti();
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error deploying TBA", err);
      }
      setDeploymentStatus("error");
      setTimeout(() => {
        setDeploymentStatus("idle");
      }, 2000);
    }
  };

  return { deploymentStatus, deployAccount };
};

export const useUpgradeAccount = ({
  contractAddress,
  tokenboundClient,
  chain,
}: {
  contractAddress: string;
  tokenboundClient: TokenboundClient | undefined;
  chain: Chain;
}) => {
  const [upgradeStatus, setUpgradeStatus] = useState<
    "idle" | "success" | "error" | "pending"
  >("idle");
  const upgradeAccount = async () => {
    let network = chain.network;
    let v3Implementation =
      AccountClassHashes.V3[network as keyof typeof AccountClassHashes.V3];
    setUpgradeStatus("pending");
    try {
      await tokenboundClient?.upgrade({
        tbaAddress: contractAddress,
        newClassHash: v3Implementation,
      });
      setUpgradeStatus("success");
    } catch (err) {
      if (process.env.NODE_ENV !== "production") {
        console.error("Error upgrading TBA", err);
      }
      setUpgradeStatus("error");
      setTimeout(() => {
        setUpgradeStatus("idle");
      }, 2000);
    }
  };

  return { upgradeAccount, upgradeStatus };
};

export const useRefreshMetadata = (
  contractAddress: string,
  tokenId: string
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
      console.error("Address is undefined. Unable to make the request.");
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
        }
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
          if (process.env.NODE_ENV !== "production") {
            console.error(error);
          }
        }
      };
      getAccountAddress();
    }
  }, [tokenboundClient, contractAddress, tokenId]);
};

export const getWalletNft = async ({
  walletAddress,
  page,
}: {
  walletAddress: string;
  page?: number;
}) => {
  const url = `${process.env.NEXT_PUBLIC_MARKETPLACE_API_URL}/portfolio/${walletAddress}${page ? `?page=${page}` : ""}`;
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
