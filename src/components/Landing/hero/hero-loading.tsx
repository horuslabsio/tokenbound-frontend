import Image from "next/image";
import IMG_0 from "../../../../public/hero/low-0.png";
import IMG_1 from "../../../../public/hero/low-1.png";
import IMG_2 from "../../../../public/hero/low-2.png";
import IMG_3 from "../../../../public/hero/low-3.png";
import IMG_4 from "../../../../public/hero/low-4.png";
import IMG_5 from "../../../../public/hero/low-5.png";
import IMG_6 from "../../../../public/hero/low-6.png";
import IMG_8v2 from "../../../../public/hero/low-8v2.png";

export const HeroLoadingDesktop = () => {
  return (
    <div
      aria-hidden
      className="absolute bottom-0 hidden h-full w-full grid-cols-2 gap-4 md:grid lg:grid-cols-5 lg:gap-0"
    >
      <div className="relative mt-auto h-[75%] lg:col-span-2 2xl:ml-[30px] 2xl:max-w-[500px]">
        <div className="absolute left-12 top-4 h-[7.8rem] w-[7.8rem]">
          <Image src={IMG_0} alt="" />
        </div>
        <div className="absolute top-1/2 h-[7.8rem] w-[7.8rem] -translate-x-1/4 -translate-y-1/2">
          <Image src={IMG_1} alt="" />
        </div>
        <div className="absolute right-1/4 top-[7.8rem] h-[7.8rem] w-[7.8rem] -translate-x-1/4">
          <Image src={IMG_4} alt="" />
        </div>
        <div className="absolute right-1/4 top-2/3 h-[7.8rem] w-[7.8rem] -translate-y-1/2">
          <Image src={IMG_3} alt="" />
        </div>

        <div className="absolute bottom-12 left-12 h-[7.8rem] w-[7.8rem]">
          <Image src={IMG_5} alt="" />
        </div>
      </div>

      <div className="relative mt-auto hidden h-[50%] lg:block">
        <div className="absolute left-[10%] top-[30%] z-[1] h-[7.8rem] w-[7.8rem] -translate-x-1/2 -translate-y-1/2 opacity-0 2xl:left-0">
          <Image src={IMG_2} alt="" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[7.75rem] w-[6.1rem] -translate-x-1/2 -translate-y-1/2">
          <Image src={IMG_6} alt="" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[4.125rem] w-[19.6rem] -translate-x-1/2 -translate-y-1/2 scale-[.2] opacity-0">
          <Image src={IMG_8v2} alt="" />
        </div>
      </div>
      <div className="relative mt-auto h-[60%] opacity-0 transition-all lg:col-span-2"></div>
    </div>
  );
};
