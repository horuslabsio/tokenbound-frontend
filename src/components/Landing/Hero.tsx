import Image from "next/image";
import HERO_IMG_1 from "@public/hero-1.png";
import HERO_IMG_2 from "@public/hero-2.png";
import HERO_IMG_3 from "@public/hero-3.png";
import HERO_IMG_4 from "@public/hero-4.png";

import Link from "next/link";

const Hero = () => {
  return (
    <section>
      <div className="container mx-auto p-4">
        <h1 className="mx-auto my-0 bg-gradient-linear-starknet-gradient bg-clip-text text-center text-transparent lg:w-[40%] lg:p-10">
          Transforming any NFT to a Wallet
        </h1>
        <p className="mx-auto my-0 text-center lg:w-[35%] lg:px-10 lg:text-justify">
          A &#8221;Token Bound Account&#8221; is a smart contract account,
          controlled by an NFT. It can do everything a normal wallet can do and
          is compatible with every NFT you already own.
        </p>
        <Link
          className="mx-auto mt-4 flex h-[3rem] w-[14rem] items-center justify-center rounded-[8px] bg-deep-blue p-2 text-white xsm:w-[90%]"
          href={"https://tokenbound.gitbook.io/starknet-tokenbound/"}
        >
          <span>Visit Documentation</span>
        </Link>
      </div>

      <div
        aria-hidden={true}
        className="relative mx-auto h-[200px] w-screen max-w-[2000px] overflow-hidden md:h-[400px]"
      >
        <div className="absolute left-1/2 top-[-50px] z-[3] h-[100px] w-[110%] -translate-x-1/2 rounded-[50%] bg-[#fafafa] md:top-[-120px] md:h-[200px]"></div>
        <div className="custom-shape grid h-full w-full grid-cols-4 gap-4">
          <div className="h-[200px] md:h-[400px]">
            <Image src={HERO_IMG_1} alt="img" className="h-full w-full" />
          </div>
          <div className="h-[200px] md:h-[400px]">
            <Image
              src={HERO_IMG_2}
              alt="img"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-[200px] md:h-[400px]">
            <Image
              src={HERO_IMG_3}
              alt="img"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-[200px] md:h-[400px]">
            <Image src={HERO_IMG_4} alt="img" className="h-full w-full" />
          </div>
        </div>
        <div className="absolute bottom-[-50px] left-1/2 z-[3] h-[100px] w-[110%] -translate-x-1/2 rounded-[50%] bg-[#fafafa] md:bottom-[-120px] md:h-[200px]"></div>
      </div>
    </section>
  );
};

export default Hero;
