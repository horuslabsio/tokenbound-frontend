import { useState, useEffect, useCallback } from "react";
import { launchConfetti } from "@utils/helper";
import { TokensApiResponse, WalletTokensApiResponse } from "types";
import { RpcProvider, num } from "starknet";
import axios from "axios";
import { TBAVersion, TokenboundClient } from "starknet-tokenbound-sdk";
import { Chain } from "@starknet-react/chains";
import { AccountClassHashes } from "@utils/constants";
import { useTokenBoundSDK } from "./useTokenboundHookContext";
import { useNetwork } from "@starknet-react/core";

export const useDeployAccount = ({
  contractAddress,
  tokenId,
  v3Address,
  setActiveVersion,
}: {
  contractAddress: string;
  tokenId: string;
  v3Address: string;
  setActiveVersion: (
    value: React.SetStateAction<{
      version: "V3" | "V2" | "undeployed";
      address: string;
    } | null>
  ) => void;
}) => {
  const { tokenboundV3 } = useTokenBoundSDK();
  const [deploymentStatus, setDeploymentStatus] = useState<
    "idle" | "success" | "error" | "pending"
  >("idle");
  const deployAccount = async () => {
    setDeploymentStatus("pending");
    try {
      if (tokenboundV3) {
        await tokenboundV3?.createAccount({
          tokenContract: contractAddress,
          tokenId: tokenId,
        });
        setDeploymentStatus("success");
        launchConfetti();
        setActiveVersion({
          address: v3Address,
          version: "V3",
        });
      }
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
  setActiveVersion,
  v3Address,
}: {
  contractAddress: string;
  tokenboundClient: TokenboundClient | undefined;
  chain: Chain;
  v3Address: string;
  setActiveVersion: (
    value: React.SetStateAction<{
      version: "V3" | "V2" | "undeployed";
      address: string;
    } | null>
  ) => void;
}) => {
  const [upgradeStatus, setUpgradeStatus] = useState<
    "idle" | "success" | "error" | "pending"
  >("idle");
  const upgradeAccount = async () => {
    let network = chain.network;
    let v3Implementation =
      AccountClassHashes.V3[network as keyof typeof AccountClassHashes.V3];
    console.log("v3 impl:", v3Implementation);
    console.log("tbc:", tokenboundClient);

    setUpgradeStatus("pending");
    try {
      const res = await tokenboundClient?.upgrade({
        tbaAddress: contractAddress,
        newClassHash: v3Implementation,
      });
      console.log(res);

      setUpgradeStatus("success");
      setActiveVersion({
        address: v3Address,
        version: "V3",
      });
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
            console.error("Error from useGetTokenbound:", error);
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

export const useSetTbaVersion = ({
  setVersion,
  v2Address,
  v3Address,
}: {
  setVersion: React.Dispatch<
    React.SetStateAction<{
      V2: {
        address: string;
        status: boolean;
      };
      V3: {
        address: string;
        status: boolean;
      };
    }>
  >;
  v2Address: `0x${string}`;
  v3Address: `0x${string}`;
}) => {
  const { chain } = useNetwork();

  const network = chain.network;
  const v2Implementation =
    AccountClassHashes.V2[network as keyof typeof AccountClassHashes.V2];
  const v3Implementation =
    AccountClassHashes.V3[network as keyof typeof AccountClassHashes.V3];
  const provider = new RpcProvider({
    nodeUrl: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  });

  const fetchClassHash = useCallback(async () => {
    const setVersionState = (
      versionKey: "V3" | "V2",
      address: string,
      status: boolean
    ) => {
      setVersion((prev) => ({
        ...prev,
        [versionKey]: { address, status },
      }));
    };

    const handleClassHashCheck = async (
      address: string,
      expectedHash: string,
      versionKey: "V3" | "V2"
    ) => {
      if (!address) return false;

      try {
        const classHash = await provider.getClassHashAt(address);
        if (classHash === expectedHash) {
          setVersionState(versionKey, address, true);
          return true;
        }
      } catch (error) {
        if (process.env.NODE_ENV !== "production") {
          console.error(`Error fetching class hash for ${versionKey}:`, error);
        }
      }
      return false;
    };

    const checkV2Address = async () =>
      handleClassHashCheck(v2Address, v2Implementation, TBAVersion.V2) ||
      handleClassHashCheck(v2Address, v3Implementation, TBAVersion.V3);

    const checkV3Address = async () =>
      handleClassHashCheck(v3Address, v3Implementation, TBAVersion.V3);

    // Main logic
    if (v2Address || v3Address) {
      const v2Result = await checkV2Address();

      if (!v2Result) {
        const v3Result = await checkV3Address();

        if (!v3Result) {
          setVersionState(TBAVersion.V3, v3Address, false);
        }
      }
    }
  }, [v2Address, v3Address]);

  useEffect(() => {
    fetchClassHash();
  }, [fetchClassHash]);
};
