import Image from "next/image";

const Features = () => {
  return (
    <section className="flex flex-col items-center gap-10 px-4 py-16 md:px-16 lg:p-16  lg:flex-row">
      <article className="flex flex-col gap-4 basis-1/2">
        <h2 className="text-deep-blue">
          ERC-6551 turns every NFT into a smart wallet interacting across the
          Ethereum ecosystem.
        </h2>
        <ul className="flex flex-col gap-8">
          <li className="flex flex-col md:items-center gap-4 md:flex-row">
            <div className="xsm:w-[40%] w-[5rem] p-4 bg-[#F1F1F1] rounded-[12px] ">
              <img src="/blockchain-05.svg" alt="" className="aria-hidden" />
            </div>
            <div className="basis-[90%]">
              <h5 className="text-deep-blue">Own other Assets</h5>
              <p>
                ERC-6551 turns every NFT into a smart wallet that can own tokens
                and interact with dApps across the Ethereum ecosystem.
              </p>
            </div>
          </li>
          <li className="flex flex-col md:items-center gap-4 md:flex-row">
            <div className="w-[5rem]  p-4 bg-[#F1F1F1] rounded-[12px] ">
              <img src="/bitcoin-wallet.svg" alt="" className="aria-hidden" />
            </div>
            <div className="basis-[90%]">
              <h5 className="text-deep-blue">Connect NFTs</h5>
              <p>
                ERC-6551 turns every NFT into a smart wallet that can own tokens
                and interact with dApps across the Ethereum ecosystem.
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
                ERC-6551 turns every NFT into a smart wallet that can own tokens
                and interact with dApps across the Ethereum ecosystem.
              </p>
            </div>
          </li>
        </ul>
      </article>
      <figure className="flex h-[40vh]  place-content-center rounded-[12px] w-full md:w-[60vh] mx-auto lg:h-[50%]">
        <Image
          className="rounded-[12px] h-[40vh] lg:h-full"
          src="/unsplash_hKxsoF4aubY.png"
          alt=""
          width={100}
          height={100}
        />
      </figure>
    </section>
  );
};

export default Features;
