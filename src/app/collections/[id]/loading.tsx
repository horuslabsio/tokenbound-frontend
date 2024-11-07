const Loading = () => {
  return (
    <section className="mx-auto min-h-screen max-w-[1125px] pt-32">
      <div className="mb-8 flex items-center justify-start gap-1 space-x-4">
        <h2 className="text-4xl font-medium text-black">
          My <span className="text-gradient">NFTs</span>
        </h2>
        <div className="flex h-[2.1rem] w-[10rem] items-center justify-between rounded-full bg-gray-100 px-4 py-2 shadow-inner"></div>
      </div>

      <div className="mx-auto grid h-auto min-h-screen auto-cols-auto gap-6 gap-y-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="h-[15.6rem] w-[19rem] animate-pulse rounded-[16px] bg-gray-100"></div>
        <div className="h-[15.6rem] w-[19rem] animate-pulse rounded-[16px] bg-gray-100"></div>
        <div className="h-[15.6rem] w-[19rem] animate-pulse rounded-[16px] bg-gray-100"></div>
        <div className="h-[15.6rem] w-[19rem] animate-pulse rounded-[16px] bg-gray-100"></div>
      </div>
    </section>
  );
};

export default Loading;
