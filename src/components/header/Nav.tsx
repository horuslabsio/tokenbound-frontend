"use client";
import { SetStateAction, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { communityLinks, learningLinks } from "@static/index";
import ConnectedNavBar from "@components/Connected";
import ConnectWallet from "./components/ConnectWallet";
import { AccountInterface } from "starknet";
import {
  CloseIcon,
  DownChevronIcon,
  HamburgerIcon,
  WalletIcon,
} from "@public/icons";
import { Button } from "ui/button";
import LOGO from "../../../public/logo.svg";
import LOGO_SMALL from "../../../public/logo-2.svg";
import DropDown, { Anchor } from "./DropDown";
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
  const [openSideNav, setOpenSideNav] = useState(false);
  const [activeDropDown, setActiveDropDown] = useState("");
  const communityDialog = useRef<HTMLDialogElement | null>(null);

  const toggleLearnDropdown = () => {
    if (learnDialog.current?.open) {
      learnDialog.current?.close();
    } else {
      communityDialog.current?.close();
      learnDialog.current?.show();
    }
  };
  const toggleCommunityDropdown = () => {
    if (communityDialog.current?.open) {
      communityDialog.current.close();
    } else {
      learnDialog.current?.close();
      communityDialog.current?.show();
    }
  };

  const closeDropDowns = () => {
    learnDialog.current?.close();
    communityDialog.current?.close();
  };

  const learnDialog = useRef<HTMLDialogElement | null>(null);

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
          <Menu title="learn" toggleDropDown={toggleLearnDropdown} />
          <dialog
            onClick={closeDropDowns}
            className="before:bg-transparent"
            ref={learnDialog}
          >
            <DropDown dropdownItems={learningLinks} />
          </dialog>
        </div>
        <div className="relative">
          <Menu title="community" toggleDropDown={toggleCommunityDropdown} />
          <dialog
            className="absolute top-[4rem] z-[100] h-screen bg-red-700 before:bg-transparent md:h-auto"
            onClick={closeDropDowns}
            ref={communityDialog}
          >
            <DropDown dropdownItems={communityLinks} />
          </dialog>
        </div>

        <a href="#projects">Showcase</a>
      </div>
      <div className="items-center space-x-8 md:flex">
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

      <button
        onClick={() => {
          setOpenSideNav(true);
          document.body.style.overflow = "hidden";
        }}
        aria-label="open menu"
        className="text-3xl text-black lg:hidden"
      >
        <HamburgerIcon />
      </button>
      <div
        className={`fixed left-0 top-0 flex h-[100dvh] w-screen flex-col justify-between bg-white p-4 text-black transition-all duration-[.5s] ${openSideNav ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="p-2">
          <button
            onClick={() => {
              document.body.style.overflow = "auto";
              setOpenSideNav(false);
            }}
            className="mb-8 text-3xl"
          >
            <CloseIcon />
          </button>
          <div>
            <p className="p-2 text-xl font-bold">Learn</p>
            <ul>
              {learningLinks.map((item, index) => {
                const { title, url } = item;
                return <Anchor key={index} url={url} title={title} />;
              })}
            </ul>
            <p className="p-2 text-xl font-bold">Community</p>
            <ul>
              {communityLinks.map((item, index) => {
                const { title, url } = item;
                return <Anchor key={index} url={url} title={title} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;

const Menu = ({
  title,
  toggleDropDown,
}: {
  title: string;
  toggleDropDown: () => void;
}) => {
  return (
    <Button
      onClick={toggleDropDown}
      variant={"ghost"}
      className="flex items-center gap-2"
    >
      <span className="capitalize">{title}</span>
      <span>
        <DownChevronIcon />
      </span>
    </Button>
  );
};
