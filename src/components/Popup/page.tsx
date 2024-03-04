import * as React from "react";

function AssetCard({ asset, amount, currencyValue, currency }) {
  return (
    <div className="flex gap-3 justify-between px-4 py-3.5 mt-2 whitespace-nowrap bg-white rounded-lg">
      <img 
        loading="lazy" 
        src={asset.icon} 
        className="my-auto w-8 aspect-square" 
        alt={asset.name}
      />
      <div className="flex gap-5 justify-between">
        <div className="flex flex-col justify-center my-auto">
          <div className="text-base text-indigo-950">{asset.symbol}</div>
          <div className="mt-1 text-xs font-medium leading-loose text-neutral-500">
            {asset.name}
          </div>
        </div>
        <div className="flex gap-0.5 justify-between">
          <div className="flex flex-col flex-1 justify-center">
            <div className="text-base text-indigo-950">{amount}</div>
            <div className="mt-1 text-sm font-medium leading-4 text-neutral-500">
              {currencyValue}
            </div>
          </div>
          <img 
            loading="lazy" 
            src={asset.arrowIcon} 
            className="my-auto aspect-square w-[30px]" 
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

function WalletInteractionForm() {
  return (
    <section className="flex flex-col px-9 pt-6 pb-12 rounded-2xl shadow-2xl bg-neutral-50 max-w-[425px]">
      <header className="flex gap-5 justify-between text-xl font-medium whitespace-nowrap text-indigo-950">
        <h1 className="my-auto">Send</h1>
        <img 
          loading="lazy" 
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/ec53b22fe610b95e77eb964fad9f72dfec99de6b2ae56a0c65f2155181d515eb?apiKey=79fc86ba81124d9abacc6ff94f9a59ee&" 
          className="w-10 aspect-square" 
          alt="Send Icon"
        />
      </header>
      <div className="mt-6 text-sm font-medium text-indigo-950">Asset</div>
      <AssetCard
        asset={{
          name: "Ethereum",
          symbol: "ETH",
          icon: "https://cdn.builder.io/api/v1/image/assets/TEMP/55afc816a0ddfb8c80a3f8c5a2909acb340dc38c573b2c7caa83e8e653501aa6?apiKey=79fc86ba81124d9abacc6ff94f9a59ee&",
          arrowIcon: "https://cdn.builder.io/api/v1/image/assets/TEMP/bdd6f67ca4e015c2286d8cb7e6a3e38ed5178ca5f19387dd6b1f93133429167b?apiKey=79fc86ba81124d9abacc6ff94f9a59ee&",
        }}
        amount="0.0001"
        currencyValue="$10.005"
        currency="USD"
      />
      <div className="mt-6 text-sm font-medium text-indigo-950"> Wallet Address </div>
      <input 
        className="justify-center px-4 py-3.5 mt-2 text-base whitespace-nowrap rounded-lg border border-solid bg-neutral-50 border-stone-300 text-neutral-500" 
        placeholder="Enter Wallet Address" 
        type="text"
      />
      <div className="mt-4 text-sm font-medium text-indigo-950">Amount</div>
      <input 
        className="justify-center px-4 py-3.5 mt-2 text-base whitespace-nowrap rounded-lg border border-solid bg-neutral-50 border-stone-300 text-neutral-500" 
        placeholder="Enter Amount" 
        type="text"
      />
      <button 
        className="flex justify-center items-center px-16 py-3.5 mt-6 w-full text-base text-center whitespace-nowrap rounded-lg bg-indigo-950 text-neutral-50"
        type="button"
      >
        <div className="flex gap-1">
          <span className="grow">Go to Sign</span>
          <img 
            loading="lazy" 
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/55afc816a0ddfb8c80a3f8c5a2909acb340dc38c573b2c7caa83e8e653501aa6?apiKey=79fc86ba81124d9abacc6ff94f9a59ee&" 
            className="w-5 aspect-square" 
            alt="Arrow"
          />
        </div>
      </button>
    </section>
  );
}

export default WalletInteractionForm;