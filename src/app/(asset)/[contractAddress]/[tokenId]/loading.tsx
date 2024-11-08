const Loading = () => {
  return (
    <section className="mx-auto min-h-screen max-w-[1125px] animate-pulse px-4 pb-16 pt-32">
      <div className="grid w-full grid-cols-[1fr] md:grid-cols-2">
        <div className="h-[31.5rem] w-[31.5rem] overflow-clip rounded-[16px] bg-gray-100"></div>
        <div>
          <div className="mt-4 h-[5rem] w-[38rem] rounded-[16px] bg-gray-100 p-2"></div>
          <div className="mt-4 h-[23rem] w-[38rem] rounded-[16px] bg-gray-100 p-2"></div>
        </div>
      </div>
    </section>
  );
};

export default Loading;
