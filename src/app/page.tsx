import AppWrapper from "@components/AppWrapper";
import { FAQ } from "@static/index";

export default function Home() {
  return (
    <AppWrapper>
      <h1 className="text-black">Use any NFT as a wallet</h1>
      <h2 className="text-black">Use any NFT as a wallet</h2>
      <h3 className="text-black">Use any NFT as a wallet</h3>
      <h4 className="text-black">Use any NFT as a wallet</h4>
      <h5 className="text-black">Use any NFT as a wallet</h5>
      <h6 className="text-black">Use any NFT as a wallet</h6>
      <p className="text-black">Use any NFT as a wallet</p>

      <p className="text-gray-700 my-2 text-xl md:text-2xl lg:text-2xl w-full md:w-full lg:w-[65%]">
        ERC-6551 turns every NFT into a smart wallet that can own tokens and
        interact with dApps across the Ethereum ecosystem.
      </p>

      <section className="mt-6">
        <div>
          <h2>Frequently asked questions</h2>
          <p>
            Want to learn more?{" "}
            <span className="underline underline-offset-1 text-blue-600">
              {" "}
              <a
                href="https://t.me/+mXVPO0nwBPU3ODBk"
                target="_blank"
                rel="noopener noreferrer"
              >
                Discuss all things ERC-6551 On Telegram
              </a>
            </span>
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
