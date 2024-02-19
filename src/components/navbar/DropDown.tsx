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
        <span className="bg-white w-[40px] h-[40px] rounded-lg shadow-inner">
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
      className={`rounded-b-lg fixed top-[4.5rem] bg-off-white transition-all duration-300 ease-in-out grid ${
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
