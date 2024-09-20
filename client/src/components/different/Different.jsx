import React from "react";
import { difference } from "../../data";

function Different() {
  return (
    <div className="innerWrapper w-4/5 py-20 flex justify-center mx-auto">
      <div className="sectionContent w-full gap-5 md:gap-20 md:py-20 lg:py-20 flex flex-col md:flex-col lg:flex-row items-center">
        <div className="left w-full flex-1 ">
          <div className="title  lg:pr-16 flex justify-center text-center">
            <h1 className="font-extrabold text-2xl text-center md:text-6xl lg:text-6xl lg:leading-normal">
              What Makes Alliance-Fx Market Different?
            </h1>
          </div>
        </div>
        <div className="right flex-1 ">
          <div className="rightContent flex flex-col gap-6">
            {difference.map((difference, index) => (
              <div key={index} className="difference">
                <div className="text">
                  <p className="text-gray-400">{difference.point}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Different;
