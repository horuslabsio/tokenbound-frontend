"use client";
import Image from "next/image";
import IMG_0 from "../../../public/hero/0.svg";
import IMG_1 from "../../../public/hero/1.svg";
import IMG_2 from "../../../public/hero/2.svg";
import IMG_3 from "../../../public/hero/3.svg";
import IMG_4 from "../../../public/hero/4.svg";
import IMG_5 from "../../../public/hero/5.svg";
import IMG_6 from "../../../public/hero/6.svg";
import IMG_7 from "../../../public/hero/7.svg";
import IMG_8 from "../../../public/hero/8.svg";
import IMG_9 from "../../../public/hero/9.svg";
import IMG_8v2 from "../../../public/hero/8v2.svg";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const HeroImages = () => {
  const parentRef = useRef<HTMLDivElement | null>(null);
  const boxRef = useRef<HTMLDivElement | null>(null);
  const tbaParentRef = useRef<HTMLDivElement | null>(null);
  const tbaRef = useRef<HTMLDivElement | null>(null);

  const box0Ref = useRef<HTMLDivElement | null>(null);
  const box1Ref = useRef<HTMLDivElement | null>(null);
  const box2Ref = useRef<HTMLDivElement | null>(null);
  const box3Ref = useRef<HTMLDivElement | null>(null);
  const box4Ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timeline = gsap.timeline();
    timeline
      .to(parentRef.current, { opacity: 1, duration: 1 })
      .to(boxRef.current, {
        left: "50%",
        top: "50%",
        scale: 0.5,
        duration: 3,
      })
      .to(
        box0Ref.current,
        {
          top: "10%",
          left: "12.5%",
          duration: 2,
        },
        "-=3",
      )
      .to(
        box1Ref.current,
        {
          top: "55%",
          duration: 2,
        },
        "-=3",
      )
      .to(
        box2Ref.current,
        {
          top: "7.8rem",
          right: "15%",
          translateX: "0%",
          translateY: "25%",
          duration: 3,
        },
        "-=3",
      )
      .to(
        box3Ref.current,
        {
          top: "60%",
          right: "20%",
          duration: 3,
        },
        "-=3",
      )
      .to(
        box4Ref.current,
        {
          bottom: "5rem",
          left: "5rem",
          duration: 2,
        },
        "-=3",
      )
      .to(boxRef.current, { opacity: 0, duration: 1 })
      .to(tbaRef.current, { opacity: 1, scale: 1, duration: 1 })
      .to(tbaParentRef.current, { opacity: 1, duration: 1 })
      .to(tbaRef.current, { opacity: 0, duration: 1 });
  }, []);

  return (
    <div
      ref={parentRef}
      aria-hidden
      className="absolute hidden h-[calc(100%-8rem)] w-full grid-cols-2 gap-4 opacity-0 md:grid lg:grid-cols-3 lg:gap-0"
    >
      <div className="relative mt-auto h-[75%] w-[50vw] max-w-[400px] 2xl:max-w-[500px]">
        <div
          ref={box0Ref}
          className="absolute left-12 top-4 h-[7.8rem] w-[7.8rem]"
        >
          {/* initial: absolute left-12 top-4 h-[7.8rem] w-[7.8rem]*/}
          <Image src={IMG_0} alt="" />
        </div>
        <div
          ref={box1Ref}
          className="absolute top-1/2 h-[7.8rem] w-[7.8rem] -translate-x-1/4 -translate-y-1/2"
        >
          {/* initial: absolute top-1/2 h-[7.8rem] w-[7.8rem] -translate-x-1/4 -translate-y-1/2 */}
          <Image src={IMG_1} alt="" />
        </div>
        <div
          ref={box2Ref}
          className="absolute right-1/4 top-[7.8rem] h-[7.8rem] w-[7.8rem] -translate-x-1/4"
        >
          {/* initial: absolute right-1/4 top-[7.8rem] h-[7.8rem] w-[7.8rem] -translate-x-1/4 */}
          <Image src={IMG_4} alt="" />
        </div>
        <div
          ref={box3Ref}
          className="absolute right-1/4 top-2/3 h-[7.8rem] w-[7.8rem] -translate-y-1/2"
        >
          {/* finally: absolute left-1/2 top-1/2 z-[1] h-[7.8rem] w-[7.8rem] -translate-x-1/2 -translate-y-1/2 scale-50 */}
          {/* initial: absolute right-1/4 top-2/3 h-[7.8rem] w-[7.8rem] -translate-y-1/2  */}
          <Image src={IMG_3} alt="" />
        </div>

        {/* <div className="absolute -right-[1.95rem] bottom-1/4 top-1/2 h-[7.8rem] w-[7.8rem] -translate-y-1/4 translate-x-full">
          <Image src={IMG_2} alt="" />
        </div> */}

        <div
          ref={box4Ref}
          className="absolute bottom-12 left-12 h-[7.8rem] w-[7.8rem]"
        >
          {/* initial:absolute bottom-12 left-12 h-[7.8rem] w-[7.8rem] */}
          <Image src={IMG_5} alt="" />
        </div>
      </div>

      <div className="relative mt-auto hidden h-[50%] lg:block">
        {/* finally: absolute left-1/2 top-1/2 z-[1] h-[7.8rem] w-[7.8rem] -translate-x-1/2 -translate-y-1/2 scale-50 */}
        {/* initial: absolute left-[10%] top-[30%] z-[1] h-[7.8rem] w-[7.8rem] -translate-x-1/2 -translate-y-1/2 2xl:left-0 */}
        <div
          ref={boxRef}
          className="absolute left-[10%] top-[30%] z-[1] h-[7.8rem] w-[7.8rem] -translate-x-1/2 -translate-y-1/2 2xl:left-0"
        >
          <Image src={IMG_2} alt="" />
        </div>
        <div className="absolute left-1/2 top-1/2 h-[7.75rem] w-[6.1rem] -translate-x-1/2 -translate-y-1/2">
          <Image src={IMG_6} alt="" />
        </div>
        <div
          ref={tbaRef}
          className="absolute left-1/2 top-1/2 h-[7.75rem] w-[6.1rem] -translate-x-1/2 -translate-y-1/2 scale-50 opacity-0"
        >
          <Image src={IMG_8v2} alt="" />
        </div>
      </div>
      <div ref={tbaParentRef} className="relative mt-auto h-[60%] opacity-0">
        <div className="absolute left-1/2 h-[4.125rem] w-[19.6rem] -translate-x-1/2">
          <Image src={IMG_7} alt="" />
        </div>
        <div className="absolute left-0 top-1/2 h-[4.125rem] w-[19.6rem] -translate-y-1/2">
          <Image src={IMG_8} alt="" />
        </div>
        <div className="absolute bottom-16 left-1/2 h-[4.125rem] w-[19.6rem] -rotate-3">
          <Image src={IMG_9} alt="" />
        </div>
      </div>
    </div>
  );
};

export default HeroImages;
