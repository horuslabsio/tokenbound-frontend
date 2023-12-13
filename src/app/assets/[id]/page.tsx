"use client";
import AppWrapper from "@/components/AppWrapper";
import Image from "next/image";
import React, { useState } from "react";
import zeus from "../../../../public/zeus.jpg";
import { BiCopyAlt } from "react-icons/bi";
import { FaGem, FaCoins } from "react-icons/fa";
import { useFetchUserNFT } from "@/hooks";
import { useParams } from "next/navigation";
import { copyToClipBoard, shortenAddress } from "../../../../utils/helper";
import { toast } from "react-toastify";

function Assets() {
  const [isCollectible, setIsCollectible] = useState(false);

  let { id } = useParams()

  const toggleContent = () => {
    setIsCollectible((prevIsCollectible) => !prevIsCollectible);
  };

  const copyToClipBoardHandler = async (text: string) => {
    const success = await copyToClipBoard(text);
    if (success) {
      toast.info(`Copied to clipboard:  ${text}`);
    } else {
      toast.error("Not Copied");
    }
  };

  return (
    <AppWrapper>
      <section>
        <div className="flex flex-col md:flex-row justify-between w-full p-4">
          <div className="w-full md:w-1/2 mb-4 md:mb-0 mr-4">
            {" "}

            <Image
              className="w-full h-auto md:h-full rounded-lg object-cover"
              src={zeus}
              alt="Card Image"
            />
          </div>
          <div className="w-full md:w-1/2 bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-between items-center">
              <div>
              <p className="inline-flex items-center p-[5px] bg-gray-200 cursor-pointer rounded-full hover:transform hover:scale-110">
                <span onClick={() => copyToClipBoardHandler(id as string)} className="text-gray-400">{shortenAddress(id as string)}</span>
                <span className="ml-1">
                  <BiCopyAlt />
                </span>
              </p>
            </div>
            <div>
              <button className="bg-black text-white font-normal outline-none px-2 py-1 rounded-lg">Deploy Account</button>
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
              {isCollectible ? <p>No collectible</p> : <p>No assets</p>}{" "}
            </div>
          </div>
        </div>
        {/* <p className="ml-4">Text below the image</p> */}

      </section>
    </AppWrapper>
  );
}

export default Assets;
