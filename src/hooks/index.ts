import { useState, useEffect } from "react";
import { instance } from "@utils/helper";
import { useAccount } from "@starknet-react/core";
import {  IAccountParam, NftItem, raw } from "types";
import { Contract, RpcProvider, num } from "starknet";

import TBAcontractAbi from "@abis/registry.abi.json"
import { TBAcontractAddress, TBAImplementationAccount } from "@utils/constants";
import { TokenboundClient } from "starknet-tokenbound-sdk"

const network = process.env.NEXT_PUBLIC_NETWORK

export const useFetchUserNFT = () => {
  const { address, account } = useAccount()
  const [nft, setNft] = useState<NftItem[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  let formatted_address = account?.address.replace('0x', '0x0')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) {
          console.error("Address is undefined. Unable to make the request.")
          setLoading(false)
          return
        }

        const url = `https://${network}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner?owner=${formatted_address}&withMetadata=true&pageSize=100`

        const response = await instance.get(url)
        const { data } = await response
        setNft(data?.ownedNfts)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user NFT:", error)
        setLoading(false)
      }
    };
    if (address) {
      fetchData()
    }
  }, [address]) // Execute the effect when address changes

  return {
    nft,
    loading
  }
}

export const useFetchNFTMetadata = (address: string, id: string) => {
  const [nft, setNft] = useState<raw>({ tokenUri: '', metadata: { image: '' }, error: null })
  const [loading, setLoading] = useState<boolean>(true)
  let formatted_address = address.replace('0x', '0x0')

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) {
          console.error("Address is undefined. Unable to make the request.")
          setLoading(false)
          return
        }
        const url = `https://${network}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTMetadata?contractAddress=${formatted_address}&tokenId=${id}&tokenType=ERC721`

        const response = await instance.get(url)
        const { data } = await response
        setNft(data?.raw)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user NFT:", error)
        setLoading(false)
      }
    };
    if (address) {
      fetchData()
    }
  }, [address]) // Execute the effect when address changes

  return {
    nft,
    loading
  }
}
// abstracted in the SDK
// export const useComputeAccountAddress = (contractAddress: string, tokenId: string): string => {
//   const [deployedAccount, setDeployedAccount] = useState<string>('')

//   useEffect(() => {
//     const accountAddress = async () => {
//       const provider = new RpcProvider({
//         nodeUrl: `https://${network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
//       })
//       const contract = new Contract(TBAcontractAbi, TBAcontractAddress, provider)

//       try {
//         const deployedAccount = await contract.get_account(
//           TBAImplementationAccount,
//           contractAddress,
//           tokenId,
//           3000000000
//         )
//         setDeployedAccount(num.toHex(deployedAccount))
//       }
//       catch (err) {
//         console.log(err)
//       }
//     }
//     accountAddress()
//   }, [])

//   return deployedAccount
// }
// //deprectaed in favour of SDK: checkAccountDeployment
// export const useAccountDeploymentStatus = (contractAddress: string, tokenId: string): string => {
//   const [contractHash, setContractHash] = useState<string>("")
//   const deployedAddress = useComputeAccountAddress(contractAddress, tokenId)

//   useEffect(() => {
//     const rpcProvider = new RpcProvider({ nodeUrl: `https://${network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}` })

//     const getContractHash = async () => {
//       try {
//         const contractHashResult = await rpcProvider.getClassHashAt(deployedAddress)
//         setContractHash(contractHashResult)
//       }
//       catch (err) {
//         return ''
//       }
//     }
//     getContractHash()
//   }, [deployedAddress])

//   return contractHash
// }


export const useTBAAsset = (tokenBoundAddress: string) => {
  const { address } = useAccount()
  const [tbanft, setTbaNft] = useState<NftItem[]>([])
  const [loadingTba, setTbaLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) {
          console.error("Address is undefined. Unable to make the request.")
          setTbaLoading(false)
          return
        }

        const url = `https://${network}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner?owner=${tokenBoundAddress}&withMetadata=true&pageSize=100`

        const response = await instance.get(url)
        const { data } = await response
        setTbaNft(data?.ownedNfts)
        setTbaLoading(false)
      } catch (error) {
        console.error("Error fetching user NFT:", error)
        setTbaLoading(false)
      }
    };
    if (address) {
      fetchData()
    }
  }, [address, tokenBoundAddress]) // Execute the effect when address changes

  return {
    tbanft,
    loadingTba
  }
}

export const tokenboundSDK = () => {
  const { account } = useAccount()
  const options = {
    account: account,
    registryAddress: TBAcontractAddress,
    implementationAddress: TBAImplementationAccount,
    jsonRPC: `https://starknet-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  }

  let tokenbound: any;

  if (account) {
    tokenbound = new TokenboundClient(options)
  }
  return { tokenbound }
}


export const useGetAccountStatus = ({contractAddress, tokenId}:IAccountParam) =>{
  const {tokenbound} = tokenboundSDK()
  const [status, setStatus] = useState<boolean>(false)

  useEffect(() => {
    const getAccountStatus = async () => {
      try {
        const accountStatus = await tokenbound.checkAccountDeployment({
          tokenContract: contractAddress,
          tokenId,
          salt: "3000000000"
        })
        setStatus(accountStatus?.deployed)
      } catch (error) {
        console.error(error)
      }
    }

    getAccountStatus();

    const intervalId = setInterval(() => {
      getAccountStatus();

      if (status) {
        clearInterval(intervalId);
      }
    }, 5000);

    return () => {
      clearInterval(intervalId);
    };
  }, [contractAddress, tokenId,status]);
  return {
    status
  }
}

export const useGetAccountAddress = ({ contractAddress, tokenId }: IAccountParam) => {
  const { tokenbound } = tokenboundSDK();
  const { account } = useAccount();
  const [deployedAddress, setDeployedAddress] = useState<string>('');

  useEffect(() => {
    const getAccountAddress = async () => {
      try {
        const accountResult = await tokenbound.getAccount({
          tokenContract: contractAddress,
          tokenId,
          salt: '3000000000'
        });
        setDeployedAddress(num.toHex(accountResult));
      } catch (error) {
        console.error(error);
      }
    };

    getAccountAddress();
  }, [account, contractAddress, tokenId]); 

  return {
    deployedAddress
  };
};