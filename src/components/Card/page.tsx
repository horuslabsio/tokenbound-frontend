import Image from "next/image";
import sword from "../../../public/sword.jpg";
import { BiCopyAlt } from "react-icons/bi";
import Link from "next/link";

const Card = () => {

  return (
    <div className="w-full cursor-pointer  p-4">
      <Link href={`/assets/1`} >
        <div className=" rounded overflow-hidden shadow-lg">
          <Image className="w-full" src={sword} alt="Card Image" />

          <div className="px-6 py-4 bg-white">
            <div className="font-bold text-xl mb-2">YinYang</div>

            <p className="inline-flex items-center p-[2px] bg-gray-200 cursor-pointer rounded-full hover:transform hover:scale-110">
              <span className="text-gray-400">0x1234...8567</span>
              <span className="ml-1">
                <BiCopyAlt />
              </span>
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Card;
