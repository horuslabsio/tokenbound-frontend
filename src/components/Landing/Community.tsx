const Community = () => {
  return (
    <section className="bg-gradient-linear-starknet-gradient py-8 p-4 flex flex-col items-center justify-center gap-8  text-[#000000] my-0 mx-auto w-[95vw]  rounded-[20px] md:h-[50vh]">
      <h2 className="text-center">Join our Weekly Dev Call</h2>
      <p className="text-center lg:w-[40%]">
        Learn more about Starknet Tokenbound with the builders and contributors on Telegram
      </p>
      <div className="flex rounded-full gap-2 bg-white  w-fit p-3 md:rounded-full md:flex-row">
        <p className="p-2 bg-off-white rounded-full text-deep-blue font-medium">
          Every two weeks, on Saturdays
        </p>
        <p className="p-2 bg-deep-blue rounded-full text-white font-medium">
          6PM WAT
        </p>
      </div>
      <a
        className="md:w-[20rem] text-center block mt-4 mx-auto p-4 bg-deep-blue rounded-[8px] text-white"
        href="https://t.me/starknet_tokenbound"
        target="_blank"
        rel="noopener noreferrer"
      >
        Join Telegram Community
      </a>
    </section>
  );
};

export default Community;
