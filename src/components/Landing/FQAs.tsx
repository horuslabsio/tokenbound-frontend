import { useState } from "react";
import DownChevronIcon from "svg/DownChevronIcon";
import { FAQs as FQAData } from "../../static";

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
    <div className="bg-[#F0F0F0] py-3 px-6 rounded-[8px]">
      <button
        aria-expanded={currentAccordion === id}
        aria-label={`Toggle ${question} accordion`}
        onClick={() => toggleAccordion({ id: id })}
        className="grid grid-cols-10 gap-8 justify-between items-center text-deep-blue w-full"
      >
        <span className="inline-block col-span-8 text-start">{question}</span>
        <div aria-hidden="true" className="col-span-2 flex justify-end">
          <span
            className={`w-[2rem] h-[2rem] rounded-full bg-deep-blue text-white flex items-center justify-center transition-all duration-300 ease-in-out ${
              currentAccordion === id ? "rotate-180" : "rotate-[0deg]"
            }  `}
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
          <div className="py-6 flex flex-col gap-2 ">
            {Array.isArray(answer) ? (
              <ul className="flex flex-col gap-2">
                {answer.map((line, index) => (
                  <li key={index}>
                    <p className="px-4 text-deep-blue border-l-solid border-l-[1px] border-l-[#7A7A7A]">
                      {line}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-4 text-deep-blue border-l-solid border-l-[1px] border-l-[#7A7A7A]">
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
    <section className="min-h-[80vh] flex flex-col gap-8 px-4 py-16 lg:p-16">
      <h2 className="text-black text-center">
        Frequently Asked Questions (FAQs)
      </h2>
      <section className=" mx-auto flex flex-col gap-4 md:w-[70%]">
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
