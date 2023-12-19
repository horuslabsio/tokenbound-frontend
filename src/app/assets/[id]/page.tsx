"use client";
import AppWrapper from "@components/AppWrapper";
import Image from "next/image";
import React, { useState } from "react";
import { FaGem, FaCoins, FaArrowAltCircleRight } from "react-icons/fa";
import { useFetchNFTMetadata, generate_pub_key, computeAccountAddress } from "@hooks/index";
import { useParams } from "next/navigation";
import SyncLoader from "react-spinners/SyncLoader";
import { CSSProperties } from "react";
import { copyToClipBoard, shortenAddress } from "@utils/helper";
import { toast } from "react-toastify";
import { useAccount } from "@starknet-react/core";
import { Contract } from "starknet"
import FungibleAsset from "@components/Assets/index"

import TBAcontractAbi from "@abis/registry.abi.json"
import { TBAcontractAddress, TBAImplementationAccount } from "@utils/constants";
function Assets() {
  const { account } = useAccount()
  const [isCollectible, setIsCollectible] = useState(false)
  const toggleContent = () => {
    setIsCollectible((prevIsCollectible) => !prevIsCollectible)
  };
  const url = process.env.NEXT_PUBLIC_EXPLORER

  // get contractAddress and tokenId from Id param
  let { id } = useParams()
  let contractAddress = id.slice(0, 65) as string
  let tokenId = id.slice(65) as string
  const { nft, loading } = useFetchNFTMetadata(contractAddress, tokenId)

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    textAlign: 'center'
  };

  const src = nft.metadata.image
  const deployedAddress = computeAccountAddress(contractAddress, tokenId)

  const copyToClipBoardHandler = async (text: string) => {
    const success = await copyToClipBoard(text)
    if (success) {
      toast.info(`Copied to clipboard:  ${text}`)
    } else {
      toast.error("Not Copied")
    }
  };

  const deployAccount = async () => {
    const contract = new Contract(TBAcontractAbi, TBAcontractAddress, account)
    try {
      await contract.create_account(
        TBAImplementationAccount,
        generate_pub_key(contractAddress),
        contractAddress,
        tokenId,
        3000000000
      )
      toast.info("Account was deployed successfully!")
    }
    catch (err) {
      console.log(err)
      toast.error("An error was encountered during the course of deployment!")
    }
  }

  return (
    <AppWrapper>
      {
        loading ? (
          <SyncLoader cssOverride={override} aria-label="Loading Spinner" size={50} color="#36d7b7" />
        ) :
          (
            <section>
              <div className="flex flex-col md:flex-row justify-between w-full p-4">
                <div className="w-full md:w-1/2 mb-4 md:mb-0 mr-4">
                  {" "}
                  <Image className="w-full h-auto md:h-full rounded-lg object-cover" loader={() => src} src={src} width={100} height={100} alt="Card Image" />
                </div>
                <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="inline-flex items-center p-[5px] bg-gray-200 cursor-pointer rounded-full hover:transform hover:scale-110" title="Tokenbound account address">
                        <span onClick={() => copyToClipBoardHandler(deployedAddress as string)} className="text-gray-400">{shortenAddress(deployedAddress as string)}</span>
                        <span className="ml-3">
                          <a href={`${url}/contract/${deployedAddress}`} target="__blank"><FaArrowAltCircleRight size={25} /></a>
                        </span>
                      </p>
                    </div>
                    <div>
                      <button className="bg-black text-white font-normal outline-none px-2 py-1 rounded-lg" onClick={deployAccount}>Deploy Account</button>
                    </div>
                  </div>
                  <div>
                    <div className="mt-6">
                      <div
                        className={`inline-flex mr-2 rounded-lg ${isCollectible ? `bg-gray-200` : ``
                          } text-gray-300`}
                      >
                        <div className="mr-2">
                          <FaGem size={24} />
                        </div>
                        <button
                          onClick={toggleContent}
                          className="text-gray-400 cursor-pointer "
                        >
                          Collectible
                        </button>
                      </div>
                      <div
                        className={`inline-flex mr-2 rounded-lg ${isCollectible ? `` : `bg-gray-200`
                          } 
                        text-gray-300
                      `}
                      >
                        <div className="mr-2">
                          <FaCoins size={24} />
                        </div>
                        <button
                          onClick={toggleContent}
                          className="text-gray-400 cursor-pointer"
                        >
                          Assets
                        </button>
                      </div>
                    </div>
                    {isCollectible ? <p>No collectible</p> : <FungibleAsset/>}{" "}
                  </div>
                </div>
              </div>
            </section>
          )
      }
    </AppWrapper>
  );
}

export default Assets;
