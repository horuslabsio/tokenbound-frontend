import { useState, useEffect } from "react";
import { instance } from "../../utils/helper";
import { useAccount } from "@starknet-react/core";


export const useFetchUserNFT = () => {
  const { address} = useAccount();
  const [nft, setNft] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) {
            console.error("Address is undefined. Unable to make the request.");
            return;
          }
        if (address) {
          const url =`https://starknetapi.nftscan.com/api/v2/account/own/all/${address}?erc_type=erc721&show_attribute=true&sort_field=mint_time&sort_direction=asc`
          const response = await instance.get(url);
          const {data} = await response;
          setNft(data?.data);
        }
      } catch (error) {
        console.error("Error fetching user NFT:", error);
      }
    };

    fetchData();
  }, [address]);

  return {
    nft,
  };
};

