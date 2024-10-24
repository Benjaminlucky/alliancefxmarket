import React, { useState } from "react";
import "../dashboard.css";
import { Link, NavLink } from "react-router-dom"; // Import NavLink instead of Link
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for the menu toggle
import { dashnavigation, wallets } from "../../../data"; // Your data
import Profile from "../../../components/profile/profile";

function Invest() {
  const [copiedIndex, setCopiedIndex] = useState(null); // State for copying

  // Function to handle copying the wallet address
  const handleCopy = (walletAddress, index) => {
    navigator.clipboard.writeText(walletAddress); // Copy to clipboard
    setCopiedIndex(index); // Set the index of the copied wallet
    setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
  };

  return (
    <main className="main">
      <div className="investWrapper mx-auto w-4/5 py-10">
        <div className="investContent">
          <div className="profile">
            <div className="profileWrapper">
              <Profile />
            </div>
          </div>
          <div className="activitySection py-10">
            <div className="activityWrapper">
              <div className="activityContent ">
                <div className="activityLeft gap-10 grid grid-rows-1 md:grid-cols-3">
                  <div className="total border border-1 border-gray-400 rounded-sm">
                    <div className="totalContent p-5">
                      <p className="text-secondary-light">Total ROI</p>
                      <h3 className="text-white text-3xl font-bold">
                        $1,522.00
                      </h3>
                      <span className="text-gray-400">
                        6.5% Montly Interest
                      </span>
                    </div>
                  </div>
                  <div className="reinvest text-white">
                    <div className="reinvestWrapper flex justify-center">
                      <div className="reinvestContent flex flex-col justify-between">
                        <h3 className="text-3xl font-bold">
                          Re-Invest Your Profit
                        </h3>
                        <small className="text-gray-400">
                          Growing your wealth it's a continuous Journey!
                        </small>
                        <button className="border border-1 border-secondary-light rounded-full px-5 py-3 my-2 font-bold hover:bg-secondary-light hover:text-black hover:border-transparent">
                          Invest your Profit
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Invest;
