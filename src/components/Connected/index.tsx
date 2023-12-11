"use client";
import React, { Fragment, useState } from "react";
import { shortenAddress } from "../../../utils/helper";
import Link from "next/link";
import { useAccount } from "@starknet-react/core";
import { Transition, Dialog } from "@headlessui/react";
import Disconnect from "../Disconnect/page";
import { usePathname } from "next/navigation";

function ConnectedNavBar() {
  const { address, account } = useAccount();
  const [show, setShow] = useState<boolean>(false);
  const path = usePathname();
  const closeModal = () => {
    setShow(!show);
  };
  return (
    <div className="flex space-x-4 items-center">
      <div
        onClick={closeModal}
        className="bg-gray-200 cursor-pointer px-2 py-2 rounded-lg"
      >
        <h5>{shortenAddress(address as any)}</h5>
      </div>
      <div>
        {account && path == '/' && (
          <Link href={`/wallet/${address}`}>
            <button
              className="bg-black text-white px-4 py-2 rounded-lg"
              type="button"
            >
              My NFTs &rarr;
            </button>
          </Link>
        )}
      </div>

      <Transition appear show={show} as={Fragment}>
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
            <div className="fixed inset-0 bg-white bg-opacity-25" />
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-[#010A20] outline outline-offset-2 outline-1 outline-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-400"
                  >
                    Disconnect
                  </Dialog.Title>

                  <Disconnect />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
}

export default ConnectedNavBar;
