import { useState, useEffect } from "react";
import { instance } from "@utils/helper";
import { useAccount, useNetwork } from "@starknet-react/core";
import { IAccountParam, raw, TokenInfo } from "types";
import { AccountInterface, num } from "starknet";
import axios from "axios";
import { TokenboundClient } from "starknet-tokenbound-sdk";
import { Chain } from "@starknet-react/chains";
import { AccountClassHashes } from "@utils/constants";
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

export const useDeployAccount = ({
  contractAddress,
  tokenId,
  tokenboundClient,
}: {
  contractAddress: string;
  tokenId: string;
  tokenboundClient: TokenboundClient | undefined;
}) => {
  const [deploymentStatus, setDeploymentStatus] = useState<
    "idle" | "success" | "failed" | "ongoing"
  >("idle");
  const deployAccount = async () => {
    setDeploymentStatus("ongoing");
    try {
      await tokenboundClient?.createAccount({
        tokenContract: contractAddress,
        tokenId: tokenId,
      });
      setDeploymentStatus("success");
    } catch (err) {
      console.log(err);
      setDeploymentStatus("failed");
    } finally {
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
    "idle" | "success" | "failed" | "ongoing"
  >("idle");
  const upgradeAccount = async () => {
    let network = chain.network;
    let v3Implementation =
      AccountClassHashes.V3[network as keyof typeof AccountClassHashes.V3];
    setUpgradeStatus("ongoing");
    try {
      const res = await tokenboundClient?.upgrade({
        tbaAddress: contractAddress,
        newClassHash: v3Implementation,
      });
      if (res.ok) {
        console.log("response", res);
        setUpgradeStatus("success");
      }
    } catch (err) {
      console.log(err);
      setUpgradeStatus("failed");
    } finally {
      setTimeout(() => {
        setUpgradeStatus("idle");
      }, 2000);
    }
  };

  return { upgradeAccount, upgradeStatus };
};

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
  const [showSuccess, setShowSuccess] = useState(false);

  const { chain } = useNetwork();

  useEffect(() => {
    if (success?.status === 200) {
      setShowSuccess(true);

      const timer = setTimeout(() => {
        setShowSuccess(false);
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

  return { loading, success, refreshMetadata, showSuccess };
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
