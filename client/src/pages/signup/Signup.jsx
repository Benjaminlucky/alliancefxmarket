import React, { useState } from "react";
import axios from "axios";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Modal, Button } from "flowbite-react";
import "./signup.css";
import { Checkbox, Label, TextInput, Spinner } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { FaIdCardClip } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import Select from "react-select";
import countryList from "react-select-country-list";
import Flag from "react-world-flags"; // Import flag library
import { testimony } from "../../data.js";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const navigate = useNavigate(); // Initialize navigate hook
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false); // Track loading state
  const [responseMessage, setResponseMessage] = useState(""); // To hold success or error message
  const [errorMessages, setErrorMessages] = useState([]); // For error messages
  const [showPassword, setShowPassword] = useState(false); // Password visibility toggle
  const [showTermsModal, setShowTermsModal] = useState(false); // Modal state
  const [agreedToTerms, setAgreedToTerms] = useState(false); // Agreement state
  const [errorMessage, setErrorMessage] = useState(""); // For error messages

  const options = countryList()
    .getData()
    .map((country) => ({
      value: country.value,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Flag
            code={country.value}
            style={{ width: "20px", marginRight: "10px" }}
          />
          <span>{country.label}</span>
        </div>
      ),
    }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setFormData((prev) => ({
      ...prev,
      country: value ? value.value : "", // Use only `value`
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!agreedToTerms) {
      setErrorMessage("You must agree to the terms and conditions to proceed.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://alliancefxmarket.onrender.com/user/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        // If the response is not OK, throw an error
        const errorData = await response.json();
        const errorMsg = errorData.error || "An error occurred.";
        setErrorMessages([errorMsg]);
        setResponseMessage("");
        setLoading(false);
        return;
      }

      const responseData = await response.json();
      console.log(responseData);

      // Show success message
      setResponseMessage(responseData.message);
      setErrorMessages([]);
      setTimeout(() => {
        navigate("/signin");
      }, 2000); // Redirect after a short delay
    } catch (error) {
      console.error(error);
      setErrorMessages(["An unexpected error occurred."]);
      setResponseMessage("");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="innerWrapper max-w-full flex justify-center bg-black text-white">
      <div className="innerContent flex flex-col md:flex-col lg:flex-row gap-20 w-4/5 py-20 ">
        <div className="left flex-2 items-start">
          <div className="leftContent">
            <div className="top py-10">
              <h2 className="font-extrabold text-3xl md:text-5xl lg:text-7xl pt-3">
                Create an Account
              </h2>
              <p className="text-secondary-light text-3xl mt-3">
                To Start Investing...
              </p>
            </div>
            <div className="bottom w-full">
              <form action="" className="w-full" onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <div className="max-w-2xl mt-3 flex flex-col">
                  <Label htmlFor="full-name" className="text-white pb-3">
                    Full Name
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaUserCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Elon Musk"
                      onChange={handleChange}
                      value={formData.fullName}
                    />
                  </div>
                </div>

                {/* Username Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <Label htmlFor="username" className="text-white pb-3">
                    Username
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaIdCardClip className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="elonmus79"
                      onChange={handleChange}
                      value={formData.username}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <Label htmlFor="email" className="text-white pb-3">
                    Email
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <HiMail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="elon@example.com"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <Label htmlFor="phone" className="text-white pb-3">
                    Phone
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <HiPhone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="+1 0678 9088 787"
                      onChange={handleChange}
                      value={formData.phone}
                    />
                  </div>
                </div>

                {/* Country Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <Label htmlFor="country" className="text-white pb-3">
                    Country
                  </Label>
                  <div className="relative max-w-2xl mt-5 flex flex-col">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <HiPhone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <Select
                      id="country"
                      name="country"
                      options={options}
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      className="text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                      placeholder="Select your country"
                    />
                  </div>
                </div>

                {/* Password Field */}
                {/* Password Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <label htmlFor="password" className="text-white pb-3">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <RiLockPasswordFill className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="******"
                      onChange={handleChange}
                      value={formData.password}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <AiOutlineEye className="w-5 h-5 text-gray-500" />
                      ) : (
                        <AiOutlineEyeInvisible className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <label htmlFor="confirmPassword" className="text-white pb-3">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <RiLockPasswordFill className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showPassword ? "text" : "password"}
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="******"
                      onChange={handleChange}
                      value={formData.confirmPassword}
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      {showPassword ? (
                        <AiOutlineEye className="w-5 h-5 text-gray-500" />
                      ) : (
                        <AiOutlineEyeInvisible className="w-5 h-5 text-gray-500" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Checkbox for Terms and Conditions */}
                {/* Terms and Conditions */}
                <div className="max-w-xl mt-5 flex items-center">
                  <Checkbox
                    id="agreeToTerms"
                    name="agreeToTerms"
                    checked={agreedToTerms}
                    onChange={() => setAgreedToTerms((prev) => !prev)}
                  />
                  <Label
                    color="gray"
                    htmlFor="agreeToTerms"
                    className="ml-2 cursor-pointer"
                    onClick={() => setShowTermsModal(true)} // Open modal on click
                  >
                    I agree to the{" "}
                    <span className="text-blue-500 underline">
                      Terms and Conditions
                    </span>
                  </Label>
                </div>
                <div className="flex max-w-md gap-4 mt-2">
                  <span className="text-gray-500">
                    Already have an Account ?{" "}
                  </span>
                  <Link
                    to="/signin"
                    className="hover:underline text-secondary-light"
                  >
                    Sign in
                  </Link>
                </div>
                {/* Submit Button */}
                <div className="button">
                  <button
                    type="submit"
                    className="text-white w-full mt-5 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-3.5 text-center me-2 mb-2"
                    disabled={loading} // Disable the button while loading
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Spinner size="sm" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
                {responseMessage && (
                  <div className="response-message mt-4 text-green-500">
                    {responseMessage}
                  </div>
                )}
                {errorMessage && (
                  <div className="response-message mt-4 text-red-500">
                    {errorMessage}
                  </div>
                )}

                {errorMessages && (
                  <div className="error-messages mt-4 text-red-500">
                    <ul>
                      {errorMessages.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </form>
            </div>
            {/* Modal for Terms and Conditions */}
            <Modal
              show={showTermsModal}
              width="300px"
              onClose={() => setShowTermsModal(false)}
            >
              <Modal.Header>Terms and Conditions</Modal.Header>
              <Modal.Body>
                <p>
                  Please read and understand our terms and conditions before
                  proceeding.
                </p>
                {/* Add detailed terms here */}
                <div className="bg-white max-w-4xl w-full rounded-lg shadow-lg p-6 max-h-[80vh] overflow-auto">
                  <h1 className="text-2xl font-bold mb-4"> 1 Definitions</h1>
                  <div className="space-y-6">
                    {/* Section 1 */}
                    <div>
                      <h2 className="text-lg font-semibold">
                        Account Activity Details
                      </h2>
                      <p className="text-sm text-gray-600 text-justify">
                        In the agreement, unless the context requires, the
                        following words shall be construed as follows: Access
                        Codes the email and password provided by the Client for
                        accessing the Company’s electronic systems. Account
                        Activity account details, including executed
                        Transactions, Confirm actions of trades, swap interest
                        credits/debits, cash balance, account equity, used
                        Margin ratio, total realized and unrealized profit and
                        loss, and the remaining amount available for trading.
                        Account Application the Application to Open an
                        Individual, Joint or Business Trading Account form,
                        which is completed by the Customer through the Website
                        or provided to the Customer in hard-copy form. Adviser
                        an algorithm in the form of a program based on MT4,
                        which is used to control a Trading Account and give
                        instructions and requests to the Server via the Client
                        Terminal. Balance the total financial result of all
                        Completed Transactions and deposit /withdrawal
                        operations on the Trading Account and does not
                        unrealized profits and losses. Base Currency the first
                        currency in the Currency Pair against which the Customer
                        buys or sells the Quote Currency. Bid the lower price in
                        the Quote being the price at which the Customer may
                        sell. The term Bid is synonymous with Sell. Business Day
                        any day between Monday and Friday, inclusive, on which
                        the Federal Reserve is open in New York City. Buy means
                        Offer. Buy Limit an Order to open a Long Position at a
                        price lowers than the price at the moment of placing the
                        Order. Buy Stop an Order to open a Long Position at a
                        price higher than the price at the moment of placing the
                        Order. CFTC the United States Commodity Futures Trading
                        Commission. Client Terminal the MT4 Pro program, which
                        is used by the Customer to obtain information on
                        financial markets (which content is defined by
                        Alliance-Fx Market) in real-time, make Transactions,
                        view account equity, place Orders, as well as to receive
                        notices from Alliance-Fx Market. Complaint (a) a
                        conflict situation where the Customer reasonably
                        believes that Alliance-Fx Market as a result of any
                        action or failure to act has breached one or more terms
                        of the Terms of Business; (b) a conflict situation when
                        Alliance-Fx Market reasonably believes that the
                        Customer, as a result of any action or failure to act,
                        has breached one or more terms of the Terms of Business;
                        (ca conflict situation where the Customer makes a deal
                        at an Error Quote/Spike, or before the first Quote comes
                        to the Trading Platform on the Market Opening, or at the
                        Quote received by the Customer because a Dealer made a
                        Manifest Error or because of a software failure of the
                        Trading Platform; (d) a Trading Dispute; or (e) any
                        other issue relating to fair and ethical trading through
                        Alliance-Fx Market or the Trading Platform. Completed
                        Transaction two offsetting positions of the same volume.
                        Contract Specifications principal trading terms (such as
                        Spread, Lot Si e, Leverage, Initial Margin and trading
                        hours) for each Instrument. Currency Pair a quotation of
                        two different currencies, which is based on the change
                        in the value of one currency against the other.
                        Customer, a legal entity or an individual is a party to
                        the Customer Agreement with Alliance-Fx Market in
                        respect of making Transactions, subject to Margin
                        Trading. Customer Agreement the agreement between
                        Alliance-Fx Market and the Customer, which together
                        govern the terms on which Alliance-Fx Market deals with
                        the Customer. Dealer an employee of Alliance-Fx Market
                        who is authorized to execute the Customer’s Orders.
                        Equity Balance + Floating Profit – Floating Loss. Equity
                        is also referred to as net liquidation value. Error
                        Quote/Spike an error Quote including, but not limited
                        to, the following characteristics: (a) a significant
                        Price Gap or Spread gap; (b) in a short period of time,
                        the price rebounds with a Price Gap or Spread gap; (c)
                        no rapid price movements at the time of the Quote; and
                        (d) before and immediately after the Quote provided it
                        appears that no important macroeconomic indicators
                        and/or corporate reports are released. An event of
                        Default has the meaning given in paragraph 17.2 of the
                        Customer Agreement. The fast Market rapid movement is on
                        the market for a short period of time often causing
                        Price Gaps. Generally, it occurs immediately before or
                        after an important event which influences price
                        movements, including (a) releases of main macroeconomic
                        indicators on global economies, which have great impact
                        on the financial market; (b) central banks decisions on
                        interest rates; (c) press conferences and speeches of
                        the central banks heads, heads of state, financial
                        ministers and other significant announcements; (d)
                        interventions; (e) terror attacks; (f) natural disasters
                        or other acts of God which cause the announcement of the
                        state of emergency (or other restrictive measures) on
                        the affected territories; (g) war or any other military
                        actions; or (h) political force majeure: dismissal or
                        appointment (including electronic results) of the
                        government executives. FIFO Rule ‘first in, first out’
                        or a rule which requires that the position which was
                        first opened be the first position closed when multiple
                        positions are held in the same Currency Pair. Floating
                        Loss current or unrealized loss on Open Positions
                        calculated at the current Quotes. Floating Profit
                        current or unrealized profit on Open Positions
                        calculated at the current Quotes. Forex means foreign
                        exchange. Force Majeure Event the following: (a) any
                        act, event or occurrence (including, without limitation,
                        any strike, riot or civil commotion, terrorism, war, act
                        of God, accident, fire, flood, storm, interruption of
                        power supply, electronic, communication equipment or
                        supplier failure, civil unrest, statutory provisions,
                        lock-outs) which, in Alliance-Fx Market‘s reasonable
                        opinion, prevents Alliance-Fx Market from maintaining an
                        orderly market in one or more of the Instruments; (b)
                        the suspension, liquidation or closure of any market or
                        the abandonment or failure of any event to which
                        Alliance-Fx Market relates its Quotes; or (c) the
                        imposition of limits or special or unusual terms on the
                        trading in any such market or on any such event. Free
                        Margin funds on the Trading Account, which may be used
                        to open a position. It is calculated as Equity less
                        Margin. Initial Margin the margin required by
                        Alliance-Fx Market to open a position. The details for
                        each Instrument are in the Contract Specifications.
                        Instant Execution the mechanism of providing Quotes to
                        the Customer without a prior request. The Customer may
                        make a Transaction anytime the Customer sees the Quotes
                        Flow, provided by Alliance-Fx Market, in real-time.
                        Instrument any Currency Pair. Leverage the use of Margin
                        to increase potential returns. Leverage is generally
                        referred to as a ratio relating to the Transaction Size
                        and Margin (for example, a 1:20, 1:25, 1:40, 1:50, or
                        1:100 ratio). A 1:100 ratio means that, in order to open
                        a position, the Margin required is one hundred times
                        less than the Transaction Size. Limit Order an Order to
                        buy or sell at a set quantity at a specified price or
                        better. Long Position a Buy position that appreciates in
                        value if market prices increase. Lot means a unit of
                        Base Currency in the Trading Platform. Lot Size the
                        number of units of the underlying assets or Base
                        Currency in one Lot defined in the Contract
                        Specifications. Manifest Error an error of a Dealer who
                        opens/closes a position or executes an Order at the
                        price which significantly differs from the price for
                        this Instrument in the Quotes Flow at the moment of
                        taking this action, or any other Dealer’s action in
                        respect of the prices which are significantly different
                        from the market prices. Margin the margin required by
                        Alliance-Fx Market to maintain an Open Position. The
                        Margin applicable to each Instrument is specified in the
                        Contract Specifications. Маrgin Level the percentage or
                        ratio of Equity to Necessary Margin. It is calculated as
                        (Equity / Necessary Margin) multiplied by 100%. Margin
                        Trading Leverage trading when the Customer may make
                        Transactions having far fewer funds on the Trading
                        Account in comparison with the Transaction Size. Market
                        Opening the time at which the market opens after
                        weekends, holidays or trading sessions time gaps. Market
                        Order an Order to buy or sell which is immediately
                        executed at the current market price. NFA the United
                        States National Futures Association. Normal Market
                        Conditions the market where there are no: (a)
                        considerable breaks in the Quotes Flow in the Trading
                        Platform; (b) fast price movements; and (c) Price Gaps.
                        OCO (or One Cancels Other) the submission of two Orders
                        where, if one Order is executed, the other Order is
                        immediately canceled. Offer the Ask price or the higher
                        price in the Quote being the price at which the Customer
                        may The term Offer is synonymous with Buy. Open Position
                        a Long Position or a Short Position which is not a
                        Completed Transaction. One-Click Trading an
                        execution-style where a Market Order can be immediately
                        placed, confirmed and executed by clicking one time the
                        Offer or Bid price listed for the Currency Pair. Order
                        an instruction from the Customer relating to opening,
                        offsetting/closing, modifying, and deleting or otherwise
                        executing a position on the Trading Platform. Order ID
                        the unique identification number assigned to each Order
                        placed through or on the Trading Order Reference Guide
                        the guide containing information about the Order types
                        available on the Trading Platform. This information is
                        displayed on https://www.Alliance-Fx Market.com/ OTC the
                        over-the-counter market where contracts are not traded
                        on an organized exchange. Payment Instructions details
                        for depositing funds to the Trading Account. Payment
                        Instructions can be found on Alliance-Fx Market Web
                        site. Pending Order a resting order or an instruction to
                        open a position once the price has reached the level of
                        the Order. Price Gap a considerable amount of price
                        distance within an Instrument. Quote the current price
                        for a specific Instrument in the form of Bid and Offer
                        prices. Quote Currency the second currency in the
                        Currency Pair which can be bought or sold by the
                        Customer for the Base Currency. Report/Trade Summary the
                        file created by the Server, which records accurately to
                        a second all Orders sent by the Customer to Alliance-Fx
                        Market as well as the results of their execution. Risk
                        Disclosure Statement the risk disclosure statement
                        included in paragraphs 1 and 2 of Sell means Bid. Sell
                        Limit an Order to open a Short Position at a price
                        higher than the price at the moment of placing the
                        Order. Sell Stop an Order to open a Short Position at
                        the price lowers than the price at the moment of placing
                        the Order. Server the MT4 Pro server program. This
                        program is used to execute the Customer’s Orders and
                        provide trading information in real-time mode (the
                        content is defined by Alliance-Fx Market), subject to
                        the mutual liabilities between Customer, the Forex
                        Customer Agreement and its Terms. Services the services
                        provided by Alliance-Fx Market to the Customer as set
                        out in the Agreement. Short Position a Sell position
                        that appreciates in value if market prices fall. Spread
                        the difference between Bid and Offer. Stop Limit an
                        Order which becomes a Limit Order after a price
                        specified by the Customer has been reached or passed.
                        Stop Loss a Pending Order which becomes a Market Order
                        if the Bid or Offer for a Currency Pair reaches the
                        predefined stop price. This Order Type is designed to
                        limit a trader’s loss on a position. Stop Order an Order
                        to buy or sell a certain quantity if a specified price
                        (the stop price) is reached or passed. The Order becomes
                        a Market Order once the stop price specified is reached.
                        Stop Out offsetting/closing Open Positions without the
                        consent of the Customer or without any prior notice to
                        the Customer where there are insufficient funds to
                        maintain the Open Positions. Storage Swap the funds are
                        withdrawn or added to the Client’s account for the
                        prolongation (transfer) of an open position to the next
                        day. Streaming Quotes the stream or flow of Quotes in
                        the Trading Platform for each Instrument. Take Profit an
                        Order to close a previously opened position at the price
                        more profitable for the Customer than the price at the
                        moment of placing the Order. Terms have the meaning set
                        forth in paragraph 1.1 of Exhibit A, Terms of Business
                        for MT4 Pro. Thin Market the market in which the Quotes
                        in the Trading Platform are rare as opposed to the
                        Normal Market Conditions. Trading Account the unique
                        personified registration system of all Completed
                        Transactions, Open Positions, Orders and deposit/
                        withdrawal transactions in the Trading Platform. Trading
                        Dispute a complaint or grievance relating to a
                        Transaction or trade submitted, deleted, modified,
                        offset/closed or executed on the Trading Platform or
                        otherwise handled by Alliance-Fx Market. Trading
                        Platform all programs and technical facilities which:
                        (a) provide real-time Quotes; (b) allow Transactions to
                        be made; (c) allow Orders to be placed, modified,
                        deleted, offset and executed; and (d) calculate all
                        mutual obligations between the Customer and Alliance-Fx
                        Market. The trading platform consists of the Server and
                        the Client Terminal. Trailing Stop a complex Stop Loss
                        Order where the Stop Loss price is set at a fixed
                        percentage or number of points below the market price.
                        On a Buy Order, if the market price rises, the Stop Loss
                        price rises proportionately. If the price falls, the
                        Stop Loss price does not change. Transaction any type of
                        transaction effected in the Client’s trading account(s)
                        including but not limited to Deposit, Withdrawal, Open
                        Trades, Closed Trade s, Transfers between other accounts
                        which belong to the Client or an authorized
                        representative. Transaction Size Lot Size multiplied by
                        the number of Lots.
                      </p>
                    </div>

                    {/* Section 2 */}
                  </div>
                  <h1 className="text-2xl font-bold mb-4 mt-10">
                    {" "}
                    2 Communication
                  </h1>
                  <div className="space-y-6">
                    {/* Section 1 */}
                    <div>
                      <h2 className="text-lg font-semibold">
                        Transmission of Reports, Statements, Notices, and Other
                      </h2>
                      <p className="text-sm text-gray-600 text-justify">
                        2.1. Transmission of Reports, Statements, Notices, and
                        Other Communications. Reports, statements, notices and
                        any other communications from Alliance-Fx Market will be
                        made available by display electronically via Alliance-Fx
                        Market Trading Platform, or may be transmitted
                        electronically via e-mail or sent to the mailing address
                        listed in the application, via U.S. mail or to such
                        other address as the Customer may from time to time
                        designate in writing to Alliance-Fx Market. All
                        communications so made available or sent, whether by
                        mail, display electronically, telegraph, messenger,
                        e-mail, fax or otherwise, shall be deemed transmitted by
                        Alliance-Fx Market when deposited in the United States
                        mail, or when received by a transmitting agent or posted
                        in Alliance-Fx Market Trading Platform or Website and
                        are thus available for the Customer’s electronic access,
                        or when e-mailed or faxed, and will also be deemed
                        delivered to the Customer personally, whether actually
                        received or accessed by the Customer or not. The
                        Customer shall notify Alliance-Fx Market immediately of
                        any change in the Customer’s address by e-mail to
                        support@Alliance-Fx Market.com. All communications sent
                        by the Customer shall not be deemed effective until
                        accepted by Alliance-Fx Market. 2.2 Consent to Other
                        Communications. The Customer expressly invites
                        Alliance-Fx Market, for the purpose of marketing
                        financial services and products, from time to time, to
                        make direct contact with the Customer by telephone,
                        facsimile or otherwise. The Customer consents to such
                        communications and agrees that the Customer will not
                        consider such communication a breach of any of the
                        Customer’s rights under any relevant data protection
                        and/or privacy regulations. The Customer may opt out of
                        receiving such communications by sending Alliance-Fx
                        Market an e-mail at support@Alliance-Fx Market.com
                      </p>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold mb-4 mt-10">
                    {" "}
                    3 Relation Between the Company and the Client
                  </h1>
                  <div className="space-y-6">
                    {/* Section 3 */}
                    <div>
                      <h2 className="text-lg font-semibold">
                        Relationship between Parties
                      </h2>
                      <p className="text-sm text-gray-600 text-justify">
                        3.1 The Company reserves the right to use, employ or
                        appoint third qualified and duly trained person for the
                        purpose of mediating in the execution of orders and the
                        conclusion of transactions for the Client. 3.2 The
                        Company declares that it takes all necessary measures,
                        where possible, in order to anticipate or solve any
                        conflicts of interest between, on the one hand, itself
                        and its associated persons and clients and on the other
                        hand, between its clients. However, the Company draws
                        the Client’s attention to the following possibilities of
                        a conflict of interest. 3.3 The Company and/or any
                        associated company and/or any company which is a member
                        of the group of companies to which the Company belongs
                        to, might: Enter itself into an agreement with the
                        Client in order to execute his Order; Be an issue of the
                        Financial Instruments in which the Client wishes to
                        conclude a transaction act on its behalf and/or for
                        another client as a purchase and/or seller and may have
                        an interest in the Financial Instruments of the issuer
                        in which the Client wishes to conclude a transaction;
                        Act as the market maker, consultant, and investment
                        manager and/or have any trading or other relationship
                        with any issuer; Pay a fee to third persons who either
                        recommended the Client to the Company or who mediated in
                        any way so that the Client’s Orders are forwarded to the
                        Company for execution.
                      </p>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold mb-4 mt-10">
                    {" "}
                    4 Client Classification
                  </h1>
                  <div className="space-y-6">
                    {/* Section 3 */}
                    <div>
                      <h2 className="text-lg font-semibold">Classifications</h2>
                      <p className="text-sm text-gray-600 text-justify">
                        For the purposes of the services provided by Alliance-Fx
                        Market under these Terms of business, we will act as
                        principal and not as agent on your behalf. We shall
                        treat you as a Retail Client, subject to the following:
                        a-if you satisfy the definition of Professional Client
                        or Eligible Counter-party, we may notify you that we
                        will treat you as such and the terms detailed in
                        Schedule 1 shall apply; and b- You may request a
                        different client classification from the one we have to
                        allocate d to you, but please be aware that we may
                        decline such a request. If you do request a different
                        categorization and we agree to such a request, you may
                        lose the protection afforded by certain FSA Rules, a
                        summary of these lost protections can be found in
                        Schedule 1. This may include, but is not limited to: I-
                        The requirement for us to act in accordance with your
                        best interests; II- Our obligation to provide
                        appropriate information to you before providing our
                        services; III- The restriction on the payment or receipt
                        by us of any inducements; IV- Our obligation to achieve
                        the best execution of your orders if you are classified
                        as an Eligible Counter-party only; V- The requirement to
                        implement procedures and arrangements which provide for
                        the Prompt, fair, and expeditious execution of your
                        orders; VI- Our obligation to ensure that all
                        information we provide to you is fair, clear and not
                        misleading; and VII- the requirement that you receive
                        from us adequate reports on the services provided to
                        you.
                      </p>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold mb-4 mt-10">
                    {" "}
                    5 Important Information for Opening a New Account
                  </h1>
                  <div className="space-y-6">
                    {/* Section 3 */}
                    <div>
                      <h2 className="text-lg font-semibold">
                        Procedures for New Account
                      </h2>
                      <p className="text-sm text-gray-600 text-justify">
                        5.1. Alliance-Fx Market recognizes that the USA PATRIOT
                        Act, as amended from time to time (the “Act”), imposes
                        important obligations on all financial firms for the
                        detection, deterrence, and reporting of money laundering
                        activities. Under the Act, money laundering is defined
                        as any financial transaction using income derived from
                        criminal activity including, but not limited to, drug
                        trafficking, fraud, illegal gambling, and terrorism.
                        Alliance-Fx Market has established the following
                        policies to ensure compliance with all laws and
                        regulations regarding money laundering. 5.2. Prior to
                        the opening of any new Trading Account, Alliance-Fx
                        Market will document the identity, nature of business,
                        income, the source of funds, and investment objectives
                        of each prospective customer. Therefore, Alliance-Fx
                        Market will request the Customer’s driver’s license
                        number, passport number and may request copies of the
                        Customer’s identifying documents. 5.3. On an on-going
                        basis, Alliance-Fx Market will review Trading Account
                        activity for evidence of transactions that may be
                        indicative of money laundering activities. This review
                        may include surveillance of: (a) money flows into and
                        out of Trading Accounts, (b) the origin and destination
                        of wire transfers, (c) non-economic transactions, and
                        (d) other activity outside the normal course of
                        business. Every officer, employee and associated person
                        of Alliance-Fx Market is responsible for assisting in
                        the firm’s efforts to uncover and report any activity
                        that might constitute, or otherwise indicate or raise
                        suspicions of, money laundering. To this end,
                        Alliance-Fx Market provides continuing education and
                        training of all such persons. 5.4. Alliance-Fx Market
                        will comply with all trade and economic sanctions
                        imposed by the U.S. Office of Foreign Assets Control
                        against targeted foreign countries and shall cooperate
                        fully with government agencies, self-regulatory
                        organisations, and law enforcement officials. As
                        provided by the Act, Alliance-Fx Market may supply
                        information about former, current or prospective
                        customers to such bodies.
                      </p>
                    </div>
                  </div>
                  <h1 className="text-2xl font-bold mb-4 mt-10">
                    {" "}
                    6 Client Accounts
                  </h1>
                  <div className="space-y-6">
                    {/* Section 3 */}
                    <div>
                      <h2 className="text-lg font-semibold">Accounts</h2>
                      <p className="text-sm text-gray-600 text-justify">
                        6.1 All amounts handed over by the Client to the Company
                        or which the Company holds on behalf of the Client, for
                        the provision of Investment Services as in paragraph 2,
                        shall be held in the name of the Client and/or in the
                        name of the Company on behalf of the Client in an
                        account with any bank, other institution or any
                        electronic payment providers/processors used to accept
                        funds which the Company shall specify from time to time
                        (“the ‘Bank Account’). 6.2 The Client has the right to
                        withdraw the funds, which are not used for margin
                        covering, free from any obligations from his sub-account
                        without closing the said sub-account. 6.3 Money transfer
                        request (withdrawal from the trading account) is
                        processed within three working days after receiving from
                        the Client transfer request instructions. Then the
                        transferring amount reduces the balance of the Client’s
                        sub-account when the transfer request process is
                        concluded. The Company reserves the right to decline a
                        withdrawal request if the request is not in accordance
                        with paragraph 7.9 or delay the processing of the
                        request if not satisfied on full documentation of the
                        Client. 6.4 The Client agrees to pay any incurred bank
                        transfer fees/charges charged by the Bank Account
                        providers, the Company or any other intermediary
                        involved in such transaction process when withdrawing
                        funds from his sub-account to his designated account
                        held in any of the providers specified in paragraph 7.1
                        above. The Client is fully responsible for payments
                        details, given to the Company and the Company accepts no
                        responsibility for the Client’s funds, if the Client’s
                        given details are wrong. 6.5 The Client agrees that any
                        amounts sent by the Client or on the Client’s behalf in
                        the Bank Accounts, will be deposited (credited) to the
                        Client’s trading account at the value date of the
                        payment received and net of any charges / fees charged
                        by the Bank Account providers, the Company or any other
                        intermediary involved in such transaction process. The
                        Company must be satisfied that the sender is the Client
                        or an authorized representative of the Client before
                        making any amount available to the Client’s trading
                        account, otherwise, the Company reserves the right to
                        refund/send back the net amount credited to the account
                        by the same method as received. It is also understood
                        that the Company accepts no responsibility for any funds
                        not deposited directly into Company’s bank accounts.
                      </p>
                    </div>
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  color="blue"
                  onClick={() => {
                    setAgreedToTerms(true);
                    setShowTermsModal(false);
                  }}
                >
                  Agree
                </Button>
                <Button color="gray" onClick={() => setShowTermsModal(false)}>
                  Cancel
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <div className="right flex-1 w-full  bg-white rounded-lg">
          <div className="rightContent p-5">
            <div className="top">
              <div className="rightTopContent">
                <h3 className="text-black font-extrabold text-xl md:text-4xl lg:text-5xl leading-normal">
                  See what Investors are saying about us!
                </h3>
              </div>
            </div>
            <div className="bottom">
              <div className="rightBottomContent mt-10">
                <div className="testimonials flex flex-col gap-5">
                  {testimony.map((testimony, index) => (
                    <div
                      key={index}
                      className="testimony relative overflow-hidden rounded-lg shadow-lg min-h-[200px]"
                    >
                      <div className="absolute inset-0 bg-secondary-light bg-opacity-50 backdrop-blur-sm"></div>
                      <div className="relative z-10 p-6 md:ml-10 md:mr-10 lg:ml-10 lg:mr-10">
                        <div className="top flex  justify-between items-start mb-4">
                          <div className="left flex  items-center">
                            <div className="testifier mr-4">
                              <img
                                className="w-16 h-16 rounded-full object-cover border-2 border-white"
                                src={testimony.image}
                                alt={testimony.name}
                              />
                            </div>
                            <div className="name">
                              <h3 className="font-bold text-lg text-primary">
                                {testimony.name}
                              </h3>
                              <h5 className="text-sm text-gray-600">
                                {testimony.Designation}
                              </h5>
                            </div>
                          </div>
                          <div className="right flex items-end text-xl text-primary">
                            {typeof testimony.icon === "function"
                              ? testimony.icon()
                              : testimony.icon}
                          </div>
                        </div>
                        <div className="bottom py-5">
                          <p className="text-gray-700 italic">
                            {testimony.testimony}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
