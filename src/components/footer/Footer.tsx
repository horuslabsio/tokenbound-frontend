"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import GithubIcon from "svg/GithubIcon";
import SendIcon from "svg/SendIcon";
import XIcon from "svg/XIcon";

const Footer = () => {
  const [year, setYear] = useState<number>(2024);
  useEffect(() => {
    const date = new Date();
    const currentYear = date.getFullYear();
    setYear(currentYear);
  }, []);

  return (
    <footer className="bg-off-white text-[#7A7A7A] min-h-[50vh] flex justify-center flex-col gap-16 px-8 pt-16 pb-8">
      <div className="flex flex-col  justify-center gap-8 lg:flex-row">
        <div className="basis-1/2 flex flex-col gap-4">
          <p>Powered by</p>
          <div className="flex items-center w-[60%] md:w-[40%] lg:w-[60%]">
            <Link className=" inline-block w-full" href={"/"}>
              <Image
                src={"/logo-02.svg"}
                alt="starknet logo"
                width={200}
                height={46}
              />
            </Link>
          </div>
          <div className="flex flex-col  mt-8 gap-6 md:items-center md:flex-row">
            <input
              className=" p-4 bg-[#EFEFEF] w-[90%]  border-solid border-[1px] rounded-[8px] border-[#7A7A7A] md:w-[60%] lg:w-[40%]"
              type="email"
              placeholder="Email Address"
            />
            <button className=" w-[10rem] p-4 bg-deep-blue rounded-[8px] text-white">
              Get Updates
            </button>
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
          <h6 className=" lg:text-[1em]">Discussions</h6>
          <ul className="flex gap-4">
            <li
              style={{
                boxShadow:
                  "0 0 2px 0 #c3c0c0, inset 0 0 2px 0 rgba(85, 85, 85, 0.2)",
              }}
              className="bg-white p-2 rounded-lg flex place-content-center"
            >
              <a href="http://" target="_blank" rel="noopener noreferrer">
                <XIcon />
              </a>
            </li>
            <li
              style={{
                boxShadow:
                  "0 0 2px 0 #c3c0c0, inset 0 0 2px 0 rgba(85, 85, 85, 0.2)",
              }}
              className="bg-white p-2 rounded-lg flex place-content-center"
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
              className="bg-white p-2 rounded-lg flex place-content-center"
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
