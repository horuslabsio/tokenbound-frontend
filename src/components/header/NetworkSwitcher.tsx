"use client";
import {
  useAccount,
  useDisconnect,
  useNetwork,
  useSwitchChain,
} from "@starknet-react/core";
import { useRouter, usePathname } from "next/navigation";
import { DownChevronIcon } from "@public/icons";
import { useEffect, useRef, useState } from "react";
import { Button } from "ui/button";
import { constants } from "starknet";
import { supportSwitchNetwork } from "@utils/index";

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
  const { address, connector } = useAccount();
  const { disconnect } = useDisconnect();
  const { switchChainAsync } = useSwitchChain({
    params: {
      chainId: constants.StarknetChainId.SN_MAIN,
    },
  });

  const { push } = useRouter();
  const path = usePathname();
  const dialogRef = useRef<HTMLDialogElement | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState(
    NETWORK_MAPPING[chain.network]
  );
  const [isSupportSwitchNetwork, setIsSupportSwitchNetwork] = useState<
    boolean | undefined
  >(undefined);

  const switchNetwork = async (newNetworkId: string, networkLabel: string) => {
    try {
      if (supportSwitchNetwork(connector)) {
        await switchChainAsync();
        setSelectedNetwork(newNetworkId);
        if (path.startsWith("/asset")) {
          push(`/wallet/${address}`);
        }
      } else {
        disconnect();
      }
    } catch (error) {
      console.error("Failed to switch networks:", error);
    }
  };

  useEffect(() => {
    setSelectedNetwork(NETWORK_MAPPING[chain.network]);
    setIsSupportSwitchNetwork(supportSwitchNetwork(connector));
  }, [chain.network, connector]);

  if (chain.network === "mainnet") return null;

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
        <div
          className={`flex flex-col gap-1 rounded-[8px] ${isSupportSwitchNetwork ? "min-h-[5.1rem] w-[9.2rem]" : "h-[3rem] w-[13rem]"} bg-white p-1`}
        >
          {isSupportSwitchNetwork ? (
            <>
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
            </>
          ) : (
            <>
              <button
                className={`h-[2.8rem] rounded-lg bg-primary-btn px-4 py-2 text-start text-base text-white`}
                onClick={(event) => {
                  event.stopPropagation();
                  disconnect();
                }}
              >
                Disconnect then switch
              </button>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}

export default NetworkSwitcher;
