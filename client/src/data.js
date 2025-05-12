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
import { MdDashboard } from "react-icons/md";
import { RiSecurePaymentFill } from "react-icons/ri";
import { BiCoinStack } from "react-icons/bi";
import { FaWallet } from "react-icons/fa";
import { FaPiggyBank } from "react-icons/fa6";
import { IoIosPeople } from "react-icons/io";
import { MdTableChart } from "react-icons/md";
import { FaBitcoinSign } from "react-icons/fa6";
import { IoMdLogOut } from "react-icons/io";

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
      "I was new to Investing and felt overwhelmed by the complexity of the market. But this company made it easy for me to get started. Their platform is user-friendly, and the educational resources are top-notch. Within a few months, I started seeing consistent profits. The support team is always available to answer my questions. I couldn’t have asked for a better trading partner!",
    icon: FaXTwitter,
  },
  {
    image: "../../assets/headshot2.jpg",
    name: "James R",
    Designation: "Experienced Investor",
    testimony:
      "Switching to this  company was the best decision I made for my investment portfolio. Their advanced tools and real-time market insights have given me a significant edge in my returns. I appreciate the transparency and security they provide, which is crucial in today’s volatile markets. Highly recommended for both beginners and seasoned traders!",
    icon: FaXTwitter,
  },
  {
    image: "../../assets/headshot3.jpg",
    name: "Emily T",
    Designation: "Professional Trader",
    testimony:
      "I've been investing for years, but it wasn't until I joined this company that I truly started to maximize my potential. Their innovative trading strategies and automated tools have helped me make informed decisions with confidence. I also love their community of traders, where I can share ideas and get advice. It’s more than just a trading platform; it’s a comprehensive trading experience.",
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

export const usefulLinks = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "About",
    link: "/about",
  },
  {
    name: "Plans",
    link: "/plans",
  },
  {
    name: "Login",
    link: "/signin",
  },
  {
    name: "Register",
    link: "/signup",
  },
  {
    name: "Contact",
    link: "/contact",
  },
];

export const documents = [
  {
    name: "Terms & Conditions",
    link: "/terms-condition",
  },
  {
    name: "Privacy Policy",
    link: "/privacy-policy",
  },
  {
    name: "Trading Assets",
    link: "#",
  },
  {
    name: "Payment Policy",
    link: "#",
  },
  {
    name: "FAQ",
    link: "#",
  },
];

export const contact = [
  {
    address:
      "Tunofex Fx Market, 70 w. Madison Street, Ste. 1400 Chicago, 1160602",
  },
  {
    address: "support@tunofexfxmarket.com",
  },
];

export const dashnavigation = [
  {
    label: "Dashboard",
    link: "/",
    icon: MdDashboard,
  },
  {
    label: "Make Deposit",
    link: "/payments",
    icon: RiSecurePaymentFill,
  },
  {
    label: "Invest with Profit",
    link: "/invest",
    icon: BiCoinStack,
  },
  {
    label: "Earning",
    link: "/earning",
    icon: FaWallet,
  },
  {
    label: "Referral",
    link: "/referral",
    icon: IoIosPeople,
  },
  {
    label: "Plans",
    link: "/plans",
    icon: MdTableChart,
  },
  {
    label: "Withdrawals",
    link: "/withdrawal",
    icon: FaMoneyBillTransfer,
  },
  {
    label: "Log Out",
    link: "/logout",
    icon: IoMdLogOut,
  },
];

