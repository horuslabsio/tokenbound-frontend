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
import VersionSwitcher from "@components/VersionSwitcher";

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
    <nav className="container mx-auto flex items-center justify-between gap-8">
      <div className="flex items-center gap-10">
        <Link className="block w-[150px] md:w-[200px]" href={"/"}>
          <Image
            src={"/logo.svg"}
            alt="starknet logo"
            width={200}
            height={46}
          />
        </Link>
        <div ref={dropdownRef} className="hidden gap-8 lg:flex">
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
                  : "rotate-0"
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
            className={`hidden items-center gap-1 lg:flex`}
          >
            <span>Community</span>
            <span
              className={`self-end transition-all duration-300 ease-in-out ${
                openDropDown && activeDropDown === "community"
                  ? "rotate-[-180deg]"
                  : "rotate-0"
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
      <div className="hidden items-center space-x-8 md:hidden lg:flex">
        <SearchNFT />
        {isWalletOpen && (
          <ConnectWallet
            isWalletOpen={isWalletOpen}
            closeWalletModal={closeWalletModal}
            openWalletModal={openWalletModal}
          />
        )}
        <NetworkSwitcher />
        {!account ? (
          <button
            onClick={openWalletModal}
            className="h-[3rem] w-[14rem] rounded-[8px] bg-deep-blue px-4 py-3 text-white"
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
