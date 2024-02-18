const Hero = () => {
  return (
    <section>
      <div className="p-4">
        <h1 className="text-center  bg-gradient-linear-starknet-gradient text-transparent bg-clip-text my-0 mx-auto lg:p-10  lg:w-[40%]">
          Transforming any NFT to a Wallet
        </h1>
        <p className="lg:w-[35%] lg:px-10 text-justify  my-0 mx-auto">
          ERC-6551 turns every NFT into a smart wallet that can own tokens and
          interact with dApps across the Ethereum ecosystem.
        </p>
        <button className="w-[14rem] block mt-4 mx-auto p-3 bg-deep-blue rounded-[8px] text-white">
          Go to Dashboard
        </button>
      </div>
      <div>
        <img src="/Frame 20.png" alt="" />
      </div>
    </section>
  );
};

export default Hero;
