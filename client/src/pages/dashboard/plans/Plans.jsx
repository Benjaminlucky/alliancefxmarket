import React from "react";
import Profile from "../../../components/profile/Profile";
import { plans } from "../../../data";

function Plans() {
  return (
    <main className="main">
      <div className="mainWrapper mx-auto w-4/5 py-10">
        <div className="mainContent">
          <div className="profileSection">
            <div className="profileWrapper">
              <div className="profileContent">
                <Profile />
              </div>
            </div>
          </div>
          <div className="planSection">
            <div className="planWrapper py-16">
              <h2 className="text-white text-4xl font-bold pb-14">
                All Available Plans
              </h2>
              <div className="planContent text-white gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                {plans.map((plan, id) => (
                  <div className="plan bg-accent rounded-sm" key={id}>
                    <div className="planDetails px-8 py-6">
                      <h3 className="text-secondary-light text-3xl font-bold pb-2">
                        {plan.plan}
                      </h3>
                      <h4 className="font-bold text-2xl pb-3">{plan.amount}</h4>

                      {plan.list.map((subItem, subIndex) => (
                        <li key={subIndex} className="list-none text-gray-400">
                          {subItem}
                        </li>
                      ))}
                      <div className="button py-5">
                        <button className="border border-1 border-secondary-light hover:border-transparent hover:bg-secondary-light hover:text-accent py-2 px-5 rounded-full font-semibold">
                          Invest Now
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Plans;
