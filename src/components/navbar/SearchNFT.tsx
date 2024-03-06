import { instance } from "@utils/helper";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import SearchIcon from "svg/SearchIcon";
import SyncLoader from "react-spinners/SyncLoader";
import Image from "next/image";

type NftInfo = {
  contract_address: string;
  contract_type: string;
  image: string;
  name: string;
  symbol: string;
};

const SearchNFT = () => {
  const nftDropDownRef = useRef<HTMLDivElement | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [nft, setNft] = useState<NftInfo>({
    contract_address: "",
    contract_type: "",
    image: "",
    name: "",
    symbol: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [isFocused, setIsFocused] = useState(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  useEffect(() => {
    setNft({
      contract_address: "",
      contract_type: "",
      image: "",
      name: "",
      symbol: "",
    });
    setLoading(true);
    const fetchData = async () => {
      try {
        const url = `https://api.arkproject.dev/v1/contracts/${searchInput}`;
        const response = await instance.get(url);
        const { data } = response;
        setNft(data?.result);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user NFT:", error);
        setLoading(false);
      }
    };
    const processChange = setTimeout(() => fetchData(), 1000);
    return () => clearTimeout(processChange);
  }, [searchInput]);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        nftDropDownRef.current &&
        !nftDropDownRef.current.contains(event.target as Node)
      ) {
        setSearchInput("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [nftDropDownRef]);

  const myLoader = ({ src }: { src: string }) => {
    return src;
  };

  return (
    <div
      ref={nftDropDownRef}
      className={`relative xsm:w-[90%] transition-all duration-300 ease-in-out ${
        isFocused ? " w-[90%] lg:w-[30vw]" : "w-[14rem]"
      }`}
    >
      <div
        className={`relative xsm:w-[90%] transition-all duration-300 ease-in-out ${
          isFocused ? " w-[80vw] lg:w-[30vw]" : "w-[14rem]"
        }`}
      >
        <input
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={searchInput}
          className="bg-off-white py-4 pl-10 pr-4  w-full h-full rounded-[8px] text-[.875rem]"
          role="search"
          type="text"
          name="search"
          id="search"
          placeholder="Search NFTs"
        />
        <span
          style={{
            top: "calc(50% - 1.7em /2)",
          }}
          className="absolute pl-2 pr-4 text-gray-500  left-0"
        >
          <SearchIcon />
        </span>
      </div>
      <div
        style={{
          boxShadow: "0 0 2px 0 #c3c0c0, inset 0 0 2px 0 rgba(85, 85, 85, 0.2)",
        }}
        className={`mt-8 lg:mt-0 lg:fixed xsm:w-[90%] w-[80vw] lg:w-[30vw] min-h-[4rem] bg-white rounded-[8px] top-[5rem]  gird
        ${searchInput ? "block" : "hidden"}
          `}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col p-4  gap-6">
            {loading ? (
              <SyncLoader
                aria-label="Loading Spinner"
                size={10}
                color="#0C0C4F"
              />
            ) : (
              <>
                {nft.name === "" && nft.image === "" && nft.symbol === "" ? (
                  <div className="my-auto ">
                    <h6 className="uppercase text-[.9em]">
                      Collection not found
                    </h6>
                  </div>
                ) : (
                  <>
                    <h5 className="text-[.9em]">COLLECTION</h5>
                    <a
                      href={`https://starkscan.co/contract/${nft.contract_address}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="h-[4rem] flex gap-4"
                    >
                      <div className="max-w-[50px] max-h-[50px] rounded-[8px]">
                        <Image
                          loader={myLoader}
                          src={nft.image}
                          width={20}
                          height={20}
                          alt={nft.name}
                          className="rounded-[8px] w-full h-full"
                        />
                      </div>

                      <div>
                        <h6 className="font-semibold">{nft.name}</h6>
                        <p>{nft.symbol}</p>
                      </div>
                    </a>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchNFT;
