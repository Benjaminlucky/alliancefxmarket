import React from "react";
import Profile from "../../../components/profile/profile";
import { BiSolidDownload } from "react-icons/bi";

function Withdrawal() {
  return (
    <main className="mainsection">
      <div className="mainWrapper mx-auto w-4/5 py-10">
        <div className="mainContent">
          <div className="profileSection">
            <div className="profileWrapper">
              <div className="profileContent">
                <Profile />
              </div>
            </div>
          </div>
          <div className="withdrawalSection">
            <div className="withdrawalWrapper py-20">
              <div className="withdrawalContent text-white">
                <div className="withdraw">
                  <p className="text-secondary-light">Current Balance</p>
                  <h3 className="balance text-5xl font-bold">$25,040.00</h3>
                  <div className="buttons flex flex-col md:flex-row py-5 gap-5">
                    <div className="withdrawButton flex bg-white gap-3 justify-center items-center py-2 px-5 rounded-full cursor-pointer hover:bg-secondary-light">
                      <BiSolidDownload className="bg-black h-10 w-10 rounded-full p-2 " />
                      <p className="text-black font-semibold text-xl">
                        Withdrawal
                      </p>
                    </div>

                    <div className="withdrawButton flex bg-white gap-3 justify-center items-center py-2 px-5 rounded-full cursor-pointer hover:bg-secondary-light">
                      <BiSolidDownload className="bg-black h-10 w-10 rounded-full p-2  rotate-180" />
                      <p className="text-black font-semibold text-xl">Invest</p>
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

export default Withdrawal;
