import React, { useState } from "react";
import { wallets } from "../../data";
import Profile from "../../components/profile/Profile";

function Payments() {
  const [copiedIndex, setCopiedIndex] = useState(null); // State for copying
  const handleCopy = (walletAddress, index) => {
    navigator.clipboard.writeText(walletAddress); // Copy to clipboard
    setCopiedIndex(index); // Set the index of the copied wallet
    setTimeout(() => setCopiedIndex(null), 2000); // Reset after 2 seconds
  };
  return (
    <main className="paymentSection">
      <div className="paymentwrapper w-4/5 mx-auto py-10">
        <div className="paymentContent">
          <div className="profileSection">
            <Profile />
          </div>
          <div className="activitySection my-10">
            <div className="activitysectionWrapper">
              <div className="activityContent grid grid-cols-1 md:grid-cols-3 ">
                <div className="balance border border-1 border-gray-500 rounded-sm">
                  <div className="balanceContent p-5">
                    <p className="text-secondary-light ">Balance</p>
                    <h3 className="text-white text-3xl font-bold py-2">
                      $5,867.00
                    </h3>
                    <span className="text-secondary-light">Wallet Balance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="gatewaySection text-white">
            <div className="gatewayWrapper">
              <div className="gatewayContent">
                <div className="walletWrapper">
                  <div className="walletContent">
                    <div className="flex flex-col gap-3">
                      {wallets.map((wallet, index) => (
                        <div
                          key={index}
                          className="walletId wallet flex flex-col md:flex-row justify-between gap-4 p-4 rounded-sm md:rounded-full items-center bg-accent"
                        >
                          <div className="icon text-4xl text-secondary-light">
                            {wallet.icon}
                          </div>
                          <div className="address text-sm md:text-2xl text-gray-300">
                            {wallet.address}
                          </div>
                          <div
                            className="copy font-semibold border border-1 border-secondary-light hover:bg-secondary-light hover:border-transparent hover:text-accent rounded-full px-5 py-2 cursor-pointer"
                            onClick={() => handleCopy(wallet.address, index)}
                          >
                            {wallet.link}
                          </div>
                          {copiedIndex === index && (
                            <div className="text-sm text-green-500">
                              Copied to clipboard!
                            </div>
                          )}
                        </div>
                      ))}
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

export default Payments;
