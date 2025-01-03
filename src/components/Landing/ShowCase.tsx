import Image, { StaticImageData } from "next/image";
import blingImage from "../../../public/community/0.png";
import unixImage from "../../../public/community/1.png";
import runAwaysImage from "../../../public/community/2.png";
import tokenGImage from "../../../public/community/3.png";
import crowdPassImage from "../../../public/community/4.png";
import carbonableImage from "../../../public/community/5.png";
const ShowCase = () => {
  return (
    <section
      id="projects"
      className="mx-auto max-w-[1060px] px-2 py-8 md:px-8 lg:p-16 2xl:max-w-[1490px]"
    >
      <div className="mb-8 flex justify-center md:justify-between">
        <h2 className="flex flex-col text-center md:block md:text-start">
          <span className="text-gradient"> Community</span>
          {""} Project Gallery
        </h2>

        <a
          className="hidden h-fit rounded-full bg-gray-100 px-4 py-2 text-black md:inline-block"
          href="https://docs.tbaexplorer.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          View All
        </a>
      </div>
      <div className="flex max-w-[21rem] flex-col gap-4 md:grid md:max-w-none md:grid-cols-3 lg:gap-8">
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

export default ShowCase;

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
      className="group inline-block w-full"
      href={url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <figure className="flex flex-col gap-4 2xl:h-[25rem]">
        <div
          className={`relative mx-auto flex h-[11rem] w-full max-w-[21rem] items-center justify-center overflow-hidden rounded-[16px] md:h-[10rem] 2xl:h-[15rem] 2xl:max-w-[31rem]`}
        >
          <Image
            className="h-full w-full scale-[1.02] rounded-[16px] object-cover transition-all duration-500 group-hover:scale-[1.15]"
            src={src}
            alt=""
          />
        </div>
        <figcaption className="flex w-[80%] flex-1 flex-col gap-2 px-2">
          <p className="text-lg font-medium">{title}</p>
          <p className="line-clamp-3 text-ellipsis">{description}</p>
        </figcaption>
      </figure>
    </a>
  );
};
