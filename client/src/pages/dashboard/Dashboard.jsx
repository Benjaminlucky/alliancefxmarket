import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { plans } from "../../data"; // Assuming you have this data
import Dashboardnav from "../../components/dashboardnav/Dashboardnav";
import Profile from "../../components/profile/profile";

function Dashboard() {
  return (
    <main className="section  px-3 md:px-0 md:w-4/5 lg:w-4/5 mx-auto  text-white">
      <div className="mainWrapper w-full py-14 px-2 md:px-20 ">
        <div className="profile">
          <Profile />
        </div>
        <div className="activity pt-10 md:py-10">
          <div className="activityWrapper ">
            <div className="activityContent gap-3 md:gap-10 grid grid-rows-1 md:grid-cols-3 place-content-center items-center">
              <div className="total columns-lg border border-1 border-gray-500 rounded-xl">
                <div className="totalContent p-5">
                  <h5 className="text-secondary-light">Total Investment</h5>
                  <h3 className="text-3xl font-bold py-2">$15,867.00</h3>
                  <p className="text-secondary-light">Starter Plan</p>
                  <small className="text-gray-400">
                    Invested August 15 2022
                  </small>
                </div>
              </div>
              <div className="roi column-lg border border-1 border-gray-500 rounded-xl">
                <div className="roiContent p-5">
                  <h5 className="text-secondary-light">Total ROI</h5>
                  <h3 className="text-3xl font-bold py-2">$1,522.00</h3>
                  <p className="text-secondary-light">6.5% Monthly</p>
                </div>
              </div>
              <div className="balance border border-1 border-gray-500 rounded-xl">
                <div className="balanceContent p-5">
                  <h5 className="text-secondary-light">Balance Pending</h5>
                  <h3 className="text-3xl font-bold py-2">$18,000.00</h3>
                  <p className="text-secondary-light">
                    Due Date: August 16 2024
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="investmentSection">
          <div className="investmentWrapper mt-3">
            <div className="investmentContent">
              <div className="investmentTitle py-10 mb-10">
                <h2 className="text-4xl font-bold">
                  Choose an Investment Plan
                </h2>
              </div>
              <div className="investmentplans">
                <div className="investmentPlansWrapper gap-5 grid grid-col-1 md:grid-cols-3">
                  {plans.map((plan, id) => (
                    <div className="plan  bg-accent rounded-sm" key={id}>
                      <div className="planContent px-5 py-8">
                        <h3 className="text-2xl font-bold text-secondary-light">
                          {plan.plan}
                        </h3>
                        <h5 className="font-bold text-3xl py-1">
                          {plan.amount}
                        </h5>
                        {plan.list.map((subitem, subindex) => (
                          <li
                            key={subindex}
                            className="list-none mb-1 text-gray-400"
                          >
                            {subitem}
                          </li>
                        ))}
                        <button className="rounded-full border text-lg font-semibold border-secondary-light mt-5 py-3 px-10 hover:border-transparent hover:bg-secondary-light hover:text-accent">
                          Invest Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
