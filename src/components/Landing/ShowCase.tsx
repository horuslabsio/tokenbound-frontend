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
        className={`flex h-[40vh] bg-[#EFEFEF] w-full rounded-t-[8px] items-center justify-center relative lg:h-full`}
      >
        {/* <Image
          className="rounded-t-[8px]"
          src={src}
          alt=""
          width={100}
          height={100}
        /> */}
      </div>
      <figcaption className="bg-white p-8 rounded-b-[8px] flex flex-col gap-4">
        <h5 className="text-black">{title}</h5>
        <p>{description}</p>
        <button className="flex items-center w-fit gap-4 border-solid border-[2px] rounded-[5px] py-2 px-6  border-deep-blue text-deep-blue">
          <span>{button}</span>
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="2em"
              height="2em"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                fill-rule="evenodd"
                d="M13.47 5.47a.75.75 0 0 1 1.06 0l6 6a.75.75 0 0 1 0 1.06l-6 6a.75.75 0 1 1-1.06-1.06l4.72-4.72H4a.75.75 0 0 1 0-1.5h14.19l-4.72-4.72a.75.75 0 0 1 0-1.06"
                clip-rule="evenodd"
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
    <section className="flex flex-col gap-10 px-4 py-16 lg:p-16 lg:h-[80vh] lg:flex-row">
      <Card
        title="TRAKKA"
        src="/Biometric authentication and lock with personal data.svg"
        button="Go to Dashboard"
        description="Tokenbound Accounts turns every NFT into a smart wallet that can own
          tokens and interact with dApps across the Ethereum ecosystem"
      />
      <Card
        title="TRAKKA"
        src="/Biometric authentication and lock with personal data.svg"
        button="Starknet Tokenbound SDK"
        description="Tokenbound Accounts turns every NFT into a smart wallet that can own
          tokens and interact with dApps across the Ethereum ecosystem"
      />
      <Card
        title="TRAKKA"
        src="/Cryptocurrency and cloud computing service(1).svg"
        button="Community Showcase"
        description="Tokenbound Accounts turns every NFT into a smart wallet that can own
          tokens and interact with dApps across the Ethereum ecosystem"
      />
    </section>
  );
};

export default ShowCase;
