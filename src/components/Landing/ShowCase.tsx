import Image from "next/image";
import RightArrow from "svg/RightArrow";
import Button from "ui/button";

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
    <figure className="mx-auto flex max-h-[560px] max-w-[436px] flex-col">
      <div
        className={`relative h-[200px] w-full overflow-clip rounded-t-[8px] bg-[#EFEFEF] lg:h-[300px]`}
      >
        <Image
          className="rounded-t-[8px]"
          src={src}
          alt=""
          width={100}
          height={100}
        />
      </div>
      <figcaption className="flex flex-1 flex-col gap-4 rounded-b-[8px] bg-white p-8">
        <h5 className="text-black">{title}</h5>
        <p className="flex-1">{description}</p>
        <Button
          variant={"border-bold"}
          size={"lg"}
          className="group flex w-fit items-center gap-2"
        >
          <a href={link} target="_blank" rel="noopener noreferrer">
            <span className="text-start">{button}</span>
          </a>
          <span className="text-sm transition-all duration-300 ease-in-out group-hover:-rotate-[20deg]">
            <RightArrow />
          </span>
        </Button>
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
