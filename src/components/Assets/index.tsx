import React, { CSSProperties } from 'react'
import ETH from "@public/ETH.png"
import USDC from "@public/USDC.png"
import DAI from "@public/DAI.png"
import Image from 'next/image'
import { useAccount, useContractRead } from '@starknet-react/core'
import { DaiTokenAddress, EtherTokenAddress, UsdcTokenAddress } from '@utils/constants'
import Erc20Abi from "@abis/token.abi.json"
import { BounceLoader } from 'react-spinners'


function Asset() {


  const { address } = useAccount()
  // @notice
  // @dev
  // @detail: token balance to be fetched for Token bound account but temporarily fetching balance of connected address
  const { data: eth, isLoading: ethLoading, error: ethError } = useContractRead({
    address: EtherTokenAddress,
    abi: Erc20Abi,
    functionName: 'balanceOf',
    args: [address!],
    watch: true
  })
  const { data: dai, isLoading: daiLoading, error: daiError } = useContractRead({
    address: DaiTokenAddress,
    abi: Erc20Abi,
    functionName: 'balanceOf',
    args: [address!],
    watch: true
  })
  const { data: usdc, isLoading: usdcLoading, error: usdcError } = useContractRead({
    address: UsdcTokenAddress,
    abi: Erc20Abi,
    functionName: 'balanceOf',
    args: [address!],
    watch: true
  })
  // @ts-ignore
  let ETH_BALANCE = eth?.balance?.low.toString() / 1e18;
  // @ts-ignore
  let DAI_BALANCE = dai?.balance?.low.toString() / 1e18;
  // @ts-ignore
  let USDC_BALANCE = usdc?.balance?.low.toString() / 1e6;

  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    position: 'relative',
    left: "20px"
  };
  

  return (
    <div className='mt-4'>
      <div className='flex items-center -mx-[11px] mb-2'>
        <div>
          <img src={ETH.src} className='w-full h-12' alt='asset-logo' />
        </div>
        <div>

          {
            //@ts-ignore
            ethLoading ? <BounceLoader cssOverride={override} size={10} color="#36d7b7" /> : <h2 className='font-bold text-3xl'>- {`${ETH_BALANCE.toFixed(4)} ETH`}</h2>

          }
          {
            ethError && <p className='text-red'>Failed to fetch token</p>
          }
        </div>
      </div>
      <div className='flex items-center'>
        <div>
          <Image src={USDC.src} width={40} height={30} alt='asset-logo' />
        </div>
        <div>
          {
            //@ts-ignore
            usdcLoading ? <BounceLoader cssOverride={override} size={10} color="#36d7b7" /> : <h2 className='font-bold text-3xl mx-2'>- {`${USDC_BALANCE.toFixed(4)} USDC`}</h2>

          }
          {
            usdcError && <p className='text-red'>Failed to fetch token</p>
          }
        </div>
      </div>
      <div className='flex items-center mt-2'>
        <div>
          <Image src={DAI.src} width={40} height={30} alt='asset-logo' />
        </div>
        <div>
          <div>
            {
              //@ts-ignore
              daiLoading ? <BounceLoader cssOverride={override} size={10} color="#36d7b7" /> : <h2 className='font-bold text-3xl mx-2'>- {`${DAI_BALANCE.toFixed(4)} DAI`}</h2>

            }
            {
              daiError && <p className='text-red'>Failed to fetch token</p>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default Asset
