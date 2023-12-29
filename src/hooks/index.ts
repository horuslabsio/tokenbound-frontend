import { useState, useEffect } from "react";
import { instance } from "@utils/helper";
import { useAccount } from "@starknet-react/core";
import { NftItem, raw } from "types";
import { Contract, RpcProvider, num } from "starknet";

import TBAcontractAbi from "@abis/registry.abi.json"
import { TBAcontractAddress,TBAImplementationAccount,daAsset } from "@utils/constants";

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

        console.log(network)

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
  const [nft, setNft] = useState<raw>({tokenUri: '', metadata: {image: ''}, error: null})
  const [loading, setLoading] = useState<boolean>(true)
  let formatted_address = address.replace('0x', '0x0')

  useEffect(() => {
    const fetchData = async() => {
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

export const computeAccountAddress = (contractAddress: string, tokenId: string): string => {
  const [ deployedAccount, setDeployedAccount ] = useState<string>('')

  useEffect(() => {
    const accountAddress = async() => {
      const provider = new RpcProvider({
        nodeUrl: `https://${network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
      })
      const contract = new Contract(TBAcontractAbi, TBAcontractAddress, provider)
  
      try{
        const deployedAccount = await contract.get_account(
          TBAImplementationAccount,
          contractAddress,
          tokenId,
          3000000000
        )
        setDeployedAccount(num.toHex(deployedAccount))
      }
      catch(err) {
        console.log(err)
      }
    }
    accountAddress()
  }, [])

  return deployedAccount
}

export const accountDeploymentStatus = (contractAddress: string, tokenId: string): string => {
  const [contractHash, setContractHash] = useState<string>("")
  const deployedAddress = computeAccountAddress(contractAddress, tokenId)

  useEffect(() => {
    const rpcProvider = new RpcProvider({ nodeUrl: `https://${network}.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}` })

    const getContractHash = async () => {
      try{
        const contractHashResult = await rpcProvider.getClassHashAt(deployedAddress)
        setContractHash(contractHashResult)
      }
      catch (err) {
        return ''
      }
    }
    getContractHash()
  }, [deployedAddress])
  
  return contractHash
}


export const useTBAAsset = (tokenBoundAddress:string) => {
  const { address, account } = useAccount()
  const [tbanft, setTbaNft] = useState<NftItem[]>([])
  const [loadingTba, setTbaLoading] = useState<boolean>(true)
 // let formatted_address = account?.address.replace('0x', '0x0') 

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) {
          console.error("Address is undefined. Unable to make the request.")
          setTbaLoading(false)
          return
        }

        const url = `https://${network}.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner?owner=${daAsset}&withMetadata=true&pageSize=100`

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
  }, [address]) // Execute the effect when address changes

  return {
    tbanft,
    loadingTba
  }
}