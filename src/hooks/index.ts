import { useState, useEffect } from "react";
import { instance } from "../../utils/helper";
import { useAccount } from "@starknet-react/core";
import { NftItem, raw } from "../../types";
import { ec, stark, Contract, RpcProvider, num } from "starknet";

import TBAcontractAbi from "../abis/registry.abi.json"
export const TBAcontractAddress = "0x057cf5b3ac51e9ab1735f0720425d3889ac500fc8deac6567ad8163fd210aa92"
export const TBAImplementationAccount = "0xe01784f9a93db5171ed32eaee0610326969980ecbcc4325753428d8227b96b"

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
        nodeUrl: `https://starknet-goerli.infura.io/v3/${process.env.NEXT_PUBLIC_INFURA_API_KEY}`
      })
      const contract = new Contract(TBAcontractAbi, TBAcontractAddress, provider)
  
      try{
        const deployedAccount = await contract.get_account(
          TBAImplementationAccount,
          generate_pub_key(contractAddress),
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

export const generate_pub_key = (privKey: string) => {
  // const privKey = stark.randomAddress()
  const starknetPublicKey = ec.starkCurve.getStarkKey(privKey)
  return starknetPublicKey
}