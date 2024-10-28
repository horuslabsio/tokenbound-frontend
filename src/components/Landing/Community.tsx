const Community = () => {
  return (
    <section className="mx-auto my-0 flex w-[95vw] flex-col items-center justify-center gap-8 rounded-[20px] bg-gradient-linear-starknet-gradient p-4 py-16 text-[#000000]">
      <h2 className="text-center">Join our Weekly Dev Call</h2>
      <p className="text-center lg:w-[40%]">
        Learn more about Starknet Tokenbound with the builders and contributors
        on Telegram
      </p>
      <div className="flex w-fit gap-2 rounded-full bg-white p-3 md:flex-row md:rounded-full">
        <p className="rounded-full bg-off-white p-2 font-medium text-deep-blue">
          Every two weeks, on Saturdays
        </p>
        <p className="rounded-full bg-deep-blue p-2 font-medium text-white">
          6PM WAT
        </p>
      </div>
      <a
        className="h-[3rem] rounded-[8px] bg-deep-blue px-8 py-3 text-white"
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
