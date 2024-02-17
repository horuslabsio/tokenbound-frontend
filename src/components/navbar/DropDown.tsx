import { INavBarType } from "../../types";
import Image from "next/image";

const Anchor = ({
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

const DropDown = ({ dropdownItems }: { dropdownItems: INavBarType[] }) => {
  return (
    <ul className="rounded-b-lg fixed grid grid-cols-2 gap-8 p-8 top-[4rem] bg-off-white min-w-[20rem] min-h-[7rem]">
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
  );
};

export default DropDown;
