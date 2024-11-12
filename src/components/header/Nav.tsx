"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { communityLinks, learningLinks } from "@static/index";
import ConnectedNavBar from "@components/Connected";
import ConnectWallet from "./components/ConnectWallet";
import { AccountInterface } from "starknet";
import { DownChevronIcon, HamburgerIcon, WalletIcon } from "@public/icons";
import { Button } from "ui/button";
import LOGO from "../../../public/logo.svg";
import LOGO_SMALL from "../../../public/logo-2.svg";
import DropDown from "./DropDown";
import NetworkSwitcher from "./NetworkSwitcher";

const Nav = ({
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
  const communityDialog = useRef<HTMLDialogElement | null>(null);
  const toggleDropDown = () => {
    setOpenDropDown((prev) => !prev);
  };
  const openLearnDropdown = () => {
    communityDialog.current?.close();
    learnDialog.current?.show();
  };
  const openCommunityDropdown = () => {
    learnDialog.current?.close();
    communityDialog.current?.show();
  };
  const closeCommunityDropDown = () => {
    learnDialog.current?.close();
    communityDialog.current?.close();
  };

  const closeLearnDropDown = () => {
    learnDialog.current?.close();
  };
  const learnDialog = useRef<HTMLDialogElement | null>(null);
  // useEffect(() => {
  //   const handleClickOutside = (event: MouseEvent) => {
  //     if (
  //       dropdownRef.current &&
  //       !dropdownRef.current.contains(event.target as Node)
  //     ) {
  //       closeDropDown();
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [dropdownRef]);

  return (
    <nav className="container mx-auto flex items-center gap-8 lg:justify-between">
      <div className="flex-1 lg:flex-none">
        <Link className="block h-[1.8rem] w-[1.8rem] md:w-[9rem]" href={"/"}>
          <Image className="hidden md:block" src={LOGO} alt="horus labs logo" />
          <Image className="md:hidden" src={LOGO_SMALL} alt="horus labs logo" />
        </Link>
      </div>
      <div className="hidden items-center gap-10 text-foreground-primary lg:flex">
        <p>Explorer</p>
        <div className="relative">
          <Menu
            activeDropDown={activeDropDown}
            openDropDown={openDropDown}
            setActiveDropDown={setActiveDropDown}
            title="learn"
            toggleDropDown={openLearnDropdown}
          />
          <dialog
            onClick={closeCommunityDropDown}
            className="before:bg-transparent"
            ref={learnDialog}
          >
            <DropDown
              dropdownItems={learningLinks}
              openDropDown={openDropDown}
              activeDropDown={activeDropDown}
              id="learn"
            />
          </dialog>
        </div>
        <div className="relative">
          <Menu
            activeDropDown={activeDropDown}
            openDropDown={false}
            setActiveDropDown={setActiveDropDown}
            title="community"
            toggleDropDown={openCommunityDropdown}
          />
          <dialog
            className="absolute top-[4rem] z-[100] h-screen bg-red-700 before:bg-transparent md:h-auto"
            onClick={closeCommunityDropDown}
            ref={communityDialog}
          >
            <DropDown
              dropdownItems={communityLinks}
              openDropDown={openDropDown}
              activeDropDown={activeDropDown}
              id="community"
            />
          </dialog>
        </div>

        <a href="#projects">Showcase</a>
      </div>
      <div className="hidden items-center space-x-8 md:flex">
        {account && <NetworkSwitcher />}
        {!account ? (
          <>
            <Button startIcon={<WalletIcon />} onClick={openWalletModal}>
              Connect Wallet
            </Button>
            {isWalletOpen && (
              <ConnectWallet
                isWalletOpen={isWalletOpen}
                closeWalletModal={closeWalletModal}
                openWalletModal={openWalletModal}
              />
            )}
          </>
        ) : (
          <ConnectedNavBar />
        )}
      </div>

      <button className="text-3xl text-black lg:hidden">
        <HamburgerIcon />
      </button>
    </nav>
  );
};

export default Nav;

const Menu = ({
  activeDropDown,
  openDropDown,
  setActiveDropDown,
  title,
  toggleDropDown,
}: {
  title: string;
  activeDropDown: string;
  openDropDown: boolean;
  setActiveDropDown: (value: SetStateAction<string>) => void;
  toggleDropDown: () => void;
}) => {
  return (
    <Button
      onMouseEnter={() => setActiveDropDown(title)}
      onClick={toggleDropDown}
      variant={"ghost"}
      className="flex items-center gap-2"
      endIcon={
        <span
          className={`text-xl transition-all duration-300 ease-in-out group-hover:translate-x-0 group-hover:translate-y-0 ${
            openDropDown && activeDropDown === title
              ? "rotate-[-180deg]"
              : "rotate-0"
          }`}
        >
          <DownChevronIcon />
        </span>
      }
    >
      <span className="capitalize">{title}</span>
    </Button>
  );
};
