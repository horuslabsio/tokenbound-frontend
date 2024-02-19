import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DownChevronIcon from "svg/DownChevronIcon";
import DropDown from "./DropDown";
import { communityLinks, learningLinks } from "@static/index";
import SearchIcon from "svg/SearchIcon";
import ConnectedNavBar from "@components/Connected";
import ConnectWallet from "@components/ConnectWallet/page";
import { AccountInterface } from "starknet";

const DesktopNav = ({
  isWalletOpen,
  account,
  closeWalletModal,
  openWalletModal,
}: {
  isWalletOpen: boolean;
  closeWalletModal(): void;
  openWalletModal(): void;
  account: AccountInterface | undefined;
}) => {
  /* STATE FOR DROPDOWN */
  const [openDropDown, setOpenDropDown] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState("");
  const toggleDropDown = () => {
    setOpenDropDown((prev) => !prev);
  };
  return (
    <nav className="flex items-center gap-8 justify-between">
      <div className="basis-[80%] lg:basis-1/2   flex items-center gap-40">
        <Link href={"/"}>
          <Image
            src={"/logo.svg"}
            alt="starknet logo"
            width={200}
            height={46}
          />
        </Link>
        <div className="hidden lg:flex gap-8">
          <button
            onMouseEnter={() => setActiveDropDown("learning")}
            onClick={toggleDropDown}
            className="flex gap-1"
          >
            <span>Learn</span>
            <span
              className={`self-end transition-all duration-300 ease-in-out ${
                openDropDown && activeDropDown === "learning"
                  ? "rotate-[-180deg]"
                  : " rotate-0"
              }`}
            >
              <DownChevronIcon />
            </span>
            <DropDown
              dropdownItems={learningLinks}
              openDropDown={openDropDown}
              activeDropDown={activeDropDown}
              id="learning"
            />
          </button>
          <button
            onMouseEnter={() => setActiveDropDown("community")}
            onClick={toggleDropDown}
            className={`hidden lg:flex items-center gap-1`}
          >
            <span>Community</span>
            <span
              className={`self-end transition-all duration-300 ease-in-out ${
                openDropDown && activeDropDown === "community"
                  ? " rotate-[-180deg]"
                  : " rotate-0"
              }`}
            >
              <DownChevronIcon />
            </span>
            <DropDown
              dropdownItems={communityLinks}
              openDropDown={openDropDown}
              activeDropDown={activeDropDown}
              id="community"
            />
          </button>
        </div>
      </div>
      <div className="hidden md:hidden lg:flex items-center space-x-8">
        <div className="relative w-[14rem]">
          <input
            className="bg-off-white py-3 px-16  w-full h-full rounded-[8px]"
            role="search"
            type="text"
            name="search"
            id="search"
            placeholder="Search NFTs"
          />
          <span
            style={{
              top: "calc(50% - 2em /2)",
            }}
            className="absolute px-4 text-gray-500  left-0"
          >
            <SearchIcon />
          </span>
        </div>
        {isWalletOpen && (
          <ConnectWallet
            isWalletOpen={isWalletOpen}
            closeWalletModal={closeWalletModal}
            openWalletModal={openWalletModal}
          />
        )}

        {!account ? (
          <button
            onClick={openWalletModal}
            className="w-[14rem] p-3 bg-deep-blue rounded-[8px] text-white"
            type="button"
          >
            Connect Wallet
          </button>
        ) : (
          <ConnectedNavBar />
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
