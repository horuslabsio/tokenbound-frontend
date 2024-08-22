import Image from "next/image";

const Features = () => {
  return (
    <section className="container mx-auto flex flex-col items-center justify-between gap-10 px-4 py-16 md:px-16 lg:p-16  lg:flex-row">
      <article className="flex flex-col gap-4 basis-1/2">
        <h2 className="text-deep-blue">
          Turn existing NFTs into a smart wallet you could use to interact with
          the Starknet ecosystem.
        </h2>
        <ul className="flex flex-col gap-8">
          <li className="flex flex-col md:items-center gap-4 md:flex-row">
            <div className="xsm:w-[40%] w-[5rem] p-4 bg-[#F1F1F1] rounded-[12px] ">
              <img src="/bitcoin-wallet.svg" alt="" className="aria-hidden" />
            </div>
            <div className="basis-[90%]">
              <h5 className="text-deep-blue">Own other Assets</h5>
              <p>
                Your NFTs can now own other assets (ERC20s, ERC721s and many
                more) just like a normal wallet. Opens amazing possibilities for
                on-chain gaming.
              </p>
            </div>
          </li>
          <li className="flex flex-col md:items-center gap-4 md:flex-row">
            <div className="w-[5rem]  p-4 bg-[#F1F1F1] rounded-[12px] ">
              <img src="/blockchain-05.svg" alt="" className="aria-hidden" />
            </div>
            <div className="basis-[90%]">
              <h5 className="text-deep-blue">Connect with NFTs</h5>
              <p>
                Connect and interact with ecosystem-wide dApps using your NFTs.
              </p>
            </div>
          </li>
          <li className="flex flex-col md:items-center gap-4 md:flex-row">
            <div className="xsm:w-[40%] w-[5rem]  p-4 bg-[#F1F1F1] rounded-[12px] ">
              <img src="/blockchain-05.svg" alt="" className="aria-hidden" />
            </div>
            <div className="basis-[90%]">
              <h5 className="text-deep-blue">Make Onchain History</h5>
              <p>
                Tokenbound turns your NFTs into autonomous wallet agents. Beyond
                on-chain JPEGs, you can now carry out transactions and make
                on-chain history!
              </p>
            </div>
          </li>
        </ul>
      </article>
      <figure className=" w-[50%] max-w-[400px]">
        <Image
          className="rounded-[12px] h-[40vh] lg:h-full"
          src="/erc-illustration.svg"
          alt=""
          width={100}
          height={100}
        />
      </figure>
    </section>
  );
};

export default Features;
