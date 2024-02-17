import Image from "next/image";
import { communityLinks, learningLinks } from "@static/index";
import ConnectedNavBar from "@components/Connected";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ConnectWallet from "@components/ConnectWallet/page";
import { useAccount } from "@starknet-react/core";
import Link from "next/link";
import DownChevronIcon from "svg/DownChevronIcon";
import SearchIcon from "svg/SearchIcon";
import DropDown from "./DropDown";
import DesktopNav from "./DesktopNav";
import { AccountInterface } from "starknet";
const MobileNav = ({
  account,
  openWalletModal,
}: {
  openWalletModal(): void;
  account: AccountInterface | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <nav className="block lg:hidden">
      <RxHamburgerMenu size={25} onClick={openModal} />
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
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
            <div className="flex  items-center justify-center  text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full  transform overflow-hidden rounded-sm bg-white p-3 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 flex justify-end text-gray-900"
                  >
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      X
                    </button>
                  </Dialog.Title>

                  <div className="mt-4">
                    <nav>
                      <ul className="flex md:none lg:none items-center space-x-6">
                        {learningLinks.map((item, idx) => (
                          <li key={idx}>
                            {" "}
                            <a
                              className="text-blue-500   hover:text-blue-700"
                              target="_blank"
                              rel="noopener noreferrer"
                              href={item.url}
                            >
                              {item.title}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </nav>
                    <div className="mt-4">
                      {!account ? (
                        <button
                          onClick={openWalletModal}
                          className="bg-black text-white px-4 py-2 rounded-lg"
                          type="button"
                        >
                          Connect Wallet
                        </button>
                      ) : (
                        <ConnectedNavBar />
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </nav>
  );
};

export default MobileNav;
