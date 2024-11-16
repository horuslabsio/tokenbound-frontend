import { UpRightArrowIcon } from "@public/icons";
import { INavBarType } from "../../types";
import { Button } from "ui/button";

export const Anchor = ({ title, url }: { url: string; title: string }) => {
  return (
    <li>
      <Button
        variant={"ghost"}
        endIcon={<UpRightArrowIcon />}
        className="w-full justify-start rounded-[8px] transition-all duration-300 hover:bg-gray-100"
      >
        <a target="_blank" rel="noopener noreferrer" href={url}>
          {title}
        </a>
      </Button>
    </li>
  );
};

const DropDown = ({ dropdownItems }: { dropdownItems: INavBarType[] }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      style={{
        boxShadow:
          "0 0 2px 0 #c3c0c0, inset 0 0 2px 0 rgba(215, 210, 210, 0.2)",
      }}
      className={`fixed top-[4.7rem] grid rounded-[8px] bg-white p-1 transition-all duration-300 ease-in-out`}
    >
      <ul className="flex min-h-[5.1rem] w-[9.2rem] flex-col gap-1 rounded-[8px] p-1">
        {dropdownItems.map((item, index) => {
          const { title, url } = item;
          return <Anchor key={index} url={url} title={title} />;
        })}
      </ul>
    </div>
  );
};

export default DropDown;
