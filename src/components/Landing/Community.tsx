import Image from "next/image";
import { Button } from "ui/button";
import COMM_IMG from "@public/hero/community.svg";
import { CalenderCheckedIcon, ClockIcon } from "@public/icons";
import IMG_0 from "../../../public/hero/0.svg";
import IMG_4 from "../../../public/hero/4.svg";
import IMG_5 from "../../../public/hero/5.svg";

const Community = () => {
  return (
    <section className="container mx-auto py-8 lg:p-16">
      <div className="mx-auto flex w-full max-w-[35rem] flex-col-reverse gap-8 px-8 md:grid md:h-[18.75rem] md:max-w-[64rem] md:grid-cols-2 md:gap-0">
        <div className="flex w-[18rem] flex-col justify-between gap-4">
          <h2 className="hidden w-[80%] md:block">
            Join our
            <span className="text-gradient"> weekly </span>dev calls.
          </h2>
          <p className="hidden md:block">
            Learn more about Starknet Tokenbound with the builders and
            contributors on Telegram.
          </p>
          <div className="flex flex-col gap-2">
            <p className="flex items-center gap-2">
              <span className="text-[1.5em] text-foreground-tertiary">
                <CalenderCheckedIcon />
              </span>

              <span>Saturday, every two weeks.</span>
            </p>
            <p className="flex items-center gap-2">
              <span className="text-xl text-foreground-tertiary">
                <ClockIcon />
              </span>

              <span>6PM [GMT +1]</span>
            </p>
          </div>
          <Button asChild className="w-[70%]" size={"sm"}>
            <a href="https://t.me/starknet_tokenbound">
              Join Telegram Community
            </a>
          </Button>
        </div>

        <div>
          <div className="mb-8 text-center md:hidden">
            <h2 className="mx-auto w-[11.4rem]">
              Join our
              <span className="text-gradient"> weekly </span>dev calls.
            </h2>
            <p>
              Learn more about Starknet Tokenbound with the builders and
              contributors on Telegram.
            </p>
          </div>
          <Image src={COMM_IMG} alt="our community" />
        </div>
      </div>

      <div className="relative mt-16 flex h-[40rem] w-full flex-col items-center justify-center overflow-hidden md:overflow-visible">
        <div className="relative z-10 flex w-full flex-col items-center justify-center gap-4 md:max-w-[32rem]">
          <h2 className="max-w-[16rem] text-center text-4xl md:max-w-none md:text-7xl">
            Ready to do{" "}
            <span className="font-instrument-serif text-[#f08278]">more</span>{" "}
            with NFTs?
          </h2>
          <p className="max-w-[25rem] text-center md:max-w-none md:text-start">
            Whether you`&apos;re a developer looking to build cutting-edge
            applications or an enthusiast exploring the potential of digital
            assets, we&apos;ve got you.
          </p>
          <Button size={"sm"}>Get Started</Button>
        </div>
        <div
          aria-hidden
          className="absolute h-[18rem] w-[18rem] md:h-full md:w-[32rem]"
        >
          <div className="absolute -top-[15%] bottom-1/4 right-0 h-[7.8rem] w-[7.8rem] translate-x-full md:right-0 md:top-1/4 lg:translate-x-[200%]">
            <Image src={IMG_4} alt="" />
          </div>
          <div className="absolute left-0 top-0 h-[7.8rem] w-[7.8rem] -translate-x-3/4 -translate-y-1/2 md:left-0 md:top-[5%] md:-translate-x-[130%] md:translate-y-0 lg:-left-3/4 lg:translate-x-1/2">
            <Image src={IMG_0} alt="" />
          </div>
          <div className="absolute -bottom-8 left-0 h-[7.8rem] w-[7.8rem] -translate-x-1/4 translate-y-3/4 md:bottom-12 md:-translate-x-full md:translate-y-0">
            <Image src={IMG_5} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
