"use client";
import { useState } from "react";
import { useAccount } from "@starknet-react/core";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

function Navbar() {
  const { account } = useAccount();
  // state for connectwallet component
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  function closeWalletModal() {
    setIsWalletOpen(false);
  }

  function openWalletModal() {
    setIsWalletOpen(true);
  }
  return (
    <header className="fixed z-[99] min-h-[4rem] w-screen px-8 py-3 flex items-center justify-between lg:block  bg-white">
      <DesktopNav
        account={account}
        closeWalletModal={closeWalletModal}
        isWalletOpen={isWalletOpen}
        openWalletModal={openWalletModal}
      />
      <MobileNav account={account} openWalletModal={openWalletModal} />
    </header>
  );
}

export default Navbar;
