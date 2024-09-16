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
