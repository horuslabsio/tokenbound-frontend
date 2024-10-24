"use client";
import { useState } from "react";

import { FAQs as FQAData } from "../../static";
import { DownChevronIcon } from "@public/icons/icon";

type Props = {
  id: string;
  question: string;
  answer: string | string[];
  currentAccordion: string;
  toggleAccordion: ({ id }: { id: string }) => void;
};

const Accordion = ({
  id,
  question,
  answer,
  currentAccordion,
  toggleAccordion,
}: Props) => {
  return (
    <div className="rounded-[8px] bg-[#F0F0F0] px-6 py-3">
      <button
        aria-expanded={currentAccordion === id}
        aria-label={`Toggle ${question} accordion`}
        onClick={() => toggleAccordion({ id: id })}
        className="grid w-full grid-cols-10 items-center justify-between gap-8 text-deep-blue"
      >
        <span className="col-span-8 inline-block text-start">{question}</span>
        <div aria-hidden="true" className="col-span-2 flex justify-end">
          <span
            className={`flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-deep-blue text-white transition-all duration-300 ease-in-out ${
              currentAccordion === id ? "rotate-180" : "rotate-[0deg]"
            } `}
          >
            <DownChevronIcon width="1.5em" height="1.5em" />
          </span>
        </div>
      </button>
      <div
        className={`grid overflow-hidden transition-all duration-300 ease-in-out ${
          currentAccordion === id
            ? "grid-rows-[1fr] opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <div className="flex flex-col gap-2 py-6">
            {Array.isArray(answer) ? (
              <ul className="flex flex-col gap-2">
                {answer.map((line, index) => (
                  <li key={index}>
                    <p className="border-l-solid border-l-[1px] border-l-[#7A7A7A] px-4 text-deep-blue">
                      {line}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="border-l-solid border-l-[1px] border-l-[#7A7A7A] px-4 text-deep-blue">
                {answer}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const FQAs = () => {
  const [currentAccordion, setCurrentAccordion] = useState("");
  const toggleAccordion = ({ id }: { id: string }) => {
    if (currentAccordion === id) {
      setCurrentAccordion("");
    } else {
      setCurrentAccordion(id);
    }
  };

  return (
    <section className="container mx-auto flex flex-col gap-8 px-4 py-16 lg:p-16">
      <h2 className="text-center text-black">
        Frequently Asked Questions (FAQs)
      </h2>
      <section className="mx-auto flex flex-col gap-4 md:w-[70%]">
        {FQAData.map((items) => {
          const { answer, id, question } = items;

          return (
            <Accordion
              key={id}
              id={id}
              question={question}
              answer={answer}
              currentAccordion={currentAccordion}
              toggleAccordion={toggleAccordion}
            />
          );
        })}
      </section>
    </section>
  );
};

export default FQAs;
/*  */
