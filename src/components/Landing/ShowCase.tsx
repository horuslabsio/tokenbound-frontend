import Image from "next/image";

const Card = ({
  description,
  title,
  src,
  button,
}: {
  description: string;
  button: string;
  title: string;
  src: string;
}) => {
  return (
    <figure className="h-full flex flex-col">
      <div
        className={`flex h-[40vh] bg-deep-blue w-full rounded-t-[8px] items-center justify-center relative`}
      >
        <Image
          className="rounded-t-[8px]"
          src={src}
          alt=""
          width={100}
          height={100}
        />
      </div>
      <figcaption className="bg-white p-8 rounded-b-[8px] flex flex-col gap-4">
        <h5 className="text-black">{title}</h5>
        <p>{description}</p>
        <button className="flex items-center w-fit gap-4 border-solid border-[2px] rounded-[5px] py-3 px-6  border-deep-blue text-deep-blue group transition-all duration-300 ease-in-out hover:bg-[#0C0C4F20]">
          <span className="text-start">{button}</span>
          <span className="transition-all duration-300 ease-in-out group-hover:-rotate-[20deg]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
                clipRule="evenodd"
              />
            </svg>
          </span>
        </button>
      </figcaption>
    </figure>
  );
};

const ShowCase = () => {
  return (
    <section className="flex flex-col gap-20 px-4 py-16 lg:p-16  mx-auto md:gap-10 lg:flex-row">
      <Card
        title="EXPLORER"
        src="/Biometric authentication and lock with personal data.svg"
        button="Tokenbound Explorer"
        description="We provide an explorer UI from which you can deploy new tokenbound accounts, track them and interact with them."
      />
      <Card
        title="DEVELOPER SDK"
        src="/Biometric authentication and lock with personal data.svg"
        button="Tokenbound SDK"
        description="Tokenbound SDK is a developer-focused kit for creating, retrieving and interacting with tokenbound accounts right from your dApp."
      />
      <Card
        title="SHOWCASE"
        src="/Cryptocurrency and cloud computing service(1).svg"
        button="Community Showcase"
        description="View and checkout the top ecosystem/community projects built around Tokenbound Accounts."
      />
    </section>
  );
};

export default ShowCase;
