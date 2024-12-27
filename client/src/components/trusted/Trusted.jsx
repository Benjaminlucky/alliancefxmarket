import React from "react";

function Trusted() {
  return (
    <div className="innerWrapper flex w-full mx-auto py-10 justify-center">
      <div className="content text-center px-5 md:px-5 lg:px-5">
        <div className="top">
          <div className="title">
            <h1 className="font-extrabold uppercase text-3xl py-3 md:text-5xl lg:text-5xl md:py-5 lg:py-10">
              Trusted by
            </h1>
            <img src="./assets/trusted-by.png" alt="Company that trust us" />
          </div>
        </div>
        <div className="bottom text-center px-5 md:px-5 md:py-10 lg:px-5">
          <div className="title">
            <h1 className="font-extrabold uppercase text-3xl py-3 md:text-5xl lg:text-5xl md:py-5 lg:py-10">
              Award winner
            </h1>
            <img src="./assets/award-winner.png" alt="Awards" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trusted;
