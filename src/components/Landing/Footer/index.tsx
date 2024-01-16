import React from "react"
import Image from "next/image"
import STBA from "@public/starknet.jpeg"
import { navItems } from "@static/index";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t-2 p-3 md:p-0 lg:p-0 border-gray-300">
      <section className="max-width">
        <div className="flex items-center space-x-2">
          <Image
            className="cursor-pointer transition-transform transform-growth hover:scale-110"
            src={STBA}
            width={30}
            height={30}
            alt="starknet-token-bound"
          />

          <h4>StarknetAfrica | TokenBound</h4>
        </div>
        <ul  className="flex items-center mt-6 space-x-6 mt-6   mb-4 md:mb-0">
          {navItems.map((item, idx) => (
              <li key={idx}>
                <a className="text-blue-500 hover:text-blue-700" target="_blank" rel="noopener noreferrer" href={item.link}>
                  {item.value}
                </a>
              </li>
          ))}
          </ul>
        {/* </div> */}


        <p className="text-center font-bold mt-4">&copy; {currentYear} StarknetAfrica. All rights reserved.</p>
      </section>
    </footer>
  );
}

export default Footer;