export const plans = [
  {
    id: 1,
    plan: "Starter Plan",
    amount: "$500",
    list: [
      "Minimum Deposit $500",
      "Spreads from 3.3 pips",
      "Leverage 1:300",
      "Live Chart Support",
    ],
  },
  {
    id: 2,
    plan: "Standard Plan",
    amount: "$3,000",
    list: [
      "Minimum Deposit $3,000",
      "Spreads from 3.3 pips",
      "Leverage 1:5000",
      "Live Chart Support",
    ],
  },
  {
    id: 3,
    plan: "Basic Plan",
    amount: "$5,000",
    list: [
      "Minimum Deposit $5,000",
      "Spreads from 3.3 pips",
      "Leverage 1:5000",
      "All Available Platforms",
      "Access All Education Tools",
      "Technical Analysis Report",
      "Market Update Emails",
      "Live Chart Support",
    ],
  },
  {
    id: 4,
    plan: "Silver Plan",
    amount: "$10,000",
    list: [
      "Minimum Deposit $10,000",
      "Spreads from 3.3 pips",
      "Leverage 1:5000",
      "All Available Platforms",
      "Access All Education Tools",
      "Technical Analysis Report",
      "Market Update Emails",
      "Live Chart",
    ],
  },
  {
    id: 5,
    plan: "Gold Plan",
    amount: "$25,000",
    list: [
      "Minimum Deposit $25,000",
      "Spreads from 3.3 pips",
      "Leverage 1:5000",
      "All Available Platforms",
      "Access All Education Tools",
      "Technical Analysis Report",
      "Market Update Emails",
      "Live Chart Support",
    ],
  },
  {
    id: 6,
    plan: "Platinum Plan",
    amount: "$50,000",
    list: [
      "Minimum Deposit $50,000",
      "Spreads from 3.3 pips",
      "Leverage 1:5000",
      "All Available Platforms",
      "Access All Education Tools",
      "Technical Analysis Report",
      "Market Update Emails",
      "Live Chart Support",
    ],
  },
  {
    id: 7,
    plan: "Diamond Plan",
    amount: "$100,000",
    list: [
      "Minimum Deposit $100,000",
      "Spreads from 3.3 pips",
      "Leverage 1:5000",
      "All Available Platforms",
      "Access All Education Tools",
      "Technical Analysis Report",
      "Market Update Emails",
      "Live Chart Support",
    ],
  },
  {
    id: 8,
    plan: "VIP Plan",
    amount: "$150,000",
    list: [
      "Minimum Deposit $150,000",
      "Spreads from 3.3 pips",
      "Leverage 1:5000",
      "All Available Platforms",
      "Access All Education Tools",
      "Technical Analysis Report",
      "Market Update Emails",
      "Live Chart Support",
    ],
  },
  {
    id: 9,
    plan: "Premium Plan",
    amount: "$200,000",
    list: [
      "Minimum Deposit $200,000",
      "Spreads from 3.3 pips",
      "Leverage 1:5000",
      "All Available Platforms",
      "Access All Education Tools",
      "Technical Analysis Report",
      "Market Update Emails",
      "Live Chart Support",
    ],
  },
  {
    id: 10,
    plan: "Executive Plan",
    amount: "$300,000",
    list: [
      "Minimum Deposit $300,000",
      "Spreads from 3.3 pips",
      "Leverage 1:5000",
      "All Available Platforms",
      "Access All Education Tools",
      "Technical Analysis Report",
      "Market Update Emails",
      "Live Chart Support",
    ],
  },
  {
    id: 11,
    plan: "Ultimate Plan",
    amount: "$500,000",
    list: [
      "Minimum Deposit $500,000",
      "Spreads from 3.3 pips",
      "Leverage 1:5000",
      "All Available Platforms",
      "Access All Education Tools",
      "Technical Analysis Report",
      "Market Update Emails",
      "Live Chart Support",
    ],
  },
];

