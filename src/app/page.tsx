import AppWrapper from "@/components/AppWrapper";
import { FAQ } from "../../static";


export default function Home() {
  return (
    <AppWrapper>
      <h1 className="text-black font-bold text-4xl md:text-5xl lg:text-5xl">Use any NFT as a wallet</h1>
      <p className="text-gray-700 my-2 text-xl md:text-2xl lg:text-2xl w-full md:w-full lg:w-[65%]">
        ERC-6551 turns every NFT into a smart wallet that can own tokens and
        interact with dApps across the Ethereum ecosystem.
      </p>

      <section className="mt-6">
        <div>
          <h2>Frequently asked questions</h2>
          <p>
            Want to learn more?{" "}
            <a href="#">
              {" "}
              <span className="underline underline-offset-1">
                {" "}
                Join the working group.
              </span>
            </a>
          </p>
        </div>

        <section>
          {FAQ.map((item, idx) => (
            <div key={idx} className="border-b last:border-b-0">
              <h3 className="my-6 text-xl font-bold">{item.title}</h3>
              <p className="my-6 text-gray-700 text-lg">{item.description}</p>
            </div>
          ))}
        </section>
      </section>
    </AppWrapper>
  );
}
