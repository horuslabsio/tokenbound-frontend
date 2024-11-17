const Loading = () => {
  return (
    <section className="mx-auto min-h-screen max-w-[28rem] px-4 pt-24 md:max-w-[1125px] md:pt-32 2xl:max-w-[1536px]">
      <div className="mb-8 flex items-center justify-start gap-1 space-x-4">
        <h2 className="text-4xl font-medium text-black">
          My <span className="text-gradient">NFTs</span>
        </h2>
      </div>
      <div className="mx-auto flex h-auto min-h-screen max-w-[19rem] auto-cols-auto flex-col gap-4 md:grid md:max-w-none md:grid-cols-2 md:gap-6 md:gap-y-6 lg:grid-cols-4">
        <div className="h-[15.6rem] w-full max-w-[19rem] animate-pulse rounded-[16px] bg-gray-100 2xl:h-[28rem] 2xl:max-w-[29rem]"></div>
        <div className="h-[15.6rem] w-full max-w-[19rem] animate-pulse rounded-[16px] bg-gray-100 2xl:h-[28rem] 2xl:max-w-[29rem]"></div>
        <div className="h-[15.6rem] w-full max-w-[19rem] animate-pulse rounded-[16px] bg-gray-100 2xl:h-[28rem] 2xl:max-w-[29rem]"></div>
        <div className="h-[15.6rem] w-full max-w-[19rem] animate-pulse rounded-[16px] bg-gray-100 2xl:h-[28rem] 2xl:max-w-[29rem]"></div>
      </div>
    </section>
  );
};

export default Loading;
