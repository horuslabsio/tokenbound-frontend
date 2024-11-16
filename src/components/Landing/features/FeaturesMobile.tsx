import { RightArrow } from "@public/icons";
import Image, { StaticImageData } from "next/image";
import { Button } from "ui/button";
import { FEATURES } from "@static/index";

const FeaturesMobile = () => {
  return (
    <div className="flex flex-col gap-8 md:hidden">
      {FEATURES.map((card) => (
        <Card
          key={card.id}
          link={card.link}
          title={card.title}
          src={card.sm_src}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default FeaturesMobile;

const Card = ({
  description,
  title,
  src,

  link,
}: {
  description: string;

  title: string;
  src: StaticImageData;
  link: string;
}) => {
  return (
    <figure className="flex h-[26rem] w-full max-w-[23.3rem] flex-col gap-4 rounded-[16px] bg-gray-100 p-4">
      <div
        className={`flex h-[11rem] w-full max-w-[21rem] overflow-clip rounded-[16px]`}
      >
        <Image
          className="h-full w-full scale-[1.02] rounded-[16px] object-cover"
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
            <a
              href={link}
              target="_blank"
              className="justify-start"
              rel="noopener noreferrer"
            >
              Explore
            </a>
          </Button>
        )}
      </figcaption>
    </figure>
  );
};
