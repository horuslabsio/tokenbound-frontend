"use client";
import { GithubIcon, SendIcon, TwitterIcon } from "@public/icons/icon";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "ui/button";

const Footer = () => {
  const [year, setYear] = useState<number>(2024);
  useEffect(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    setYear(currentYear);
  }, []);

  return (
    <footer className="flex flex-col justify-end gap-16 bg-off-white px-8 pb-8 pt-16 text-[#7A7A7A]">
      <div className="container mx-auto flex flex-col justify-center gap-8 lg:flex-row">
        <div className="flex basis-1/2 flex-col gap-4">
          <p>Powered by</p>
          <div className="flex w-[60%] items-center md:w-[40%] lg:w-[60%]">
            <Link className="inline-block w-full" href={"/"}>
              <Image
                src={"/logo-02.svg"}
                alt="starknet logo"
                width={200}
                height={46}
              />
            </Link>
          </div>
          <div className="mt-8 flex flex-col gap-6 md:flex-row md:items-center">
            <input
              className="h-[3rem] w-[90%] rounded-[8px] border-[1px] border-solid border-[#7A7A7A] bg-[#EFEFEF] p-4 placeholder:text-[.9em] md:w-[60%] lg:w-[40%]"
              type="email"
              placeholder="Email Address"
            />
            <Button>Get Updates</Button>
          </div>
        </div>

        <ul className="flex flex-col gap-8 lg:mt-20">
          <li>
            <a
              href="https://github.com/Starknet-Africa-Edu"
              target="_blank"
              rel="noopener noreferrer"
            >
              Github
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Starknet-Africa-Edu/SNIPs/blob/main/SNIPS/snip-72.md"
              target="_blank"
              rel="noopener noreferrer"
            >
              Snips
            </a>
          </li>
          <li>
            <a
              href="https://tokenbound.gitbook.io/starknet-tokenbound/"
              target="_blank"
              rel="noopener noreferrer"
            >
              SDK
            </a>
          </li>
          <li>
            <a href="http://" target="_blank" rel="noopener noreferrer">
              ERC-6551
            </a>
          </li>
        </ul>
        <div className="flex flex-col gap-4 lg:mt-20">
          <h6 className="lg:text-[1em]">Discussions</h6>
          <ul className="flex gap-4">
            <li
              style={{
                boxShadow:
                  "0 0 2px 0 #c3c0c0, inset 0 0 2px 0 rgba(85, 85, 85, 0.2)",
              }}
              className="flex place-content-center rounded-lg bg-white p-2"
            >
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <TwitterIcon />
              </a>
            </li>
            <li
              style={{
                boxShadow:
                  "0 0 2px 0 #c3c0c0, inset 0 0 2px 0 rgba(85, 85, 85, 0.2)",
              }}
              className="flex place-content-center rounded-lg bg-white p-2"
            >
              <a
                href="https://github.com/Starknet-Africa-Edu"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GithubIcon />
              </a>
            </li>
            <li
              style={{
                boxShadow:
                  "0 0 2px 0 #c3c0c0, inset 0 0 2px 0 rgba(85, 85, 85, 0.2)",
              }}
              className="flex place-content-center rounded-lg bg-white p-2"
            >
              <a
                className="inline-block -rotate-[35deg]"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                <SendIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center">
        <p>&copy; {year} StarknetAfrica. All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
