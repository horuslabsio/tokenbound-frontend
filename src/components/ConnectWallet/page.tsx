import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { IWalletModal } from "types";
import { useConnect, Connector } from "@starknet-react/core";
import { WalletIcons } from "@public/icons";

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
                <Dialog.Panel className="flex min-h-[250px] w-[435px] flex-col justify-between rounded-[16px] bg-white p-4">
                  <Dialog.Title>
                    <div className="mb-4 flex items-center justify-between py-2">
                      <h5 className={"text-start text-2xl"}>
                        Connect <span className="text-gradient">wallet</span>
                      </h5>
                      <button
                        className="grid h-10 w-10 place-content-center rounded-full bg-gray-100 text-lg text-black"
                        onClick={closeWalletModal}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="1em"
                          height="1em"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fill="currentColor"
                            d="M6.225 4.811a1 1 0 0 0-1.414 1.414L10.586 12L4.81 17.775a1 1 0 1 0 1.414 1.414L12 13.414l5.775 5.775a1 1 0 0 0 1.414-1.414L13.414 12l5.775-5.775a1 1 0 0 0-1.414-1.414L12 10.586z"
                          />
                        </svg>
                      </button>
                    </div>
                  </Dialog.Title>
                  <div className="rounded-lg bg-gray-100 p-4">
                    {connectors.map((connector, index) => {
                      if (connector.available()) {
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
                            <span className="flex gap-2">
                              <WalletIcons id={connector.id} />
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
