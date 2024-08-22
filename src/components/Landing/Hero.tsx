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

      <div className="relative h-[200px] md:h-[400px] w-screen  max-w-[2000px] mx-auto overflow-hidden">
        <div className="absolute z-[3] bg-[#fafafa] h-[100px] md:h-[200px] top-[-50px] md:top-[-120px] w-[110%] left-1/2 -translate-x-1/2 rounded-[50%]"></div>
        <div className="custom-shape w-full h-full grid grid-cols-4 gap-4">
          <div className="h-[200px] md:h-[400px]">
            <img src="/hero-1.png" alt="" className="h-full w-full" />
          </div>
          <div className="h-[200px] md:h-[400px]">
            <img
              src="/hero-2.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-[200px] md:h-[400px]">
            <img
              src="/hero-3.png"
              alt=""
              className="h-full w-full object-cover"
            />
          </div>
          <div className="h-[200px] md:h-[400px]">
            <img src="/hero-4.png" alt="" className="h-full w-full" />
          </div>
        </div>
        <div className="absolute z-[3] bg-[#fafafa] h-[100px] md:h-[200px] bottom-[-50px] md:bottom-[-120px] left-1/2 -translate-x-1/2 w-[110%] rounded-[50%]"></div>
      </div>
    </section>
  );
};

export default Hero;
