import React from "react";
import Profile from "../../../components/profile/profile";
import { asset } from "../../../data";

function Earning() {
  return (
    <main className="section">
      <div className="earningWrapper mx-auto w-4/5 py-10">
        <div className="earningContent">
          <div className="profileSection">
            <div className="profileWrapper">
              <Profile />
            </div>
          </div>
          <div className="middleSection text-white py-10">
            <div className="middleSectionWrapper">
              <div className="middleSectionContent gap-10 grid grid-rows-1 md:grid-cols-3">
                <div className="totalEarning border border-1 border-gray-500 rounded-sm">
                  <div className="totalEarningContent p-5">
                    <p className="text-secondary-light">Total Earning</p>
                    <h3 className="text-3xl mt-1 font-bold">$5,867,00</h3>
                  </div>
                </div>
                <div className="totalEarningPercent bg-secondary-light text-black rounded-sm">
                  <div className="percentContent p-5">
                    <p className="font-bold py-2">Total Earning</p>
                    <h3 className="text-5xl font-bold">3.6%</h3>
                  </div>
                </div>
                <div className="assets bg-secondary-light text-black rounded-sm">
                  <div className="assetsContent p-5">
                    <p className="font-bold">Assets</p>
                    <div className="assetsIcons flex text-4xl gap-3">
                      {asset.map((asset, index) => (
                        <div className="asset py-2" key={index}>
                          <div className="assetIcon">{asset.icon}</div>
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

export default Earning;
