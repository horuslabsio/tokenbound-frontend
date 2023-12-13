// import { useState, useEffect } from "react";
// import { instance } from "../../utils/helper";
// import { useAccount } from "@starknet-react/core";
// import { NftItem } from "../../types";


// export const useFetchUserNFT = () => {
//   const { address, account} = useAccount();
//   const [nft, setNft] = useState<NftItem[]>([]);

//   let formatted_address =  account?.address.replace('0x', '0x0');

  
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (!address) {
//             console.error("Address is undefined. Unable to make the request.");
//             return;
//           }
//         if (address) {
//           const url = `https://starknet-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner?owner=${formatted_address}&withMetadata=true&pageSize=100`

//           const response = await instance.get(url);
//           const {data} = await response;
//           setNft(data?.ownedNfts);
//         }
//       } catch (error) {
//         console.error("Error fetching user NFT:", error);
//       }
//     };

//     fetchData();
//   }, [address]);

//   return {
//     nft,
//   };
// };
import { useState, useEffect } from "react";
import { instance } from "../../utils/helper";
import { useAccount } from "@starknet-react/core";
import { NftItem } from "../../types";

export const useFetchUserNFT = () => {
  const { address, account } = useAccount();
  const [nft, setNft] = useState<NftItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true)
  let formatted_address = account?.address.replace('0x', '0x0');

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!address) {
          console.error("Address is undefined. Unable to make the request.");
          setLoading(false)
          return;
        }

        const url = `https://starknet-mainnet.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}/getNFTsForOwner?owner=${formatted_address}&withMetadata=true&pageSize=100`;

        const response = await instance.get(url);
        const { data } = await response;
        setNft(data?.ownedNfts);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user NFT:", error);
        setLoading(false)
      }
    };
    if (address) {
      fetchData();
    }
  }, [address]); // Execute the effect when address changes

  return {
    nft,
    loading
  };
};

