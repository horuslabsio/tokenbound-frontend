import { RightArrow } from "@public/icons";
import Image, { StaticImageData } from "next/image";
import { Button } from "ui/button";
import IMG_0 from "../../../../public/features/0.png";
import IMG_1 from "../../../../public/features/1.png";
import IMG_2 from "../../../../public/features/2.png";
import IMG_3 from "../../../../public/features/3.png";
const FeaturesMobile = () => {
  return (
    <div className="flex flex-col gap-8">
      <Card
        button=""
        description="Effortlessly deploy, track, and manage Tokenbound Accounts (TBAs) with our intuitive Explorer. This user-friendly interface allows you to view and interact with wallets associated with your NFTs, providing a seamless experience for both new and experienced users."
        link=""
        src={IMG_0}
        title="Explorer"
      />
      <Card
        button="Explore"
        description="Our Software Development Kit (SDK) equips developers with ready-made tools and functions to integrate token-bound accounts into their projects quickly and efficiently. Simplify workflows, reduce development time, and add powerful token-bound functionality to your apps, whether you’re creating a marketplace, game, or something entirely new."
        link="https://docs.tbaexplorer.com/sdk"
        src={IMG_1}
        title="SDK"
      />
      <Card
        button="Explore"
        description="Tokenbound accounts don’t appear in regular wallets, but with the Connect Kit, they’re just a link away. Easily connect your token-bound account to the wallet holding your NFT, giving you full control to sign, approve, and manage transactions. Experience smooth integration between your wallets and token-bound accounts."
        link="https://docs.tbaexplorer.com/toolings/tokenbound-connectkit"
        src={IMG_2}
        title="Connect Kit"
      />
      <Card
        button="Explore"
        description="The iFrame tool lets you display your NFT and its token-bound account, along with any assets it holds, in a sleek, customizable format. Whether it’s a marketplace or a portfolio, effortlessly demo the full capabilities of token-bound accounts in one unified view—perfect for creators, collectors, and businesses alike."
        link="https://docs.tbaexplorer.com/toolings/tokenbound-iframe"
        src={IMG_3}
        title="TBA Iframe"
      />
    </div>
  );
};

export default FeaturesMobile;

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
  src: StaticImageData;
  link: string;
}) => {
  return (
    <figure className="flex h-[26rem] w-full max-w-[23.3rem] flex-col gap-4 rounded-[16px] bg-gray-100 p-4">
      <div
        className={`flex h-[11rem] w-full max-w-[21rem] overflow-clip rounded-[16px]`}
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
