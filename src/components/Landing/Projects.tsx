import Image, { StaticImageData } from "next/image";
import UpRightArrowIcon from "svg/UpRightArrowIcon";
import blingImage from "../../../public/community/0.gif";
import unixImage from "../../../public/community/1.gif";
import runAwaysImage from "../../../public/community/2.gif";
import tokenGImage from "../../../public/community/3.gif";
import crowdPassImage from "../../../public/community/4.gif";
import ccnftsImage from "../../../public/community/5.gif";

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
      <figure className="max-w-[436px] h-full flex flex-col max-h-[490px]">
        <div
          className={`flex w-full rounded-t-[8px] items-center justify-center relative`}
        >
          <Image className="rounded-t-[8px] h-full w-full" src={src} alt="" />

          <span className="absolute bg-white rounded-full flex items-center right-[3%] top-[3%] p-2">
            <span className="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1">
              <UpRightArrowIcon />
            </span>
          </span>
        </div>
        <figcaption className="flex-1 bg-white p-8 rounded-b-[8px] flex flex-col gap-4">
          <h5 className="text-black">{title}</h5>
          <p className="line-clamp-3 text-ellipsis">{description}</p>
        </figcaption>
      </figure>
    </a>
  );
};

const Projects = () => {
  return (
    <section className="flex container mx-auto flex-col  gap-16  px-4 py-16 lg:p-16 ">
      <div className="flex flex-col lg:flex-row">
        <h2 className="text-black basis-1/2">Community projects</h2>
        <div className="basis-1/2 flex justify-end items-center">
          <a
            className="bg-[#EFEFEF] rounded-full p-3"
            href="https://docs.tbaexplorer.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            View All
          </a>
        </div>
      </div>
      <div className="flex flex-col md:grid md:grid-cols-3 gap-8">
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
        <Project
          url="https://ccnfts.vercel.app/"
          title="Crowdpass"
          src={ccnftsImage}
          description="CCNFTs is revolutionizing the gaming world on the blockchain with a thrilling vision for the future."
        />
      </div>
    </section>
  );
};

export default Projects;
