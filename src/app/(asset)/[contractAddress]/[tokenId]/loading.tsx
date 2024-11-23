const Loading = () => {
  return (
    <section className="mx-auto min-h-screen max-w-[1125px] px-4 pb-16 pt-32 2xl:max-w-[1490px]">
      <div className="mx-auto w-full max-w-[31.5rem] lg:grid lg:max-w-none lg:grid-cols-2">
        <div className="h-[17.1rem] overflow-clip rounded-[16px] bg-gray-100 md:h-[31.5rem] md:max-w-[31.5rem] 2xl:h-[41.5rem] 2xl:w-[41.5rem] 2xl:max-w-none"></div>
        <div>
          <div className="mt-4 h-[5rem] rounded-[16px] bg-gray-100 p-2 md:max-w-[31.5rem] lg:max-w-[38rem] 2xl:max-w-[50rem]"></div>
          <div className="mt-4 h-[23rem] rounded-[16px] bg-gray-100 p-2 md:max-w-[31.5rem] lg:max-w-[38rem] 2xl:h-[33rem] 2xl:max-w-[50rem]"></div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
