import { RightArrow } from "@public/icons";
import Image from "next/image";

const Card = ({
  description,
  title,
  src,
  button,
  link,
}: {
  description: string;
  button: string;
  title: string;
  src: string;
  link: string;
}) => {
  return (
    <figure className="max-w-[436px] flex flex-col max-h-[560px] mx-auto">
      <div
        className={`h-[200px] lg:h-[300px] overflow-clip bg-[#EFEFEF] w-full rounded-t-[8px]  relative`}
      >
        <Image
          className="rounded-t-[8px]"
          src={src}
          alt=""
          width={100}
          height={100}
        />
      </div>
      <figcaption className="flex-1 bg-white p-8 rounded-b-[8px] flex flex-col gap-4">
        <h5 className="text-black">{title}</h5>
        <p className="flex-1">{description}</p>
        <button className="flex items-center w-fit h-[3rem] gap-2 border-solid border-[2px] rounded-[5px] p-2 border-deep-blue text-deep-blue group transition-all duration-300 ease-in-out hover:bg-[#0C0C4F20]">
          <a href={link} target="_blank" rel="noopener noreferrer">
            <span className="text-start">{button}</span>
          </a>
          <span className="text-sm transition-all duration-300 ease-in-out group-hover:-rotate-[20deg]">
            <RightArrow />
          </span>
        </button>
      </figcaption>
    </figure>
  );
};

const ShowCase = () => {
  return (
    <section className="container mx-auto">
      <div className="flex flex-col gap-4 md:grid md:grid-cols-3">
        <Card
          title="EXPLORER"
          src="/explorer.svg"
          button="Tokenbound Explorer"
          description="We provide an explorer UI from which you can deploy new tokenbound accounts, track them and interact with them."
          link="#"
        />
        <Card
          title="DEVELOPER SDK"
          src="/developer-sdk.svg"
          button="Tokenbound SDK"
          description="Tokenbound SDK is a developer-focused kit for creating, retrieving and interacting with tokenbound accounts right from your dApp."
          link="https://tokenbound.gitbook.io/starknet-tokenbound/"
        />
        <Card
          title="SHOWCASE"
          src="/community-showcase.svg"
          button="Community Showcase"
          description="View and checkout the top ecosystem/community projects built around Tokenbound Accounts."
          link="#"
        />
      </div>
    </section>
  );
};

export default ShowCase;
