import React from "react"
import Image from "next/image"
import STBA from "@public/starknet.jpeg"
import { navItems } from "@static/index";

function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="border-t-2 border-gray-300">
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
        <div className='flex items-center space-x-8 mt-12'>
          {
            navItems.map((item, idx) => (
              <ul key={idx}>
                <a href={item.link}><li>{item.value}</li></a>
              </ul>
            ))
          }
        </div>

        <p className="text-center font-bold mt-4">&copy; {currentYear} StarknetAfrica. All rights reserved.</p>
      </section>
    </footer>
  );
}

export default Footer;
