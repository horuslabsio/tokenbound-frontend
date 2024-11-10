import { RightArrow } from "@public/icons";
import Image from "next/image";
import { Button } from "ui/button";

const Card = ({
  description,
  title,
  src,
  button,
  link,
}: {
  description: string;
  button: string;
  title: string;
  src: string;
  link: string;
}) => {
  return (
    <figure className="flex h-[26rem] w-full max-w-[23.3rem] flex-col gap-4 rounded-[16px] bg-gray-100 p-4">
      <div
        className={`flex h-[11rem] w-full max-w-[21rem] overflow-clip rounded-[16px] bg-gradient-linear-primary`}
      >
        <Image
          className="h-full w-full scale-[1.02] rounded-[16px] object-cover transition-all duration-500 group-hover:scale-[1.15]"
          src={src}
          alt=""
        />
      </div>
      <figcaption className="flex h-[13rem] flex-col gap-4">
        <h5 className="text-xl capitalize">{title}</h5>
        <p className="flex-1 overflow-hidden first-letter:uppercase">
          {description}
        </p>
        {title !== "Explorer" && (
          <Button
            asChild
            variant={"gray"}
            className="w-[7rem] bg-white py-2 shadow-sm"
            endIcon={<RightArrow />}
          >
            <a href={link} target="_blank" rel="noopener noreferrer">
              <span className="text-start">{button}</span>
            </a>
          </Button>
        )}
      </figcaption>
    </figure>
  );
};
const MobileShowCase = () => {
  return (
    <div className="flex flex-col gap-8">
      <Card
        button="Explore"
        description="loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe"
        link=""
        src=""
        title="Explorer"
      />
      <Card
        button="Explore"
        description="loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe"
        link="https://docs.tbaexplorer.com/sdk"
        src=""
        title="SDK"
      />
      <Card
        button="Explore"
        description="loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe"
        link="https://docs.tbaexplorer.com/toolings/tokenbound-connectkit"
        src=""
        title="Connect Kit"
      />
      <Card
        button="Explore"
        description="loreem lnejwdnkjenw jnenkvme jknesknew nebkjbevw m lnejwdnkjenw jnenkvme jknesknew nebkjbevw ebiejw tegwijhfoe"
        link="https://docs.tbaexplorer.com/toolings/tokenbound-iframe"
        src=""
        title="TBA Iframe"
      />
    </div>
  );
};

export default MobileShowCase;
