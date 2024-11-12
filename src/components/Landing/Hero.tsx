import { UpRightArrowIcon } from "@public/icons";
import { Button } from "ui/button";
import dynamic from "next/dynamic";
import LowResHeroImages from "./LowResHeroImages";
import MobileBgImage from "./ui/mobile-bg-image";
const HeroImages = dynamic(() => import("./HeroImages"), {
  ssr: false,
  loading: () => <LowResHeroImages />,
});

const Hero = () => {
  return (
    <section className="relative mx-auto flex max-h-[1080px] w-full max-w-[1536px] flex-col items-center justify-center overflow-hidden text-center md:h-screen md:flex-row md:items-start">
      <MobileBgImage />
      <div className="relative z-[1] mt-16 flex max-w-[28.5rem] flex-col gap-8 px-4 md:mt-0">
        <h1 className="font-inter-variable">
          Transform <span className="text-gradient">any</span> NFT to a{" "}
          <span className="font-instrument-serif">wallet</span>
        </h1>
        <p>
          A ”Token Bound Account” is a smart contract account, controlled by an
          NFT. It can do everything a normal wallet can do and is compatible
          with every NFT you already own.
        </p>
        <div className="mx-auto flex w-fit flex-wrap justify-center gap-4">
          <Button
            asChild
            className="bg-gray-50 text-black"
            endIcon={<UpRightArrowIcon />}
          >
            <a
              href="https://docs.tbaexplorer.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read Documentation
            </a>
          </Button>

          <Button>
            <a href="#projects">Showcase</a>
          </Button>
        </div>
      </div>

      <HeroImages />
    </section>
  );
};

export default Hero;
