import Image, { StaticImageData } from "next/image";

import blingImage from "../../../public/community/0.png";
import unixImage from "../../../public/community/1.png";
import runAwaysImage from "../../../public/community/2.png";
import tokenGImage from "../../../public/community/3.png";
import crowdPassImage from "../../../public/community/4.png";
import carbonableImage from "../../../public/community/5.png";
import { UpRightArrowIcon } from "@public/icons";

const Project = ({
  description,
  title,
  src,
  url,
}: {
  description: string;
  title: string;
  src: StaticImageData;
  url: string;
}) => {
  return (
    <a
      className="group w-full"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <figure className="flex h-full max-h-[490px] max-w-[436px] flex-col">
        <div
          className={`relative flex w-full items-center justify-center rounded-t-[8px]`}
        >
          <Image className="h-full w-full rounded-t-[8px]" src={src} alt="" />

          <span className="absolute right-[3%] top-[3%] flex items-center rounded-full bg-white p-2">
            <span className="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1">
              <UpRightArrowIcon />
            </span>
          </span>
        </div>
        <figcaption className="flex flex-1 flex-col gap-4 rounded-b-[8px] bg-white p-8">
          <h5 className="text-black">{title}</h5>
          <p className="line-clamp-3 text-ellipsis">{description}</p>
        </figcaption>
      </figure>
    </a>
  );
};

const Projects = () => {
  return (
    <section className="container mx-auto flex flex-col gap-16 px-4 py-16 lg:p-16">
      <div className="flex flex-col lg:flex-row">
        <h2 className="basis-1/2 text-black">Community projects</h2>
        <div className="flex basis-1/2 items-center justify-end">
          <a
            className="rounded-full bg-[#EFEFEF] p-3"
            href="https://docs.tbaexplorer.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View All
          </a>
        </div>
      </div>
      <div className="flex flex-col gap-8 md:grid md:grid-cols-3">
        <Project
          url="https://www.carbonable.io/"
          title="Carbonable"
          src={carbonableImage}
          description="Carbonable is a platform for planning, managing and reporting every carbon contribution with ease and guaranteed authenticity"
        />
        <Project
          url="https://tokenbound-hackathon-bling.vercel.app/"
          title="Bling Bling"
          src={blingImage}
          description="BLING BLING is a project about tokenbound 6551. Players can mint Tokenbound and then choose to put it on the market for buying and selling, or play games to earn BLING and climb the ranks."
        />
        <Project
          url="https://unix-tba.vercel.app/"
          title="Unix"
          src={unixImage}
          description="Unix is a decentralized application designed to streamline the management and tracking of token-bound accounts across multiple blockchain networks, offering a comprehensive multi-chain solution. "
        />
        <Project
          url="https://runaways-azure.vercel.app/"
          title="Runaways"
          src={runAwaysImage}
          description="Runaways is a gaming project that combines the thrill of evading capture with the excitement of collecting and growing unique digital assets."
        />
        <Project
          url="https://token-giver-7u11.vercel.app/"
          title="Token Giver"
          src={tokenGImage}
          description="Token Giver is a decentralized application designed to revolutionize charity and fundraising."
        />
        <Project
          url="https://crowdpass.vercel.app/"
          title="Crowdpass"
          src={crowdPassImage}
          description="Crowdpass is a decentralized Event management platform, crowdpass aids event organizers to create and manage event ticketing."
        />
      </div>
    </section>
  );
};

export default Projects;
