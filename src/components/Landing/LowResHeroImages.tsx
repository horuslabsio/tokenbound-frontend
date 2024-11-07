import Image from "next/image";
import IMG_0 from "../../../public/hero/0.png";
import IMG_1 from "../../../public/hero/1.png";
import IMG_2 from "../../../public/hero/2.png";
import IMG_3 from "../../../public/hero/3.png";
import IMG_4 from "../../../public/hero/4.png";
import IMG_5 from "../../../public/hero/5.png";
import IMG_6 from "../../../public/hero/6.png";
import IMG_7 from "../../../public/hero/7.png";
import IMG_8 from "../../../public/hero/8.png";
import IMG_9 from "../../../public/hero/9.png";

const LowResHeroImages = () => {
  return (
    <div
      aria-hidden
      className="absolute grid h-[calc(100%-8rem)] w-full grid-cols-3"
    >
      <div className="relative mt-auto h-[75%] max-w-[400px]">
        <div className="absolute left-12 top-4 h-[7.8rem] w-[7.8rem]">
          <Image src={IMG_0} alt="" />
        </div>
        <div className="absolute top-1/2 h-[7.8rem] w-[7.8rem] -translate-y-1/2">
          <Image src={IMG_1} alt="" />
        </div>
        <div className="absolute right-1/4 top-[7.8rem] h-[7.8rem] w-[7.8rem] -translate-x-1/4">
          <Image src={IMG_2} alt="" />
        </div>
        <div className="absolute right-1/4 top-2/3 h-[7.8rem] w-[7.8rem] -translate-y-1/2">
          <Image src={IMG_3} alt="" />
        </div>
        <div className="absolute -right-[1.95rem] bottom-1/4 top-1/2 h-[7.8rem] w-[7.8rem] -translate-y-1/4">
          <Image src={IMG_4} alt="" />
        </div>

        <div className="absolute bottom-12 left-12 h-[7.8rem] w-[7.8rem]">
          <Image src={IMG_5} alt="" />
        </div>
      </div>
      <div className="relative mt-auto h-[50%]">
        <div className="absolute left-1/2 top-1/2 h-[7.75rem] w-[6.1rem] -translate-x-1/2 -translate-y-1/2">
          <Image src={IMG_6} alt="" />
        </div>
      </div>
      <div className="relative mt-auto h-[60%]">
        <div className="absolute left-1/2 h-[4.125rem] w-[19.6rem] -translate-x-1/2">
          <Image src={IMG_7} alt="" />
        </div>
        <div className="absolute left-0 top-1/2 h-[4.125rem] w-[19.6rem] -translate-y-1/2">
          <Image src={IMG_8} alt="" />
        </div>
        <div className="absolute bottom-16 right-0 h-[4.125rem] w-[19.6rem]">
          <Image src={IMG_9} alt="" />
        </div>
      </div>
    </div>
  );
};

export default LowResHeroImages;