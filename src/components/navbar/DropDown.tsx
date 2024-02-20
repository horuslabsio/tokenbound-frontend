import { INavBarType } from "../../types";
import Image from "next/image";

export const Anchor = ({
  src,
  title,
  url,
}: {
  url: string;
  title: string;
  src: string;
}) => {
  return (
    <li>
      <a
        className="flex gap-3 items-center text-deep-blue "
        target="_blank"
        rel="noopener noreferrer"
        href={url}
      >
        <span
          style={{
            boxShadow:
              "0 0 2px 0 #c3c0c0, inset 0 0 2px 0 rgba(85, 85, 85, 0.2)",
          }}
          className="bg-white w-[30px] h-[30px] md:w-[40px] md:h-[40px] rounded-lg shadow-inner"
        >
          <Image src={src} alt="logo" width={30} height={30} />
        </span>
        {title}
      </a>
    </li>
  );
};

const DropDown = ({
  dropdownItems,
  activeDropDown,
  openDropDown,
  id,
}: {
  dropdownItems: INavBarType[];
  openDropDown: boolean;
  activeDropDown: string;
  id: string;
}) => {
  return (
    <div
      style={{
        boxShadow: "0 0 2px 0 #c3c0c0, inset 0 0 2px 0 rgba(85, 85, 85, 0.2)",
      }}
      className={`rounded-lg fixed top-[4.7rem] bg-off-white transition-all duration-300 ease-in-out grid ${
        openDropDown && activeDropDown === id
          ? "grid-rows-[1fr] opacity-100"
          : "grid-rows-[0fr] opacity-0"
      } `}
    >
      <div className="overflow-hidden">
        <ul className="grid grid-cols-2 gap-8 p-8 min-w-[20rem] min-h-[7rem]">
          {dropdownItems.map((item, index) => {
            const { title, url } = item;
            return (
              <Anchor
                key={index}
                url={url}
                src="/blockchain-05.svg"
                title={title}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
