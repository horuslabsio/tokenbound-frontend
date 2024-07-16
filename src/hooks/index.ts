import { useState, useEffect } from "react";
import { instance } from "@utils/helper";
import { useAccount, useNetwork } from "@starknet-react/core";
import { IAccountParam, raw, TokenInfo } from "types";
import { num } from "starknet";
import { TBAcontractAddress, TBAcontractAddress_SEPOLIA, TBAImplementationAccount, TBAImplementationAccount_SEPOLIA } from "@utils/constants";
import { TokenboundClient } from "starknet-tokenbound-sdk";
import axios from "axios";


export const useFetchUserNFT = () => {
  const { address, account } = useAccount();
  const [nft, setNft] = useState<TokenInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  let formatted_address = account?.address.replace("0x", "0x0");
 const {chain} = useNetwork()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) {
          console.error("Address is undefined. Unable to make the request.");
          setLoading(false);
          return;
        }
        const url = `https://${chain.network === 'mainnet'? process.env.NEXT_PUBLIC_NETWORK_MAINNET :process.env.NEXT_PUBLIC_NETWORK_SEPOLIA}/v1/owners/${formatted_address}/tokens`;
        const response = await instance.get(url);
        const { data } = await response;
        console.log('nft-data:',data?.result)
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
  }, [address,chain]); // Execute the effect when address changes

  return {
    nft,
    loading,
  };
};

export const useFetchNFTMetadata = (address: string, id: string) => {
  const [nft, setNft] = useState<raw>({ name: "", description: "", image: "" });
  const [loading, setLoading] = useState<boolean>(true);
  const {chain} = useNetwork()

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) {
          console.error("Address is undefined. Unable to make the request.");
          setLoading(false);
          return;
        }
        const url = `https://${chain.network === 'mainnet'? process.env.NEXT_PUBLIC_NETWORK_MAINNET :process.env.NEXT_PUBLIC_NETWORK_SEPOLIA}/v1/tokens/${address}/${id}`;

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
  }, [address,chain]);

  return {
    nft,
    loading,
  };
};

export const useTBAAsset = (tokenBoundAddress: string) => {
  const { address } = useAccount();
  const [tbanft, setTbaNft] = useState<TokenInfo[]>([]);
  const [loadingTba, setTbaLoading] = useState<boolean>(true);
const {chain} = useNetwork()
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!tokenBoundAddress) {
          console.error("Address is undefined. Unable to make the request.");
          setTbaLoading(false);
          return;
        }

        const url = `https://${chain.network === 'mainnet'? process.env.NEXT_PUBLIC_NETWORK_MAINNET :process.env.NEXT_PUBLIC_NETWORK_SEPOLIA}/v1/owners/${tokenBoundAddress}/tokens`;
        const response = await instance.get(url);
        const { data } = await response;
        console.log('data:',data.result)
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
  }, [address, tokenBoundAddress,chain]); // Execute the effect when address changes

  return {
    tbanft,
    loadingTba,
  };
};

export const useTokenBoundSDK = () => {
  const { account } = useAccount();
  const {chain} = useNetwork()
  const options = {
    account: account,
    registryAddress:  chain.network === 'mainnet'? TBAcontractAddress : TBAcontractAddress_SEPOLIA,
    implementationAddress: chain.network === 'mainnet'? TBAImplementationAccount : TBAImplementationAccount_SEPOLIA,
    jsonRPC: `https://starknet-${chain.network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  };

  let tokenbound: any;

  if (account) {
    tokenbound = new TokenboundClient(options);
  }
  return { tokenbound };
};

export const useGetAccountAddress = ({
  contractAddress,
  tokenId,
}: IAccountParam) => {
  const { tokenbound } = useTokenBoundSDK();
  const { account } = useAccount();
  const {chain} = useNetwork()
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
  }, [account, contractAddress, tokenId,chain]);

  return {
    deployedAddress,
  };
};

type RefreshType = {
  status:number,
  data:{result:string}
}

const useRefreshMetadata = (contractAddress:string, tokenId:string) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<RefreshType>({status:0, data:{result:""}});
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
      const result: string = await axios.post(url, {}, {
          headers: {
            accept: "application/json",
            "x-api-key": process.env.NEXT_PUBLIC_ARK_API_KEY,
          },
          withCredentials: false,

      });
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