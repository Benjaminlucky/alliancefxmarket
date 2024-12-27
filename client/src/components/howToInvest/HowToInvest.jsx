import React from "react";
import { ToInvest } from "../../data";
import { Link } from "react-router-dom";

function HowToInvest() {
  return (
    <div className="innerWrapper w-full flex relative py-20 justify-center">
      {/* Background color layer */}
      <div className="absolute inset-0 bg-primary"></div>

      {/* Background image layer with opacity */}
      <div className="absolute w-full inset-0 bg-[url('/assets/tradeBG.jpeg')] bg-cover bg-center bg-no-repeat opacity-15"></div>

      {/* Content layer (z-index ensures it's on top of the background) */}
      <div className="relative flex-col z-10 mb-10 px-5 w-full md:px-0 md:w-11/12 justify-center items-center ">
        <div className="investTop text-center">
          <div className="subtitle ">
            <h4 className="text-gray-200  text-2xl  mt-10">
              3 Steps to Invest
            </h4>
            <h2 className="title text-white text-4xl md:text-7xl font-bold">
              HOW TO INVEST
            </h2>
            <p className="text-gray-200 text-xl md:text-2xl mt-4">
              To start trading, fund your account with reliable payment channels
              and withdraw quickly with the fastest payout methods.
            </p>
          </div>
        </div>

        <div className="bottom mt-20">
          <div className="list grid grid-cols-1 md:grid-cols-3 gap-6">
            {ToInvest.map((list, index) => (
              <div
                key={index}
                className="investList flex-col text-center py-10 px-5 md:px-0 justify-center  bg-white rounded-lg shadow-lg hover:bg-secondary-light"
              >
                <div className="icon flex justify-center mb-4 text-6xl text-primary">
                  {React.createElement(list.icon)}
                </div>
                <h3 className="text-lg font-semibold">{list.title}</h3>
                <p className="mt-2 text-primary">{list.text}</p>
              </div>
            ))}
          </div>
          <div className="button flex justify-center items-center mt-16">
            <Link to="/signup">
              <button className="rounded-full bg-secondary-light border-2 border-transparent px-20 py-5 font-bold text-1xl hover:border-2 hover:border-secondary-light hover:bg-white">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HowToInvest;
