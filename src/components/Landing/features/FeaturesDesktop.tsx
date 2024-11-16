"use client";
import { useState } from "react";
import { Button } from "ui/button";
import { RightArrow } from "@public/icons";
import IMG_0 from "../../../../public/features/lg-0.png";
import IMG_1 from "../../../../public/features/lg-1.png";
import IMG_2 from "../../../../public/features/lg-2.png";
import IMG_3 from "../../../../public/features/lg-3.png";
import Image, { StaticImageData } from "next/image";

const initialCards = [
  { id: "card1", position: "activeCard", title: "Explorer" },
  { id: "card2", position: "secondCard", title: "SDK" },
  { id: "card3", position: "thirdCard", title: "Connect Kit" },
  { id: "card4", position: "lastCard", title: "TBA Iframe" },
];
const FeaturesDesktop = () => {
  const [cards, setCards] = useState(initialCards);

  const handleClick = (clickedId: string) => {
    setCards((prevCards) => {
      // Find the active and clicked cards
      const activeCard = prevCards.find(
        (card) => card.position === "activeCard",
      );
      const clickedCard = prevCards.find((card) => card.id === clickedId);

      if (!clickedCard || !activeCard || activeCard.id === clickedId) {
        return prevCards; // No change if the clicked card is already active
      }

      // Update cards with new positions
      return prevCards.map((card) => {
        if (card.id === clickedId) {
          // Set clicked card to active
          return { ...card, position: "activeCard" };
        }
        if (card.id === activeCard.id) {
          // Move previous active card to clicked card’s old position
          return { ...card, position: clickedCard.position };
        }
        return card; // Keep other cards' positions unchanged
      });
    });
  };
  return (
    <>
      <div
        style={{
          perspective: "1000px",
        }}
        className="relative hidden h-[34rem] w-full md:block"
      >
        <Card
          description="The iFrame tool lets you display your NFT and its token-bound account, along with any assets it holds, in a sleek, customizable format. Whether it’s a marketplace or a portfolio, effortlessly demo the full capabilities of token-bound accounts in one unified view—perfect for creators, collectors, and businesses alike."
          link="https://docs.tbaexplorer.com/toolings/tokenbound-iframe"
          position={cards[3].position}
          src={IMG_3}
          title="TBA IFrame"
        />

        <Card
          description="Tokenbound accounts don’t appear in regular wallets, but with the Connect Kit, they’re just a link away. Easily connect your token-bound account to the wallet holding your NFT, giving you full control to sign, approve, and manage transactions. Experience smooth integration between your wallets and token-bound accounts."
          link="https://docs.tbaexplorer.com/toolings/tokenbound-connectkit"
          position={cards[2].position}
          src={IMG_2}
          title="Connect Kit"
        />

        <Card
          description="Our Software Development Kit (SDK) equips developers with ready-made tools and functions to integrate token-bound accounts into their projects quickly and efficiently. Simplify workflows, reduce development time, and add powerful token-bound functionality to your apps, whether you’re creating a marketplace, game, or something entirely new."
          link="https://docs.tbaexplorer.com/sdk"
          position={cards[1].position}
          src={IMG_1}
          title="SDK"
        />

        <Card
          description="Effortlessly deploy, track, and manage Tokenbound Accounts (TBAs) with our intuitive Explorer. This user-friendly interface allows you to view and interact with wallets associated with your NFTs, providing a seamless experience for both new and experienced users."
          link=""
          position={cards[0].position}
          src={IMG_0}
          title="Tokenbound Explorer"
        />
      </div>

      <div className="hidden gap-6 md:flex">
        {cards.map((card) => (
          <Button
            className="px-4"
            key={card.id}
            variant={card.position === "activeCard" ? "outline" : "ghost"}
            onClick={() => handleClick(card.id)}
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
  position,
}: {
  title: string;
  description: string;
  src: StaticImageData;
  link: string;
  position: string;
}) => {
  return (
    <div
      className={`absolute left-1/2 grid h-[27rem] w-full max-w-[67rem] grid-cols-2 overflow-clip rounded-[16px] transition-all duration-500 ${position}`}
    >
      <div className="flex flex-col justify-between bg-gray-100 p-8">
        <div>
          <h5 className="font-inter-variable text-2xl font-medium">{title}</h5>
        </div>
        <div className="flex flex-col gap-8">
          <p className="font-normal">{description}</p>
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
        </div>
      </div>
      <div aria-hidden className="max-h-[27rem]">
        <Image src={src} alt="" className="" />
      </div>
    </div>
  );
};
