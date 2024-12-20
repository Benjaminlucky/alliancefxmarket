import React, { useState } from "react";
import Profile from "../../../components/profile/profile";
import headshot from "../../../assets/headshot1.jpg";

function Referral() {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopyLink = () => {
    const linkText = "alliancefinance/ref=18875663";
    navigator.clipboard.writeText(linkText).then(() => {
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Hide message after 2 seconds
    });
  };
  return (
    <main className="main">
      <div className="mainWrapper mx-auto w-4/5">
        <div className="mainContent">
          <div className="profileSection py-10">
            <Profile />
          </div>
          <div className="referralTotalSection">
            <div className="referralTotalWrapper">
              <div className="referralTotalContent text-white">
                <div className="totalreferral gap-10 grid grid-cols-1 md:grid-cols-3">
                  <div className="trc border border-1 border-gray-500 rounded-sm">
                    <div className="trcContent p-5">
                      <p className="text-secondary-light">Total Referral</p>
                      <h3 className="font-bold text-4xl">201</h3>
                    </div>
                  </div>
                  <div className="totalEarning bg-secondary-light rounded-sm">
                    <div className="teContent p-5 text-black">
                      <p className="font-semibold">Total Refferal Earning</p>
                      <h2 className="font-bold text-4xl">$1,789.00</h2>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="referralLinkSection">
            <div className="referralLinkWrapper py-10">
              <div className="referralLinkContent gap-1 flex flex-col md:flex-row">
                <div className="link bg-accent py-3 px-5 rounded-sm">
                  <p className="text-gray-300">alliancefinance/ref=18875663</p>
                </div>
                <div
                  onClick={handleCopyLink}
                  className="copy bg-secondary-light flex justify-center items-center px-8 py-2 font-bold cursor-pointer"
                >
                  Copy Link
                </div>
              </div>
              {copySuccess && (
                <p className="text-green-500 mt-2">Link copied!</p>
              )}
            </div>
          </div>
        </div>
        <div className="referralSection text-white">
          <div className="referralWrapper py-10">
            <div className="referralContent flex flex-col gap-5">
              <div className="referral bg-accent py-3 px-5 rounded-sm flex justify-between items-center w-full md:w-4/5 lg:w-4/5">
                <div className="profileAvatar">
                  <img
                    src={headshot}
                    alt="refferal avatar"
                    className="w-8 h-8 md:w-12 md:h-12 lg:w-12 lg:h-12 border border-2 border-gray-500 rounded-full object-cover"
                  />
                </div>
                <div className="profileName md:text-xl text-gray-300">
                  Kalahan Dtchusky
                </div>
                <div className="balance md:text-2xl font-bold">$2,445.00</div>
              </div>
              <div className="referral bg-accent py-3 px-5 rounded-sm flex justify-between items-center w-full md:w-4/5 lg:w-4/5">
                <div className="profileAvatar">
                  <img
                    src={headshot}
                    alt="refferal avatar"
                    className="w-8 h-8 md:w-12 md:h-12 lg:w-12 lg:h-12 border border-2 border-gray-500 rounded-full object-cover"
                  />
                </div>
                <div className="profileName md:text-xl text-gray-300">
                  Kalahan Dtchusky
                </div>
                <div className="balance md:text-2xl font-bold">$2,445.00</div>
              </div>
              <div className="referral bg-accent py-3 px-5 rounded-sm flex justify-between items-center w-full md:w-4/5 lg:w-4/5">
                <div className="profileAvatar">
                  <img
                    src={headshot}
                    alt="refferal avatar"
                    className="w-8 h-8 md:w-12 md:h-12 lg:w-12 lg:h-12 border border-2 border-gray-500 rounded-full object-cover"
                  />
                </div>
                <div className="profileName md:text-xl text-gray-300">
                  Kalahan Dtchusky
                </div>
                <div className="balance md:text-2xl font-bold">$2,445.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Referral;
