"use client";
import { useState } from "react";
import { Button } from "ui/button";
import { RightArrow } from "@public/icons";
import { FEATURES } from "@static/index";
import Image, { StaticImageData } from "next/image";

type CardId = "card0" | "card1" | "card2" | "card3";

const FeaturesDesktop = () => {
  const [active, setActive] = useState<CardId>("card0");

  const handleClick = (clickedId: CardId) => {
    setActive((prev) => (prev !== clickedId ? clickedId : prev));
  };

  return (
    <>
      {/* Cards */}
      <div
        style={{ perspective: "1000px" }}
        className="relative hidden h-[34rem] w-full md:block"
      >
        {FEATURES.map((card) => (
          <Card
            key={card.id}
            id={card.id as CardId}
            title={card.title}
            description={card.description}
            link={card.link}
            src={card.src}
            active={active}
          />
        ))}

        {/* Faux Cards */}
        <div
          aria-hidden
          style={{
            top: "10%",
            transform: "translateX(-50%) translateZ(-10rem)",
          }}
          className={`absolute left-1/2 grid h-[27rem] w-full max-w-[67rem] grid-cols-2 overflow-clip rounded-[16px] bg-[#B0B0B0] transition-all duration-500`}
        ></div>
        <div
          aria-hidden
          style={{
            top: "7.5%",
            transform: "translateX(-50%) translateZ(-8rem)",
          }}
          className={`absolute left-1/2 grid h-[27rem] w-full max-w-[67rem] grid-cols-2 overflow-clip rounded-[16px] bg-[#cac8c8] transition-all duration-500`}
        ></div>
        <div
          aria-hidden
          style={{
            top: "5%",
            transform: "translateX(-50%) translateZ(-6rem)",
          }}
          className={`absolute left-1/2 grid h-[27rem] w-full max-w-[67rem] grid-cols-2 overflow-clip rounded-[16px] bg-[#E7E7E7] transition-all duration-500`}
        >
          <div className="h-[95%] w-full bg-gray-100"></div>
          <div className="h-[95%] w-full bg-gradient-linear-primary"></div>
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="hidden gap-6 md:flex">
        {FEATURES.map((card) => (
          <Button
            key={card.id}
            className="px-4"
            variant={card.id === active ? "outline" : "ghost"}
            onClick={() => handleClick(card.id as CardId)}
          >
            {card.title}
          </Button>
        ))}
      </div>
    </>
  );
};

export default FeaturesDesktop;

export const Card = ({
  description,
  link,
  src,
  title,
  id,
  active,
}: {
  title: string;
  description: string;
  src: StaticImageData;
  link: string;
  id: CardId;
  active: CardId;
}) => {
  return (
    <div
      className={`absolute left-1/2 grid h-[27rem] w-full max-w-[67rem] grid-cols-2 overflow-clip rounded-[16px] ${active === id ? "activeCard" : "inactiveCard"}`}
    >
      <div className="flex flex-col justify-between bg-gray-100 p-8">
        <div>
          <h5 className="font-inter-variable text-2xl font-medium">{title}</h5>
        </div>
        <div className="flex flex-col gap-8">
          <p className="font-normal">{description}</p>
          {id === "card0" ? (
            <Button
              disabled
              className="w-fit min-w-[8rem] font-normal disabled:cursor-default disabled:opacity-100"
              variant={"gray"}
              endIcon={<RightArrow />}
            >
              <span className="text-start">Explore</span>
            </Button>
          ) : (
            <Button
              className="w-fit min-w-[8rem] bg-white font-normal shadow-md"
              asChild
              variant={"gray"}
              endIcon={<RightArrow />}
            >
              <a href={link} target="_blank" rel="noopener noreferrer">
                <span className="text-start">Explore</span>
              </a>
            </Button>
          )}
        </div>
      </div>
      <div aria-hidden className="max-h-[27rem]">
        <Image src={src} alt="" className="object-cover" />
      </div>
    </div>
  );
};
