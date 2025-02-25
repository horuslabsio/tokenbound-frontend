import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useMemo } from "react";
import { IWalletModal } from "types";
import { useConnect, Connector } from "@starknet-react/core";
import { CloseIcon } from "@public/icons";

export default function ConnectWallet({
  isWalletOpen,
  closeWalletModal,
}: IWalletModal) {
  const { connect, connectors } = useConnect();
  const connectWallet = (connector: Connector) => {
    connect({ connector });
    closeWalletModal();
  };

  const walletIcons = useMemo(() => {
    if (!connectors) return [];

    const svgToBase64 = (
      svgString: string | { dark: string; light: string }
    ) => {
      if (typeof svgString === "string") {
        return svgString.startsWith("<svg")
          ? `data:image/svg+xml;base64,${btoa(svgString)}`
          : svgString;
      }
      return svgString.light.startsWith("<svg")
        ? `data:image/svg+xml;base64,${btoa(svgString.light)}`
        : svgString.light;
    };

    return connectors.map((connector) => ({
      id: connector.id,
      icon: svgToBase64(connector.icon),
    }));
  }, [connectors]);

  return (
    <>
      <Transition appear show={isWalletOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeWalletModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="flex w-full max-w-[435px] flex-col justify-between rounded-[16px] bg-white p-4">
                  <Dialog.Title>
                    <div className="mb-4 flex items-center justify-between py-2">
                      <h5 className={"text-start text-2xl"}>
                        Connect <span className="text-gradient">wallet</span>
                      </h5>
                      <button
                        className="grid h-10 w-10 place-content-center rounded-full bg-gray-100 text-lg text-black"
                        onClick={closeWalletModal}
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className="rounded-lg bg-gray-100 px-4 py-2">
                    {connectors.map((connector, index) => {
                      if (connector.id && connector.available()) {
                        const walletIcon = walletIcons.find(
                          (icon) => icon.id === connector.id
                        )?.icon;

                        return (
                          <button
                            onClick={() => connectWallet(connector)}
                            className={`w-full py-3 ${
                              index < connectors.length - 1
                                ? "border-b border-[#EDEDED]"
                                : ""
                            }`}
                            key={connector.id}
                          >
                            <span className="flex items-center gap-2">
                              {walletIcon && (
                                <div className="h-6 w-6">
                                  <img
                                    src={walletIcon}
                                    alt={`${connector.name} Wallet Icon`}
                                  />
                                </div>
                              )}
                              {`Connect ${connector.name}`}
                            </span>
                          </button>
                        );
                      }
                      return null;
                    })}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
