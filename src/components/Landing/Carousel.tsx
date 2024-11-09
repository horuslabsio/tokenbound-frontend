"use client";
import { useEffect, useState } from "react";
import { Button } from "ui/button";
import { motion as m } from "framer-motion";

const initialCards = [
  { id: "card1", position: "activeCard", title: "Explorer" },
  { id: "card2", position: "secondCard", title: "SDK" },
  { id: "card3", position: "thirdCard", title: "Connect Kit" },
  { id: "card4", position: "lastCard", title: "TBA Iframe" },
];
const Carousel = () => {
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
        className="relative h-[34rem] w-full"
      >
        <m.div
          className={`absolute left-1/2 grid h-[27rem] w-full max-w-[67rem] grid-cols-2 overflow-clip rounded-[24px] transition-all duration-1000 ${cards[3].position}`}
        >
          <div className="bg-gray-300">4</div>
          <div className="bg-gradient-linear-primary"></div>
        </m.div>

        <div
          className={`absolute left-1/2 grid h-[27rem] w-full max-w-[67rem] grid-cols-2 overflow-clip rounded-[24px] ${cards[2].position}`}
        >
          <div className="bg-purple-500"></div>
          <div className="bg-orange-700"></div>
        </div>
        <div
          className={`absolute left-1/2 grid h-[27rem] w-full max-w-[67rem] grid-cols-2 overflow-clip rounded-[24px] ${cards[1].position}`}
        >
          <div className="bg-gray-700"></div>
          <div className="bg-amber-300"></div>
        </div>
        <div
          className={`absolute left-1/2 grid h-[27rem] w-full max-w-[67rem] grid-cols-2 overflow-clip rounded-[24px] transition-all duration-500 ${cards[0].position}`}
        >
          <div className="bg-gray-600"></div>
          <div className="bg-green-800"></div>
        </div>
      </div>

      <div className="hidden gap-6 md:flex">
        {cards.map((card) => (
          <Button
            key={card.id}
            variant={"outline"}
            onClick={() => handleClick(card.id)}
          >
            {card.title}
          </Button>
        ))}
      </div>
    </>
  );
};

export default Carousel;
