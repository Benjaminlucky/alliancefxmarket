import React from "react";

function Help() {
  return (
    <div className="innerWrapper w-full flex relative py-20 justify-center">
      <div className="absolute inset-0 bg-secondary-light"></div>
      <div className="absolute w-full inset-0 bg-[url('../../assets/trade001.avif')] bg-cover -bg-center bg-no-repeat opacity-25"></div>
      <div className="relative flex flex-col z-10 mb-10 px-5 w-full md:px-0 md:w-11/12 justify-center items-center">
        <div className="content w-4/5 flex flex-col lg:flex-row gap-10 lg:gap-5 justify-center items-center">
          <div className="title">
            <h3 className="font-extrabold text-4xl text-center lg:text-5xl lg:text-left text-primary">
              Need Help with your Trading Account?
            </h3>
          </div>
          <div className="BTN">
            <button className="rounded-full flex items-center bg-primary text-lg font-bold  text-white px-10 py-5">
              Contact US
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Help;
