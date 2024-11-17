"use client";
import { CloseIcon, HamburgerIcon } from "@public/icons";
import { communityLinks, learningLinks } from "@static/index";
import { useState } from "react";
import { Anchor } from "./DropDown";

const SideNav = () => {
  const [openSideNav, setOpenSideNav] = useState(false);
  const openNav = () => {
    setOpenSideNav(true);
    document.body.style.overflow = "hidden";
  };
  const closeNav = () => {
    document.body.style.overflow = "auto";
    setOpenSideNav(false);
  };
  return (
    <>
      <button
        onClick={openNav}
        aria-label="open menu"
        className="text-3xl text-black lg:hidden"
      >
        <HamburgerIcon />
      </button>
      <div
        className={`fixed left-0 top-0 flex h-[100dvh] w-screen flex-col justify-between bg-white p-4 text-black transition-all duration-[.5s] ${openSideNav ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      >
        <div className="p-2">
          <button onClick={closeNav} className="mb-8 text-3xl">
            <CloseIcon />
          </button>
          <div>
            <p className="p-2 text-xl font-bold">Learn</p>
            <ul>
              {learningLinks.map((item, index) => {
                const { title, url } = item;
                return <Anchor key={index} url={url} title={title} />;
              })}
            </ul>
            <p className="p-2 text-xl font-bold">Community</p>
            <ul>
              {communityLinks.map((item, index) => {
                const { title, url } = item;
                return <Anchor key={index} url={url} title={title} />;
              })}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideNav;
