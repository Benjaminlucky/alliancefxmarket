import React from "react";
import { MdOutlineShield } from "react-icons/md";
import { GiWallet } from "react-icons/gi";
import { FaExclamationTriangle } from "react-icons/fa";
import { RiCustomerService2Fill } from "react-icons/ri";
import { TbUserSquareRounded } from "react-icons/tb";
import { BsBriefcaseFill } from "react-icons/bs";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { SiGraphql } from "react-icons/si";
import { FiKey } from "react-icons/fi";
import { FaBitcoin } from "react-icons/fa";
import { RiShieldKeyholeFill } from "react-icons/ri";
import { FaAward } from "react-icons/fa6";
import { MdBalance } from "react-icons/md";
import { MdOutlineAutoGraph } from "react-icons/md";
import { FaMagnifyingGlassDollar } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";

export const links = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Company",
    path: "/company",
  },
  { name: "Trading", path: "/trading" },
  { name: "Contact", path: "/contact" },
];

export const perks = [
  {
    name: "Trusted & Regulated",
    icon: MdOutlineShield, // Reference to the component, no JSX
  },
  {
    name: "Fast Deposit & Withdrawal",
    icon: GiWallet, // Reference to the component
  },
  {
    name: "Risk Management",
    icon: FaExclamationTriangle, // Reference to the component
  },
  {
    name: "24/7 Customer Support",
    icon: RiCustomerService2Fill, // Reference to the component
  },
];

export const trackRecords = [
  {
    name: "Years in the Market",
    number: "5+",
  },
  {
    name: "Withdrawals",
    number: "500+ Million",
  },
  {
    name: "Events",
    number: "500+",
  },
  {
    name: "Trading Assets",
    number: "100+",
  },
];

export const ToInvest = [
  {
    icon: TbUserSquareRounded,
    title: "Create an Account",
    text: "Your first step to financial freedom is by creating an account with us.",
  },
  {
    icon: BsBriefcaseFill,
    title: "Choose a Package",
    text: "Start investing by choosing a package that suits your budget/trading strategies and easily make deposits with reliable payment channels.",
  },
  {
    icon: FaMoneyBillTransfer,
    title: "Trade",
    text: "Once deposit is confirmed, trades can immediately be placed with instant live updates.",
  },
];

export const tradingAssets = [
  {
    icon: SiGraphql,
    title: "Instant Trading",
    text: "Deposit is confirmed immediately after successful transaction to fund the account and trading can start instantly.",
  },
  {
    icon: FiKey,
    title: "Safe and Secure",
    text: "Encryption of account is taking to a high degree for best secure protection.",
  },
  {
    icon: FaBitcoin,
    title: "Bitcoin Transaction",
    text: "Encryption of account is taking to a high degree for best secure protection.",
  },
];

export const whyChoose = [
  {
    icon: RiShieldKeyholeFill,
    title: "Secured & Regulated",
  },
  {
    icon: FaAward,
    title: "Award Winning",
  },
  {
    icon: MdBalance,
    title: "Leverage",
  },
  {
    icon: MdOutlineAutoGraph,
    title: "Advanced Trading Platform",
  },
  {
    icon: FaMagnifyingGlassDollar,
    title: "500+ Trading Instruments",
  },
];

export const testimony = [
  {
    image: "../../assets/headshot1.jpg",
    name: "Sarah M",
    Designation: "Novice Trader",
    testimony:
      "I was new to forex trading and felt overwhelmed by the complexity of the market. But this company made it easy for me to get started. Their platform is user-friendly, and the educational resources are top-notch. Within a few months, I started seeing consistent profits. The support team is always available to answer my questions. I couldn’t have asked for a better trading partner!",
    icon: FaXTwitter,
  },
  {
    image: "../../assets/headshot2.jpg",
    name: "James R",
    Designation: "Experienced Investor",
    testimony:
      "Switching to this forex trading company was the best decision I made for my investment portfolio. Their advanced tools and real-time market insights have given me a significant edge in my trades. I appreciate the transparency and security they provide, which is crucial in today’s volatile markets. Highly recommended for both beginners and seasoned traders!",
    icon: FaXTwitter,
  },
  {
    image: "../../assets/headshot3.jpg",
    name: "Emily T",
    Designation: "Professional Trader",
    testimony:
      "I've been trading forex for years, but it wasn't until I joined this company that I truly started to maximize my potential. Their innovative trading strategies and automated tools have helped me make informed decisions with confidence. I also love their community of traders, where I can share ideas and get advice. It’s more than just a trading platform; it’s a comprehensive trading experience.",
    icon: FaXTwitter,
  },
];

export const difference = [
  {
    id: 1,
    point: (
      <>
        <span className="font-bold text-white">We Want You to Succeed</span> –
        Learn from the best with our wide range of educational tools, economic
        calendar, technical and fundamental analysis and important market
        updates you don’t want to miss.
      </>
    ),
  },
  {
    id: 2,
    point: (
      <>
        <span className="font-bold text-white">
          We Believe in Endless Possibilities{" "}
        </span>
         - Access the world’s most popular instruments, ranging from forex pairs
        to cryptocurrencies - all at the palm of your hand.
      </>
    ),
  },
  {
    id: 3,
    point: (
      <>
        <span className="font-bold text-white">
          We Provide Our Traders With Superior Trading Conditions
        </span>
         - No restrictions on short selling and scalping as well as ultra-low
        spreads.
      </>
    ),
  },
  {
    id: 4,
    point: (
      <>
        <span className="font-bold text-white">We Value Your Time</span>– Enjoy
        Fast and reliable order execution and a 24-hour live customer service.
      </>
    ),
  },
  {
    id: 5,
    point: (
      <>
        <span className="font-bold text-white">
          We Believe You Deserve The Best
        </span>
         – Take advantage of our Expert Advisors and Copy Trading platforms as
        well as 24/7 cryptocurrency trading.
      </>
    ),
  },
  {
    id: 6,
    point: (
      <>
        <span className="font-bold text-white">We Never Compromise</span> – With
        regulatory licenses across 6 jurisdictions, we will ensure a hassle-free
        trading experience.
      </>
    ),
  },
];
