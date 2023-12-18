import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IWalletModal } from "types";
import { useConnect, Connector, useAccount } from "@starknet-react/core";
import WalletIcons from "../WalletIcon/page";

export default function ConnectWallet({
  openWalletModal,
  isWalletOpen,
  closeWalletModal,
}: IWalletModal) {
  const { connect, connectors } = useConnect();
  const connectWallet = (connector: Connector) => {
    connect({ connector });
    closeWalletModal();
  };

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
            <div className="flex min-h-full items-center  justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#010A20] p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-500"
                  >
                    Connect Wallet
                  </Dialog.Title>

                  {connectors.map((connector) => {
                    if (connector.available()) {
                      return (
                        <div
                          className="flex items-center border-b border-[#7d92b5] my-2 border-opacity-20 p-1 cursor-pointer justify-between"
                          key={connector.id}
                        >
                          <button
                            className="text-[#BEC9DA] w-full font-normal font-jakarta"
                            onClick={() => connectWallet(connector)}
                          >
                            <div className="flex">
                              <WalletIcons id={connector.id} />
                              {`Connect ${connector.name}`}
                            </div>
                          </button>
                        </div>
                      );
                    }
                  })}

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
