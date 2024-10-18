"use client";
import { useState, useEffect } from "react";
import { FaGem, FaCoins } from "react-icons/fa";
import useRefreshMetadata, {
  useFetchNFTMetadata,
  useTokenBoundSDK,
  useGetAccountAddress,
} from "@hooks/index";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import FungibleAsset from "@components/Assets/index";
import NonFungibleAsset from "@components/Assets/Tbanft";
import { FaArrowAltCircleRight } from "react-icons/fa";
import CopyButton from "@components/utils/CopyButton";
import { useNetwork } from "@starknet-react/core";
import Tooltip from "@components/utils/tooltip";
import { RpcProvider } from "starknet";
import { AccountClassHashes } from "@utils/constants";
import Link from "next/link";
import { useTokenBoundSDK2 } from "@hooks/useTokenboundHookContext";
import { TBAVersion } from "starknet-tokenbound-sdk";

const url = process.env.NEXT_PUBLIC_EXPLORER;
const sepolia_url = process.env.NEXT_PUBLIC_TESTNET_EXPLORER;

function Assets() {
  const [isCollectible, setIsCollectible] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [tbaClassHash, setTbaClassHash] = useState<string>("")
  const [versions, setVersions] = useState<{ v2: boolean, v3: boolean }>({ v2: false, v3: false })

  const { chain } = useNetwork();


  const toggleContent = () => {
    setIsCollectible((prevIsCollectible) => !prevIsCollectible);
  };

  const provider = new RpcProvider({
    nodeUrl: `https://starknet-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
  });


  let { id } = useParams();
  let contractAddress = id.slice(0, 66) as string;
  let tokenId = id.slice(66) as string;
  const { nft } = useFetchNFTMetadata(contractAddress, tokenId);

  const { deployedAddress } = useGetAccountAddress({
    contractAddress,
    tokenId,
  });

  const { tokenbound, handleVersionSwitch } = useTokenBoundSDK2();

  const [status, setStatus] = useState<boolean | undefined>(undefined);


  const getAccountStatus = async () => {
    try {
      const accountStatus = await tokenbound?.checkAccountDeployment({
        tokenContract: contractAddress,
        tokenId,
      });
      setStatus(accountStatus?.deployed);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (status) {
      const fetchClassHash = async () => {

        const tbaClassHash = (await provider.getClassHashAt(deployedAddress));
          setVersions({v2: false, v3: false})
          setTbaClassHash(tbaClassHash)
      };

      fetchClassHash().catch(error => console.error("Error:", error));
    }
  }, [status, deployedAddress]);


  useEffect(() => {
    let network = chain.network;
    let v2Implementation = AccountClassHashes.V2[network as keyof typeof AccountClassHashes.V2];
    let v3Implementation = AccountClassHashes.V3[network as keyof typeof AccountClassHashes.V3];

    if (tbaClassHash.length > 0) {
      setVersions((prev) => ({
        v2: tbaClassHash === v2Implementation || prev.v2,
        v3: tbaClassHash === v3Implementation || prev.v3,
      }));
    }

  }, [tbaClassHash])


  const { refreshMetadata, loading, success } = useRefreshMetadata(
    contractAddress,
    tokenId
  );


  useEffect(() => {
    getAccountStatus();
  }, [tokenbound])

  useEffect(() => {
    let timer: any;
    if (success) {
      setIsVisible(true);
      timer = setTimeout(() => {
        setIsVisible(false);
      }, 2000);
    }

    return () => clearTimeout(timer);
  }, [success]);


  const deployAccount = async () => {
    try {
      await tokenbound?.createAccount({
        tokenContract: contractAddress,
        tokenId: tokenId,
      });
      toast.info("Account was deployed successfully!");
    } catch (err) {
      console.log(err);
      toast.error("An error was encountered during the course of deployment!");
    }
  };



  const upgradeAccount = async () => {
    let network = chain.network;
    let v3Implementation = AccountClassHashes.V3[network as keyof typeof AccountClassHashes.V3];

    try {
      await tokenbound?.upgrade({
        tbaAddress: contractAddress,
        newClassHash: v3Implementation
      });

      handleVersionSwitch(TBAVersion.V3)
      toast.info("Account was upgraded successfully!");
    } catch (err) {
      console.log(err);
      toast.error("An error was encountered during the course of upgrade!");
    }
  };

  const isUgradable = !versions.v3 && versions.v2;
  const isDeployable = !versions.v2 && !versions.v3

  return (
    <section className="container mx-auto min-h-screen pt-32 pb-16 px-4 md:px-16 lg:px-16 ">
      <section className="min-h-screen">
        <h2 className="text-deep-blue mb-8">My NFT Collections</h2>
        <div className="grid grid-cols-[1fr] md:grid-cols-2 gap-8 w-full">
          <div className=" w-full rounded-[8px]">
            {nft?.image ? (
              <img
                className="!w-[673px] !h-[480px] rounded-[8px] object-cover"
                src={nft.image}
                width={673}
                height={480}
                alt="NFT Image"
              />
            ) : (
              <div
                aria-label="loader"
                className=" w-full min-h-[500px] h-full bg-[#eae9e9] rounded-[8px] animate-pulse"
              ></div>
            )}
          </div>
          <div className="flex flex-col gap-6">
            <div className="flex justify-between items-center">
              <div className="flex md:flex-col lg:flex-row items-center md:items-start lg:items-center gap-3">
                {nft?.name ? (
                  <h3 className="text-deep-blue">{nft.name}</h3>
                ) : (
                  <div
                    aria-label="loader"
                    className="w-[10rem] h-[1.2rem] rounded-full bg-[#eae9e9] animate-pulse"
                  ></div>
                )}
                <div className="flex justify-between items-center">
                  <div>
                    <p
                      className="inline-flex items-center p-[5px] bg-gray-200 cursor-pointer rounded-full hover:transform hover:scale-110"
                      title="Tokenbound account address"
                    >

                      <CopyButton textToCopy={deployedAddress} />
                      <span className="ml-3">
                        <Link
                          href={`${chain.network === "mainnet"
                            ? url
                            : chain.network === "sepolia"
                              ? sepolia_url
                              : ""
                            }/contract/${deployedAddress}`}
                          target="__blank"
                        >
                          <FaArrowAltCircleRight size={25} />
                        </Link>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div>
                {status === null ? (
                  <div
                    className="bg-[#0C0C4F] text-[#fafafa] h-[3.5rem] w-[8rem]   rounded-[6px] animate-pulse"
                    onClick={deployAccount}
                  ></div>
                ) : (
                  <>
                    {status ? (
                      isUgradable ? (
                        <button
                          className={`bg-[#0c0c4f] text-white text-sm py-[13px] h-[3rem] px-6 disabled:cursor-not-allowed rounded-[6px]`}
                          onClick={upgradeAccount}
                        >
                          Upgrade Account
                        </button>
                      ) : versions.v2 || versions.v3 && (
                        <button
                          disabled={status}
                          className={`bg-[#0c0c4f] opacity-50 text-white text-sm py-[13px] h-[3rem] px-6 disabled:cursor-not-allowed rounded-[6px]`}
                          onClick={deployAccount}
                        >
                          TBA Deployed
                        </button>
                      )
                    ) : isDeployable ? (
                      <button
                        className="bg-[#0C0C4F] text-[#fafafa] h-[3rem] py-[6px] px-2 md:py-[.5rem] md:px-[.5rem] lg:py-[13px] lg:px-6 rounded-[6px]"
                        onClick={deployAccount}
                      >
                        Deploy Account
                      </button>
                    ) : null}

                  </>
                )}
              </div>
            </div>
            {nft?.description ? (
              <p className="mt-[18px]">{nft.description}</p>
            ) : (
              <div aria-label="loader" className="flex flex-col gap-4">
                <div className="w-[75%] h-[1.2rem] rounded-full bg-[#eae9e9] animate-pulse"></div>
                <div className="w-[75%] h-[1.2rem] rounded-full bg-[#eae9e9] animate-pulse"></div>
              </div>
            )}

            <div>
              <div className="mt-6 flex items-center gap-[12px] p-2 bg-[#EFEFEF] rounded-[8px] w-fit">
                <button
                  onClick={toggleContent}
                  className={`${isCollectible
                    ? "bg-[#0C0C4F] text-white"
                    : "bg-[#F2F2F2] text-gray-400"
                    } cursor-pointer  rounded-[6px] gap-x-1 p-2 flex items-center transition-all duration-500`}
                >
                  <FaGem size={20} />
                  Collectible
                </button>
                <button
                  onClick={toggleContent}
                  className={`${!isCollectible
                    ? "bg-[#0C0C4F] text-white"
                    : "bg-[#F2F2F2] text-gray-400"
                    } cursor-pointer gap-x-1 rounded-[6px] flex items-center p-2 transition-all duration-500`}
                >
                  <FaCoins size={20} />
                  Assets
                </button>
                <Tooltip message="click to refresh asset if metadata does not display">
                  <button
                    onClick={refreshMetadata}
                    disabled={loading}
                    type="button"
                    className={`${loading ? "bg-red-300" : ""
                      } cursor-pointer  bg-red-500 text-white rounded-[6px] gap-x-1 p-2 flex items-center transition-all duration-500`}
                  >
                    Refresh metadata
                  </button>
                  {success?.status == 200 && isVisible ? (
                    <p className="absolute bg-blue-500 text-white text-xs pl-1 pr-1  rounded-lg  transition ease-in-out duration-300">
                      {success?.data.result}
                    </p>
                  ) : (
                    ""
                  )}
                </Tooltip>
              </div>
              {isCollectible ? (
                <NonFungibleAsset tba={deployedAddress} />
              ) : (
                <FungibleAsset tokenBoundAddress={deployedAddress} />
              )}{" "}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Assets;
