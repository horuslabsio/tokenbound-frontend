"use client";
import Image from "next/image";
import React from "react";
import STBA from "@public/starknet.jpeg";
import { communityLinks } from "@static/index";
import ConnectedNavBar from "@components/Connected";
import { RxHamburgerMenu } from "react-icons/rx";
import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ConnectWallet from "@components/ConnectWallet/page";
import { useAccount } from "@starknet-react/core";
import Link from "next/link";
import DownChevronIcon from "svg/DownChevronIcon";
import SearchIcon from "svg/SearchIcon";

function NavBar() {
  const { account } = useAccount();
  // state for hamburger modal
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  // state for connectwallet component
  let [isWalletOpen, setIsWalletOpen] = useState(false);

  function closeWalletModal() {
    setIsWalletOpen(false);
  }

  function openWalletModal() {
    setIsWalletOpen(true);
  }
  return (
    <header className="fixed z-[99] w-screen px-8 py-2 flex items-center justify-between  bg-white">
      <div className=" basis-1/2  flex items-center gap-40">
        {/* HOVER ANIMATIONS */}
        <Link className="" href={"/"}>
          <Image
            src={"/logo.svg"}
            alt="starknet logo"
            width={200}
            height={46}
          />
        </Link>
        <div className="hidden lg:flex gap-8">
          <button className="flex gap-1">
            <span>Learn</span>
            <span className="self-end">
              <DownChevronIcon />
            </span>
          </button>
          <button className="hidden lg:flex items-center">
            <span>Community</span>
            <span className="self-end">
              <DownChevronIcon />
            </span>
          </button>
        </div>
      </div>

      <nav className="hidden md:hidden lg:flex items-center space-x-8">
        {/* <ul className="flex items-center md:space-x-4 lg:space-x-8">
          {navItems.map((item, idx) => (
            <li key={idx}>
              <a
                className="text-blue-500 hover:text-blue-700"
                target="_blank"
                rel="noopener noreferrer"
                href={item.link}
              >
                {item.value}
              </a>
            </li>
          ))}
        </ul> */}
        <div className="relative w-[14rem]">
          <input
            className="bg-off-white py-3 px-16  w-full h-full rounded-[8px]"
            role="search"
            type="text"
            name="search"
            id="search"
            placeholder="Search NFTs"
          />
          <span
            style={{
              top: "calc(50% - 2em /2)",
            }}
            className="absolute px-4 text-gray-500  left-0"
          >
            <SearchIcon />
          </span>
        </div>
        {isWalletOpen && (
          <ConnectWallet
            isWalletOpen={isWalletOpen}
            closeWalletModal={closeWalletModal}
            openWalletModal={openWalletModal}
          />
        )}

        {!account ? (
          <button
            onClick={openWalletModal}
            className=" w-[14rem] p-3   bg-deep-blue rounded-[8px] text-white"
            type="button"
          >
            Connect Wallet
          </button>
        ) : (
          <ConnectedNavBar />
        )}
      </nav>

      {/* mobile navbar */}
      <div className="block md:flex lg:hidden">
        <RxHamburgerMenu size={40} onClick={openModal} />

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
                          {communityLinks.map((item, idx) => (
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
      </div>
    </header>
  );
}

export default NavBar;
