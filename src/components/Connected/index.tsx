"use client";
import React, { Fragment, useState } from "react";
import { shortenAddress } from "@utils/helper";
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
    <div className="flex flex-col gap-4 md:items-center md:flex-row">
      <div
        onClick={closeModal}
        className="bg-gray-200 cursor-pointer xsm:w-[90%] w-[10rem]  p-4  border-solid border-[1px] border-[#C4C4C4] rounded-full lg:my-0 lg:mx-auto"
      >
        <p className="text-center">{shortenAddress(address as any)}</p>
      </div>

      <Transition appear show={show} as={Fragment}>
        <Dialog as="div" className="relative z-[999]" onClose={closeModal}>
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
            <div className="flex bg-[#0a0a0a30] min-h-full  justify-end p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel
                  style={{
                    boxShadow: "0 0 50px 0 #EC796B33",
                  }}
                  className="rounded-[20px] overflow-hidden mt-20  bg-[#fAFAFA] p-10 lg:w-[30rem] h-[33rem]"
                >
                  <Disconnect closeModal={closeModal} />
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
