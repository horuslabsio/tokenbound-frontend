"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { communityLinks, learningLinks } from "@static/index";
import ConnectedNavBar from "@components/Connected";
import ConnectWallet from "@components/ConnectWallet/page";
import { AccountInterface } from "starknet";
import { DownChevronIcon, HamburgerIcon, WalletIcon } from "@public/icons";
import { Button } from "ui/button";
import LOGO from "../../../public/logo.svg";
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
    <nav className="container mx-auto flex items-center gap-8 lg:justify-between">
      <div className="flex-1">
        <Link className="block w-[9rem]" href={"/"}>
          <Image src={LOGO} alt="horus labs logo" />
        </Link>
      </div>
      <div className="hidden items-center gap-10 text-foreground-primary lg:flex">
        <p>Explorer</p>

        <Menu
          activeDropDown={activeDropDown}
          openDropDown={openDropDown}
          setActiveDropDown={setActiveDropDown}
          title="learn"
          toggleDropDown={toggleDropDown}
        />
        <Menu
          activeDropDown={activeDropDown}
          openDropDown={openDropDown}
          setActiveDropDown={setActiveDropDown}
          title="community"
          toggleDropDown={toggleDropDown}
        />

        <p>Showcase</p>

        <DropDown
          dropdownItems={learningLinks}
          openDropDown={openDropDown}
          activeDropDown={activeDropDown}
          id="learn"
        />
        <DropDown
          dropdownItems={communityLinks}
          openDropDown={openDropDown}
          activeDropDown={activeDropDown}
          id="community"
        />
      </div>
      <div className="hidden items-center space-x-8 md:flex">
        {isWalletOpen && (
          <ConnectWallet
            isWalletOpen={isWalletOpen}
            closeWalletModal={closeWalletModal}
            openWalletModal={openWalletModal}
          />
        )}
        {account && <NetworkSwitcher />}
        {!account ? (
          <Button startIcon={<WalletIcon />} onClick={openWalletModal}>
            Connect Wallet
          </Button>
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
    >
      <span className="capitalize">{title}</span>
      <span
        className={`text-xl transition-all duration-300 ease-in-out ${
          openDropDown && activeDropDown === title
            ? "rotate-[-180deg]"
            : "rotate-0"
        }`}
      >
        <DownChevronIcon />
      </span>
    </Button>
  );
};
