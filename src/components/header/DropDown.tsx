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
        className="flex items-center gap-3 text-deep-blue"
        target="_blank"
        rel="noopener noreferrer"
        href={url}
      >
        <span
          style={{
            boxShadow:
              "0 0 2px 0 #c3c0c0, inset 0 0 2px 0 rgba(85, 85, 85, 0.2)",
          }}
          className="h-[30px] w-[30px] rounded-lg bg-white shadow-inner md:h-[40px] md:w-[40px]"
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
      onClick={(e) => e.stopPropagation()}
      style={{
        boxShadow:
          "0 0 2px 0 #c3c0c0, inset 0 0 2px 0 rgba(215, 210, 210, 0.2)",
      }}
      className={`fixed top-[4.7rem] grid rounded-[16px] bg-white transition-all duration-300 ease-in-out`}
    >
      <div className="overflow-hidden">
        <ul className="grid min-h-[7rem] min-w-[20rem] grid-cols-2 gap-8 p-8">
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
