import React from "react";
import { difference } from "../../data";

function Different() {
  return (
    <div className="innerWrapper w-4/5 py-20 flex justify-center mx-auto">
      <div className="sectionContent w-full gap-5 py-20 flex items-center">
        <div className="left flex-1">
          <div className="title pr-16">
            <h1 className="font-extrabold text-6xl leading-normal">
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
