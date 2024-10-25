"use client";
import { useEffect, useState } from "react";
import { useAccount, useNetwork } from "@starknet-react/core";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
import { useRouter } from "next/navigation";

function Navbar() {
  const { account } = useAccount();
  const { chain } = useNetwork();
  const { push } = useRouter();

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  function closeWalletModal() {
    setIsWalletOpen(false);
  }

  function openWalletModal() {
    setIsWalletOpen(true);
  }

  useEffect(() => {
    if (chain.network === "sepolia") {
      push("/");
    }
  }, [chain]);

  return (
    <header className="fixed z-[99] flex min-h-[4rem] w-screen items-center justify-between bg-white px-8 py-3 lg:block">
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
