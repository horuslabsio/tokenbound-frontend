import { INavBarType } from "../types"; // Update the import to match your type definition

export const navItems: INavBarType[] = [
  {
    title: "Snip",
    url: "https://github.com/Starknet-Africa-Edu/SNIPs/blob/main/SNIPS/snip-72.md",
  },
  {
    title: "Github",
    url: "https://github.com/Starknet-Africa-Edu",
  },
  {
    title: "Telegram",
    url: "https://t.me/+mXVPO0nwBPU3ODBk",
  },
  {
    title: "SDK",
    url: "https://tokenbound.gitbook.io/starknet-tokenbound/",
  },
  {
    title: "Discussion",
    url: "  https://community.starknet.io/t/snip-72-non-fungible-tokenbound-accounts/112479",
  },
];

export const communityLinks: INavBarType[] = [
  {
    title: "Telegram",
    url: "https://t.me/+mXVPO0nwBPU3ODBk",
  },

  {
    title: "Discussion",
    url: "  https://community.starknet.io/t/snip-72-non-fungible-tokenbound-accounts/112479",
  },
];

export const learningLinks: INavBarType[] = [
  {
    title: "Snip",
    url: "https://github.com/Starknet-Africa-Edu/SNIPs/blob/main/SNIPS/snip-72.md",
  },
  {
    title: "Github",
    url: "https://github.com/Starknet-Africa-Edu",
  },

  {
    title: "SDK",
    url: "https://tokenbound.gitbook.io/starknet-tokenbound/",
  },
];

export const FAQs = [
  {
    id: "FQ1",
    question: "What does Tokenbound Account (TBA) mean?",
    answer:
      "A Token Bound Account is a smart contract account, controlled by an NFT. It can do everything a normal wallet can do and is compatible with every NFT you already own.",
  },
  {
    id: "FQ2",
    question: "How do I use ERC-6551 for my project?",
    answer:
      "ERC-6551 is open source and can be used by any project. However, there are a handful of companies that are working on tooling that will make it much easier for dapps to integrate.",
  },
  {
    id: "FQ3",
    question:
      "I’ve seen other projects where NFTs can own assets. How is ERC-6551 different?",
    answer:
      "Our implementation focuses on ease of use and adoption. Unlike other proposals and projects, Token Bound works with no action needed by project owners, no wrapping contracts, and no change to the ERC-721 standard. Most importantly, every ERC-721 and ERC-1155 NFT you already own works with Token Bound Accounts, projects and creators don’t need to deploy a whole new contract to use Token Bound, and you can start using ERC-6551 immediately.",
  },
  {
    id: "FQ4",
    question: "Why is ERC-6551 important? Why should I care?",
    answer:
      "Digital collectibles/art are the future of creation. More than ever, people around the world are using technology to create digital goods such as NFTs. ERC-6551 is the most effective way to increase the surface area of interaction for NFTs. It was designed to be easily adopted by existing marketplaces, wallets, and dapps. It is permissionless and decentralized so that no single company owns your NFT’s wallet. When it comes to token provenance ERC-6551 allows your NFT to have an on-chain identity where history is created from the NFT itself rather than your wallet.",
  },
  {
    id: "FQ5",
    question: "What can I put in my NFT’s token bound account?",
    answer:
      "Absolutely anything you would put into your old wallet. ETH, USDC, ERC-20, ERC-721, ERC-1155, and any other tokens you would normally send to your Braavos,ArgentX wallet.",
  },
  {
    id: "FQ6",
    question: "Can I nest my Token Bound NFTs inside of each other?",
    answer:
      "Yes! Since every NFT is a Token Bound Account, there are no limits to how many tokens you may have nested in your NFTs, or how far down you go. If you want to put an NFT inside of an NFT inside of an NFT you can. When you transfer that NFT to someone else, everything inside automatically goes along with it. This opens up many new patterns of bundling NFTs together for trading, gaming, governance and more.",
  },
  {
    id: "FQ7",
    question: "What are some of the core use cases for ERC-6551?",
    answer: [
      "Inventory system for owning items, outfits, equipment",
      "Community loyalty or reputation systems",
      "Minting or curating baskets of assets (art, collectibles, defi)",
      "Composable media structures (stems to songs, art layers to painting, digital textiles to garments)",
      "New on-chain game mechanics",
      "On-chain meme/derivative economies",
      "NFTs as onboarding vehicles instead of wallets",
    ],
  },
];
