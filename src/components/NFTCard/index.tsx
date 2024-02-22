import { copyToClipBoard, shortenAddress } from '@utils/helper';
import React from 'react'
import { BiCopyAlt } from 'react-icons/bi';
import { toast } from 'react-toastify';

const NFTCard = () => {
    const copyToClipBoardHandler = async (text: string) => {
        const success = await copyToClipBoard(text);
        if (success) {
          toast.info(`Copied to clipboard ${text}`);
        } else {
          toast.error("Not Copied");
        }
      };
  return (
    <div className="flex-1  h-[500px] min-w-[400px] max-w-[452px] rounded-xl bg-white ">
        <img className='w-full h-[300px] object-cover rounded-xl' src='https://picsum.photos/200/300'  />
        <div className="h-full w-full p-8 flex flex-col gap-4">
            <p className='text-2xl text-black'>Rainbow #23</p>
            <p
                  className="inline-flex items-center p-[4px] bg-gray-200 cursor-pointer rounded-full hover:transform hover:scale-110 w-[110px]"
                  title="NFT address"
                >
                  <span
                    onClick={() =>
                      copyToClipBoardHandler("0xwe..qwwww")
                    }
                    className="text-gray-400"
                  >
                    {"0xaw...edf4"}
                  </span>
                  <span className="ml-1 border-l p-[2px] border-gray-500">
                    <BiCopyAlt />
                  </span>
                </p>
            <p className="w-full text-lg line-clamp-2 ">Rainbow Palm minted by Stoneclave  that can own tokens Rainbow Palm minted by Stoneclave  that can own tokens Rainbow Palm minted by Stoneclave  that can own tokens </p>
        </div>
    </div>
  )
}

export default NFTCard