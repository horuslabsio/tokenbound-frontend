import { Transition, Dialog } from "@headlessui/react";
import { Fragment, ReactNode } from "react";

type ModalProps = {
  children: ReactNode;
  closeModal: () => void;
  openModal: boolean;
  type: string;
};
export const Modal = ({
  children,
  closeModal,
  openModal,
  type,
}: ModalProps) => {
  return (
    <Transition appear show={openModal} as={Fragment}>
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
          <div className="flex min-h-full items-center justify-center bg-[#0a0a0a30] p-4">
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
                className={`bg-primary mt-20 w-[90%] overflow-hidden rounded-[20px] p-10 md:w-[50%] lg:w-[30rem] ${type === "erc20" ? `min-h-[30rem]` : type === "nft" ? `min-h-[2rem]` : ""} text-deep-blue`}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
