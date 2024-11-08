import { LeftChevronIcon } from "@public/icons";

const DeployArrow = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative h-4 w-full text-xl text-[#D9D9D9]"
    >
      <span className="absolute left-[0.2rem] top-1/4 translate-y-[5%]">
        <LeftChevronIcon />
      </span>
      <div className="line-1 absolute -top-4 h-8 w-[125%] rounded-[20px] border border-[#D9D9D9] border-t-transparent"></div>
      <div className="line-2 absolute right-[1px] top-[-6.8rem] h-[6.8rem] w-[50%] translate-x-[150%] rounded-t-[16px] border border-[#D9D9D9] border-b-transparent border-r-transparent"></div>
      <div className="line-3 absolute right-0 top-[-13.53rem] h-[6.8rem] w-[50%] translate-x-[150%] rounded-b-[16px] border border-[#D9D9D9] border-l-transparent border-t-transparent"></div>
    </div>
  );
};

export default DeployArrow;