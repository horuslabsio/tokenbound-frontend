"use client";
import { useEffect, useState } from "react";
import { useAccount, useNetwork } from "@starknet-react/core";
import { usePathname, useRouter } from "next/navigation";
import Nav from "./Nav";

const Header = () => {
  const { account, isConnected } = useAccount();
  const { chain } = useNetwork();
  const router = useRouter();
  const path = usePathname();

  const [isWalletOpen, setIsWalletOpen] = useState(false);
  function closeWalletModal() {
    setIsWalletOpen(false);
  }

  function openWalletModal() {
    setIsWalletOpen(true);
  }

  useEffect(() => {
    if (chain.network === "sepolia") {
      router.push("/");
    }
  }, [chain, router]);

  useEffect(() => {
    if (!isConnected && !account && path !== "/") {
      setIsWalletOpen(true);
    }
  }, [isConnected, account, path]);
  return (
    <header className="fixed z-50 flex min-h-[4rem] w-screen items-center justify-between px-8 py-3 backdrop-blur lg:block">
      <Nav
        account={account}
        closeWalletModal={closeWalletModal}
        isWalletOpen={isWalletOpen}
        openWalletModal={openWalletModal}
      />
    </header>
  );
};

export default Header;
