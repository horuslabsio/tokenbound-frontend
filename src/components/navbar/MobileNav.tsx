import { communityLinks, learningLinks } from "@static/index";
import ConnectedNavBar from "@components/Connected";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import { AccountInterface } from "starknet";
import { Anchor } from "./DropDown";
import NetworkSwitcher from "@components/NetworkSwitcher";
const MobileNav = ({
  account,
  openWalletModal,
}: {
  openWalletModal(): void;
  account: AccountInterface | undefined;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  function closeMenu() {
    setIsOpen(false);
  }

  function openMenu() {
    setIsOpen(true);
  }

  return (
    <nav className="block lg:hidden">
      <button
        title="toggle menu"
        onClick={openMenu}
        className="flex flex-col gap-2"
      >
        <div
          className={`h-[2px] w-[2em] rounded-full bg-[#393838] transition-all duration-300 ease-in-out ${
            isOpen ? "translate-y-[.5em] rotate-45" : "transform-none"
          } `}
        ></div>
        <div
          className={`h-[2px] w-[2em] rounded-full bg-[#393838] transition-all duration-300 ease-in-out ${
            isOpen ? "translate-y-[-.2em] rotate-[-45deg]" : "transform-none"
          } `}
        ></div>
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 block lg:hidden"
          onClose={closeMenu}
        >
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
            <div className="items-center justify-center text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full transform overflow-hidden rounded-sm bg-white p-3 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="flex justify-end text-lg font-medium leading-6 text-gray-900"
                  >
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-blue-900"
                      onClick={closeMenu}
                    >
                      <div
                        className={`h-[2px] w-[2em] rounded-full bg-[#393838] transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "translate-y-[.5em] rotate-45"
                            : "transform-none"
                        } `}
                      ></div>
                      <div
                        className={`h-[2px] w-[2em] rounded-full bg-[#393838] transition-all duration-300 ease-in-out ${
                          isOpen
                            ? "translate-y-[-.2em] rotate-[-45deg]"
                            : "transform-none"
                        } `}
                      ></div>
                    </button>
                  </Dialog.Title>

                  <div className="mt-8 flex flex-col gap-8 p-4">
                    <nav>
                      <ul className="md:none lg:none flex flex-wrap items-center gap-6">
                        {learningLinks.map((item, idx) => (
                          <Anchor
                            key={idx}
                            url={item.url}
                            src="/blockchain-05.svg"
                            title={item.title}
                          />
                        ))}
                        {communityLinks.map((item, idx) => (
                          <Anchor
                            key={idx}
                            url={item.url}
                            src="/blockchain-05.svg"
                            title={item.title}
                          />
                        ))}
                      </ul>
                    </nav>
                    <NetworkSwitcher />
                    <div>
                      {!account ? (
                        <button
                          onClick={openWalletModal}
                          className="w-[14rem] rounded-lg bg-deep-blue px-4 py-4 text-white xsm:w-[90%]"
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
