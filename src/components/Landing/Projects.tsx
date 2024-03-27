import Image from "next/image";
import UpRightArrowIcon from "svg/UpRightArrowIcon";

const Project = ({
  description,
  gradient,
  title,
  src,
}: {
  gradient?: string;
  description: string;
  title: string;
  src?: string;
}) => {
  return (
    <a
      className="group w-full"
      href="http://"
      target="_blank"
      rel="noopener noreferrer"
    >
      <figure className="h-full flex flex-col">
        <div
          className={`flex  h-[40vh] w-full rounded-t-[8px] ${
            src ? "" : gradient
          } items-center justify-center relative`}
        >
          {src ? (
            <Image
              className="rounded-t-[8px] h-full"
              src={src}
              alt=""
              width={100}
              height={100}
            />
          ) : (
            <h2 className="text-white w-fit mx-auto ">{title}</h2>
          )}
          <span className="absolute bg-white rounded-full flex items-center right-[3%] top-[3%] p-2">
            <span className="inline-block transition-all duration-300 ease-in-out group-hover:-translate-y-1 group-hover:translate-x-1">
              <UpRightArrowIcon />
            </span>
          </span>
        </div>
        <figcaption className="bg-white p-8 rounded-b-[8px] flex flex-col gap-4">
          <h5 className="text-black">{title}</h5>
          <p>{description}</p>
        </figcaption>
      </figure>
    </a>
  );
};

const Projects = () => {
  return (
    <section className="flex flex-col gap-16  px-4 py-16 lg:p-16 lg:h-screen">
      <div className="flex flex-col lg:flex-row">
        <h2 className="text-black basis-1/2">Community projects</h2>
        <div className="basis-1/2 flex justify-end items-center">
          <button className="bg-[#EFEFEF] rounded-full p-3">View All</button>
        </div>
      </div>
      <div className="flex-1 flex flex-col lg:flex-row items-center gap-20 md:gap-10">
        <Project
          title="Lenstar"
          gradient="bg-gradient-to-br from-[#8DEC6B] to-[#8AB7E0]"
          description="Tokenbound Accounts turns every NFT into a smart wallet that can own
          tokens and interact with dApps across the Ethereum ecosystem"
        />
        <Project
          title="Coming soon.."
          gradient="bg-gradient-to-br from-[#3A3A3A] to-[#282828]"
          description="Tokenbound Accounts turns every NFT into a smart wallet that can own
          tokens and interact with dApps across the Ethereum ecosystem"
        />
        <Project
          title="Coming soon.."
          gradient="bg-gradient-to-br from-[#3A3A3A] to-[#282828]"
          description="Tokenbound Accounts turns every NFT into a smart wallet that can own
          tokens and interact with dApps across the Ethereum ecosystem"
        />
      </div>
    </section>
  );
};

export default Projects;
