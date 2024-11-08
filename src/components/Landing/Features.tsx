const Features = () => {
  return (
    <section className="container mx-auto flex flex-col items-center gap-8 p-8">
      <h2 className="max-w-[47rem] text-center">
        Turn existing NFTs into a{" "}
        <span className="text-gradient">smart wallet</span> you could use to
        interact with the Starknet ecosystem.
      </h2>

      <ul className="mb-20 mt-12 grid h-[15rem] w-[65rem] max-w-[75rem] grid-cols-3 gap-4">
        <li className="flex flex-col gap-2">
          <div className="w-[2.5rem] xsm:w-[40%]">
            <img src="/bitcoin-wallet.svg" alt="" className="aria-hidden" />
          </div>
          <h5>Own other Assets</h5>

          <p className="h-[45%] w-[80%]">
            Your NFTs can now own other assets (ERC20s, ERC721s and many more)
            just like a normal wallet. Opens amazing possibilities for on-chain
            gaming.
          </p>
        </li>
        <li className="flex flex-col gap-2">
          <div className="w-[2.5rem] xsm:w-[40%]">
            <img src="/blockchain-05.svg" alt="" className="aria-hidden" />
          </div>
          <h5>Connect with NFTs</h5>

          <p className="h-[45%] w-[80%]">
            Connect and interact with ecosystem-wide dApps using your NFTs.
          </p>
        </li>
        <li className="flex flex-col gap-2">
          <div className="w-[2.5rem] xsm:w-[40%]">
            <img src="/bitcoin-wallet.svg" alt="" className="aria-hidden" />
          </div>
          <h5>Make Onchain History</h5>

          <p className="h-[45%] w-[80%]">
            Tokenbound turns your NFTs into autonomous wallet agents. Beyond
            on-chain JPEGs, you can now carry out transactions and make on-chain
            history!
          </p>
        </li>
      </ul>
    </section>
  );
};

export default Features;
