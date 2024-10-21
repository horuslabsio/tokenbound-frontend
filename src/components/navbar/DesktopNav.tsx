"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import DownChevronIcon from "svg/DownChevronIcon";
import DropDown from "./DropDown";
import { communityLinks, learningLinks } from "@static/index";
import ConnectedNavBar from "@components/Connected";
import ConnectWallet from "@components/ConnectWallet/page";
import { AccountInterface } from "starknet";
import SearchNFT from "./SearchNFT";
import NetworkSwitcher from "@components/NetworkSwitcher";
import VersionSwitcher  from "@components/VersionSwitcher";

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
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const toggleDropDown = () => {
    setOpenDropDown((prev) => !prev);
  };
  const closeDropDown = () => {
    setOpenDropDown(false);
    setActiveDropDown("");
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        closeDropDown();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <nav className="container mx-auto flex items-center gap-8 justify-between">
      <div className="flex items-center gap-10">
        <Link className="block w-[150px] md:w-[200px]" href={"/"}>
          <Image
            src={"/logo.svg"}
            alt="starknet logo"
            width={200}
            height={46}
          />
        </Link>
        <div ref={dropdownRef} className="hidden lg:flex gap-8">
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
        <SearchNFT />
        {isWalletOpen && (
          <ConnectWallet
            isWalletOpen={isWalletOpen}
            closeWalletModal={closeWalletModal}
            openWalletModal={openWalletModal}
          />
        )}
                <VersionSwitcher />
        <NetworkSwitcher />
        {!account ? (
          <button
            onClick={openWalletModal}
            className="w-[14rem] h-[3rem] py-3 px-4 bg-deep-blue rounded-[8px] text-white"
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
