"use client";
import { GithubIcon, SendIcon, XIcon } from "@public/icons";
import Image from "next/image";
import Link from "next/link";
import LOGO from "../../../public/logo.svg";

import { useEffect, useState } from "react";
import { Button } from "ui/button";

const Footer = () => {
  const [year, setYear] = useState<number>(2024);
  useEffect(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    setYear(currentYear);
  }, []);

  return (
    <footer className="container mx-auto p-8">
      <div className="dash-border-gradient relative flex items-center justify-between pb-4 before:bottom-0">
        <div className="flex w-[30rem] flex-col gap-4">
          <Link className="block w-[9rem]" href={"/"}>
            <Image src={LOGO} alt="horus labs logo" />
          </Link>
          <p>
            We’re a blockchain research and development lab, powered by Starknet
            Africa.
          </p>
        </div>
        <div className="flex w-full max-w-[25rem] flex-col gap-4">
          <p>
            Be the first to hear about job openings, product updates and
            announcements
          </p>
          <div className="flex items-center gap-2 rounded-[8px] bg-[#F8F8F8] p-1">
            <input
              className="flex-1 rounded-lg bg-transparent p-2 placeholder:text-base"
              placeholder="Enter your e-mail"
              type="text"
            />
            <Button size={"sm"}>Submit</Button>
          </div>
        </div>
      </div>
      <div className="pt-4">
        <p>(c) {year} Horus Labs. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
