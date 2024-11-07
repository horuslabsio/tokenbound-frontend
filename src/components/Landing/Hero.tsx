import { UpRightArrowIcon } from "@public/icons";
import { Button } from "ui/button";
import dynamic from "next/dynamic";
import LowResHeroImages from "./LowResHeroImages";
const HeroImages = dynamic(() => import("./HeroImages"), {
  ssr: false,
  loading: () => <LowResHeroImages />,
});

const Hero = () => {
  return (
    <section className="relative mx-auto flex h-screen max-h-[1080px] w-screen max-w-[1536px] justify-center overflow-hidden text-center">
      <div className="relative z-[1] flex w-[28.5rem] flex-col gap-8">
        <h1 className="font-inter-variable">
          Transform <span className="text-gradient">any</span> NFT to a{" "}
          <span className="font-instrument-serif">wallet</span>
        </h1>
        <p>
          A ”Token Bound Account” is a smart contract account, controlled by an
          NFT. It can do everything a normal wallet can do and is compatible
          with every NFT you already own.
        </p>
        <div className="flex gap-4">
          <Button
            asChild
            className="bg-gray-50 text-foreground-secondary"
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
          <a href="#community">aa</a>
          <Button asChild>Showcase</Button>
        </div>
      </div>
      <HeroImages />
    </section>
  );
};

export default Hero;
