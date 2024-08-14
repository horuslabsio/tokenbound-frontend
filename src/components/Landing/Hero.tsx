import Link from "next/link";

const Hero = () => {
  return (
    <section>
      <div className="p-4 container mx-auto">
        <h1 className="text-center  bg-gradient-linear-starknet-gradient text-transparent bg-clip-text my-0 mx-auto lg:p-10  lg:w-[40%]">
          Transforming any NFT to a Wallet
        </h1>
        <p className="lg:w-[35%] lg:px-10 text-center  my-0 mx-auto lg:text-justify">
          A &#8221;Token Bound Account&#8221; is a smart contract account,
          controlled by an NFT. It can do everything a normal wallet can do and
          is compatible with every NFT you already own.
        </p>
        <Link href={"https://tokenbound.gitbook.io/starknet-tokenbound/"}>
          <button className="xsm:w-[90%] w-[14rem] block mt-4 mx-auto p-4 bg-deep-blue rounded-[8px] text-white">
            Visit Documentation
          </button>
        </Link>
      </div>
      <div>
        <img src="/Frame 20.png" alt="" />
      </div>
    </section>
  );
};

export default Hero;
/* 


*/
