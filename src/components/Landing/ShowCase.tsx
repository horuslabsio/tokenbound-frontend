import { RightArrow } from "@public/icons";
import Image from "next/image";
import { Button } from "ui/button";

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
        <button className="group flex h-[3rem] w-fit items-center gap-2 rounded-[5px] border-[2px] border-solid border-deep-blue p-2 text-deep-blue transition-all duration-300 ease-in-out hover:bg-[#0C0C4F20]">
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
    <section className="container mx-auto flex flex-col items-center gap-8 p-8">
      <h2 className="mx-auto w-[486px] text-center">
        Empowering Your NFTs with{" "}
        <span className="text-gradient">Next-Level</span> Functionality
      </h2>
      <div className="grid h-[34rem] w-full grid-cols-2 overflow-clip rounded-[24px]">
        <div className="bg-gray-100"></div>
        <div className="bg-gradient-linear-primary"></div>
      </div>
      <div className="flex gap-6">
        <Button variant={"outline"}>Explore</Button>
        <Button variant={"outline"}>SDKs</Button>
        <Button variant={"outline"}> connect kit</Button>
        <Button variant={"outline"}>TBA iframe</Button>
      </div>
    </section>
  );
};

export default ShowCase;