export const wallets = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <g fill="none">
          <g fill="currentColor" clip-path="url(#akarIconsBitcoinFill0)">
            <path d="M11.385 15.275c1.111-.004 3.54-.013 3.512-1.558c-.027-1.58-2.36-1.485-3.497-1.438q-.192.009-.332.011l.052 2.987q.114-.003.265-.002m-.118-4.353c.927-.001 2.95-.003 2.926-1.408c-.026-1.437-1.969-1.352-2.918-1.31q-.16.008-.278.01l.047 2.709z" />
            <path
              fill-rule="evenodd"
              d="M9.096 23.641c6.43 1.603 12.942-2.31 14.545-8.738C25.244 8.474 21.33 1.962 14.9.36C8.474-1.244 1.962 2.67.36 9.1c-1.603 6.428 2.31 12.94 8.737 14.542m4.282-17.02c1.754.124 3.15.638 3.333 2.242c.136 1.174-.344 1.889-1.123 2.303c1.3.288 2.125 1.043 1.995 2.771c-.161 2.145-1.748 2.748-4.026 2.919l.038 2.25l-1.356.024l-.039-2.22q-.526.01-1.084.008l.04 2.23l-1.356.024l-.04-2.254l-.383.003q-.292 0-.586.006l-1.766.03l.241-1.624s1.004-.002.986-.017c.384-.008.481-.285.502-.459L8.693 11.3l.097-.002h.046a1 1 0 0 0-.144-.007l-.044-2.54c-.057-.274-.241-.59-.79-.58c.015-.02-.986.017-.986.017L6.846 6.74l1.872-.032v.007q.423-.008.863-.026L9.543 4.46l1.356-.023l.038 2.184c.362-.013.726-.027 1.083-.033l-.038-2.17l1.357-.024z"
              clip-rule="evenodd"
            />
          </g>
          <defs>
            <clipPath id="akarIconsBitcoinFill0">
              <path fill="#fff" d="M0 0h24v24H0z" />
            </clipPath>
          </defs>
        </g>
      </svg>
    ),
    address: "bc1qdq5evcmvv659hlpt8trnfs5j9p78kx09gznyxd",
    link: "Copy Bitcoin Wallet",
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M16 0c8.837 0 16 7.163 16 16s-7.163 16-16 16S0 24.837 0 16S7.163 0 16 0M7.5 7.257l7.595 19.112l10.583-12.894l-3.746-3.562zm16.252 6.977l-7.67 9.344l.983-8.133zM9.472 9.488l6.633 5.502l-1.038 8.58zM21.7 11.083l2.208 2.099l-6.038 1.093zM10.194 8.778l10.402 1.914l-4.038 3.364z"
        />
      </svg>
    ),
    address: "TBEsqgicf5xEwCyra5mTmCL3me15ZtES8w",
    link: "Copy TRON Wallet",
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16s-7.163 16-16 16m-3.884-17.596L16 10.52l3.886 3.886l2.26-2.26L16 6l-6.144 6.144zM6 16l2.26 2.26L10.52 16l-2.26-2.26zm6.116 1.596l-2.263 2.257l.003.003L16 26l6.146-6.146v-.001l-2.26-2.26L16 21.48zM21.48 16l2.26 2.26L26 16l-2.26-2.26zm-3.188-.002h.001L16 13.706L14.305 15.4l-.195.195l-.401.402l-.004.003l.004.003l2.29 2.291l2.294-2.293l.001-.001l-.002-.001z"
        />
      </svg>
    ),
    address: "0x564dFaa5B3488BB647c5E02eC987c49223814C42",
    link: "Copy BNB Wallet",
  },
  {
    id: 4,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
      >
        <g fill="currentColor" fill-rule="evenodd">
          <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16s-7.163 16-16 16m7.994-15.781L16.498 4L9 16.22l7.498 4.353zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378z" />
          <g fill-rule="nonzero">
            <path
              fill-opacity="0.298"
              d="M16.498 4v8.87l7.497 3.35zm0 17.968v6.027L24 17.616z"
            />
            <path
              fill-opacity="0.801"
              d="m16.498 20.573l7.497-4.353l-7.497-3.348z"
            />
            <path fill-opacity="0.298" d="m9 16.22l7.498 4.353v-7.701z" />
          </g>
        </g>
      </svg>
    ),
    address: "0x564dFaa5B3488BB647c5E02eC987c49223814C42",
    link: "Copy ETH Wallet",
  },
  {
    id: 5,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16s-7.163 16-16 16m-5.573-12.786L9.252 24h12.875L23 20.429h-7.722l.848-3.483l1.427-.571l.68-2.75l-1.41.571L18.342 8h-5.129l-2.081 8.429l-1.444.58L9 19.768z"
        />
      </svg>
    ),
    address: "ltc1q4h5devj0v2hm0u2wlqcpk39uyl2kjm9aw05873",
    link: "Copy LTC Wallet",
  },
  {
    id: 6,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M3.577 2.206a.63.63 0 0 1 .615-.188l13.226 3.238q.12.028.219.102l2.691 1.963a.63.63 0 0 1 .15.859l-9.259 13.546a.625.625 0 0 1-1.108-.145L3.45 2.837a.63.63 0 0 1 .126-.63M5.76 5.59l4.622 13.013l.76-6.743zm6.62 6.487l-.772 6.86l6.537-9.566zm6.355-4.367l-4.212 1.977l2.822-2.99zm-2.662-1.492L5.79 3.7l6.029 7.02z"
          clip-rule="evenodd"
        />
      </svg>
    ),
    address: "TBEsqgicf5xEwCyra5mTmCL3me15ZtES8w",
    link: "Copy TRON Wallet",
  },
];

