This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Getting Started
Check the .env.example and fill in the appropriate values:
- NEXT_PUBLIC_ALCHEMY_API_KEY = <use an api key from Alchemy>
- NEXT_PUBLIC_INFURA_API_KEY = <use an api key from Infura>
- NEXT_PUBLIC_NETWORK = <starknet-mainnet | starknet-goerli>
- NEXT_PUBLIC_EXPLORER = <https://testnet.starkscan.co | https://starkscan.co>

PS: The page that gets all NFTs belonging to the user is currently broken on testnet due to an issue with Alchemy's API, and the Token bound Register contract is yet to be deployed to mainnet.
