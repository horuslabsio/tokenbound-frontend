import Image from "next/image";
import IMG_2 from "../../../../public/hero/2.svg";
import IMG_3 from "../../../../public/hero/3.svg";
import IMG_4 from "../../../../public/hero/4.svg";
import IMG_7 from "../../../../public/hero/7.svg";
import IMG_8 from "../../../../public/hero/8v2.svg";
import IMG_9 from "../../../../public/hero/9v2.svg";

const MobileBgImage = () => {
  return (
    <div className="mb- h-[60vh] max-h-[25rem] w-full max-w-[30rem] overflow-hidden md:hidden">
      <div className="relative mx-auto h-full w-[6rem]">
        <div className="rounded-[10px absolute h-[6.1rem] w-[6.4rem] -translate-x-1/2">
          <Image
            src={IMG_3}
            className="h-full w-full scale-105 bg-cover"
            alt=""
          />
          <div className="absolute left-1/2 top-1/2 h-[3.6rem] w-[17.4rem] -translate-x-1/2 -translate-y-1/2 rounded-full">
            <Image
              src={IMG_7}
              className="h-full w-full scale-105 bg-cover"
              alt=""
            />
          </div>
        </div>
        <div className="absolute top-1/2 h-[6.1rem] w-[6.4rem] -translate-y-1/2 translate-x-3/4 rounded-[10px]">
          <Image
            src={IMG_4}
            className="h-full w-full scale-105 bg-cover"
            alt=""
          />
          <div className="absolute left-1/2 top-1/2 h-[3.6rem] w-[17.4rem] -translate-x-1/2 -translate-y-1/2 rounded-full">
            <Image
              src={IMG_9}
              className="h-full w-full scale-105 bg-cover"
              alt=""
            />
          </div>
        </div>
        <div className="absolute bottom-0 h-[6.1rem] w-[6.4rem] rounded-[10px]">
          <Image
            src={IMG_2}
            className="h-full w-full scale-105 bg-cover"
            alt=""
          />
          <div className="absolute left-1/2 top-1/2 h-[3.6rem] w-[17.4rem] -translate-x-1/2 -translate-y-1/2 rounded-full">
            <Image
              src={IMG_8}
              className="h-full w-full scale-105 bg-cover"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileBgImage;
