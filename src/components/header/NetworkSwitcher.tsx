"use client";
import { useAccount, useNetwork } from "@starknet-react/core";
import { useRouter, usePathname } from "next/navigation";
import { DownChevronIcon } from "@public/icons";
import { useEffect, useRef, useState } from "react";
import { Button } from "ui/button";

const NETWORK_MAPPING: { [key: string]: string } = {
  mainnet: "SN_MAIN",
  sepolia: "SN_SEPOLIA",
};

const networks = [
  {
    value: "SN_MAIN",
    label: "Mainnet",
  },
  {
    value: "SN_SEPOLIA",
    label: "Sepolia",
  },
];

export function NetworkSwitcher() {
  const { chain } = useNetwork();
  const { address } = useAccount();

  const { push } = useRouter();
  const path = usePathname();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState(
    NETWORK_MAPPING[chain.network]
  );
  const switchNetwork = async (newNetworkId: string, networkLabel: string) => {
    try {
      await window?.starknet?.request({
        type: "wallet_switchStarknetChain",
        params: { chainId: newNetworkId },
      });
      setSelectedNetwork(newNetworkId);
      if (path.startsWith("/asset")) {
        push(`/wallet/${address}`);
      }
    } catch (error) {
      console.error("Failed to switch networks:", error);
    }
  };

  useEffect(() => {
    setSelectedNetwork(NETWORK_MAPPING[chain.network]);
    dialogRef?.current?.close();
  }, [chain.network]);

  return (
    <div className="relative hidden md:block">
      <Button
        onClick={() => dialogRef?.current?.show()}
        variant="ghost"
        role="combobox"
        className="h-[2.3rem] w-[6.6rem] justify-between rounded-[8px] bg-[#F7F7F7]"
      >
        {selectedNetwork
          ? networks.find((network) => network.value === selectedNetwork)?.label
          : "Select Network..."}
        <span className="ml-2 h-4 w-4 shrink-0 opacity-50">
          <DownChevronIcon />
        </span>
      </Button>
      <dialog
        onClick={() => {
          dialogRef?.current?.close();
        }}
        ref={dialogRef}
        className="absolute top-0 z-[10] rounded-[8px]"
      >
        <div className="flex min-h-[5.1rem] w-[9.2rem] flex-col gap-1 rounded-[8px] bg-white p-1">
          {networks.map((network) => {
            return (
              <button
                key={network.label}
                className={`h-[2.8rem] rounded-lg px-4 py-2 text-start text-base ${selectedNetwork === network.value ? "bg-primary-btn text-white" : ""}`}
                onClick={(event) => {
                  event.stopPropagation();
                  switchNetwork(network.value, network.label);
                }}
              >
                {network.label}
              </button>
            );
          })}
        </div>
      </dialog>
    </div>
  );
}

export default NetworkSwitcher;
