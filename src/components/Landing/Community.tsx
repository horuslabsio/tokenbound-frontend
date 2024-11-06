import Image from "next/image";
import { Button } from "ui/button";
import COMM_IMG from "@public/hero/community.svg";
import { CalenderCheckedIcon, ClockIcon } from "@public/icons";
import IMG_0 from "../../../public/hero/0.svg";
import IMG_4 from "../../../public/hero/4.svg";
import IMG_5 from "../../../public/hero/5.svg";

const Community = () => {
  return (
    <section className="container mx-auto px-4 py-16 lg:p-16">
      <div className="mx-auto grid h-[18.75rem] w-full max-w-[64rem] grid-cols-2">
        <div className="gpa-4 flex w-[18rem] flex-col justify-between">
          <h2 className="w-[80%]">
            Join our
            <span className="text-gradient"> weekly </span>dev calls.
          </h2>
          <p>
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
          <Image src={COMM_IMG} alt="our community" />
        </div>
      </div>

      <div className="relative mt-16 flex h-[40rem] w-full flex-col items-center justify-center">
        <div className="relative z-10 flex w-full max-w-[32rem] flex-col items-center justify-center gap-4">
          <h2 className="text-center text-7xl">
            Ready to do{" "}
            <span className="font-instrument-serif text-[#f08278]">more</span>{" "}
            with NFTs?
          </h2>
          <p>
            Whether you`&apos;re a developer looking to build cutting-edge
            applications or an enthusiast exploring the potential of digital
            assets, we&apos;ve got you.
          </p>
          <Button size={"sm"}>Get Started</Button>
        </div>
        <div aria-hidden className="absolute h-full w-[32rem]">
          <div className="absolute bottom-1/4 right-0 top-1/4 h-[7.8rem] w-[7.8rem] translate-x-[200%]">
            <Image src={IMG_4} alt="" />
          </div>
          <div className="absolute -left-3/4 top-[5%] h-[7.8rem] w-[7.8rem] translate-x-1/2">
            <Image src={IMG_0} alt="" />
          </div>
          <div className="absolute bottom-12 left-0 h-[7.8rem] w-[7.8rem] -translate-x-full">
            <Image src={IMG_5} alt="" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Community;