export const asset = [
  {
    id: 1,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          d="m11.136 12.117l-.596 2.415c.736.185 3.004.921 3.34-.441c.35-1.421-2.009-1.789-2.744-1.974m.813-3.297l-.54 2.191c.612.154 2.5.784 2.806-.455c.318-1.293-1.654-1.581-2.266-1.736M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2m4.358 8.575a1.74 1.74 0 0 1-1.385 1.611a1.933 1.933 0 0 1 .997 2.661c-.586 1.692-1.977 1.835-3.827 1.481l-.449 1.82l-1.085-.274l.443-1.795q-.42-.105-.864-.227l-.445 1.804l-1.084-.273l.45-1.824c-.254-.065-.511-.135-.774-.201l-1.412-.356l.539-1.256s.8.215.788.199a.394.394 0 0 0 .498-.26l1.217-4.939a.583.583 0 0 0-.505-.638c.016-.011-.789-.198-.789-.198l.29-1.172l1.495.378l-.001.006q.338.083.693.164l.444-1.801l1.085.273l-.436 1.766c.291.068.584.135.87.207l.432-1.755l1.085.274l-.445 1.802c1.37.477 2.372 1.193 2.175 2.523"
        />
      </svg>
    ),
  },
  {
    id: 2,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M3.577 2.206a.63.63 0 0 1 .615-.188l13.226 3.238q.12.028.219.102l2.691 1.963a.63.63 0 0 1 .15.859l-9.259 13.546a.625.625 0 0 1-1.108-.145L3.45 2.837a.63.63 0 0 1 .126-.63M5.76 5.59l4.622 13.013l.76-6.743zm6.62 6.487l-.772 6.86l6.537-9.566zm6.355-4.367l-4.212 1.977l2.822-2.99zm-2.662-1.492L5.79 3.7l6.029 7.02z"
          clip-rule="evenodd"
        />
      </svg>
    ),
  },
  {
    id: 3,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16s-7.163 16-16 16m-3.884-17.596L16 10.52l3.886 3.886l2.26-2.26L16 6l-6.144 6.144zM6 16l2.26 2.26L10.52 16l-2.26-2.26zm6.116 1.596l-2.263 2.257l.003.003L16 26l6.146-6.146v-.001l-2.26-2.26L16 21.48zM21.48 16l2.26 2.26L26 16l-2.26-2.26zm-3.188-.002h.001L16 13.706L14.305 15.4l-.195.195l-.401.402l-.004.003l.004.003l2.29 2.291l2.294-2.293l.001-.001l-.002-.001z"
        />
      </svg>
    ),
  },
  {
    id: 4,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
      >
        <g fill="currentColor" fill-rule="evenodd">
          <path d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16s-7.163 16-16 16m7.994-15.781L16.498 4L9 16.22l7.498 4.353zM24 17.616l-7.502 4.351L9 17.617l7.498 10.378z" />
          <g fill-rule="nonzero">
            <path
              fill-opacity="0.298"
              d="M16.498 4v8.87l7.497 3.35zm0 17.968v6.027L24 17.616z"
            />
            <path
              fill-opacity="0.801"
              d="m16.498 20.573l7.497-4.353l-7.497-3.348z"
            />
            <path fill-opacity="0.298" d="m9 16.22l7.498 4.353v-7.701z" />
          </g>
        </g>
      </svg>
    ),
  },
  {
    id: 5,
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1em"
        height="1em"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          fill-rule="evenodd"
          d="M16 32C7.163 32 0 24.837 0 16S7.163 0 16 0s16 7.163 16 16s-7.163 16-16 16m-5.573-12.786L9.252 24h12.875L23 20.429h-7.722l.848-3.483l1.427-.571l.68-2.75l-1.41.571L18.342 8h-5.129l-2.081 8.429l-1.444.58L9 19.768z"
        />
      </svg>
    ),
  },
];

import { MdSpaceDashboard } from "react-icons/md";
import { ImUsers } from "react-icons/im";
import { MdOutlinePayments } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";

import { RiLogoutCircleRLine } from "react-icons/ri";

export const adminDashboardLinks = [
  {
    id: 1,
    name: "Overview",
    link: "/adminDashboard",
    icon: MdSpaceDashboard,
  },
  {
    id: 2,
    name: "Manage Users",
    link: "/adminDashboard/manageUsers",
    icon: ImUsers,
  },
  {
    id: 3,
    name: "Manage Payments",
    link: "/adminDashboard/managePayments",
    icon: MdOutlinePayments,
  },
  {
    id: 3,
    name: "Manage Investments",
    link: "/adminDashboard/manageInvestments",
    icon: BsGraphUpArrow,
  },
  {
    id: 4,
    name: "Manage Wallets",
    link: "/adminDashboard/manageWallets",
    icon: MdTableChart,
  },
  {
    id: 5,
    name: "Sign Out",
    link: "/adminsignout",
    icon: RiLogoutCircleRLine,
  },
];
