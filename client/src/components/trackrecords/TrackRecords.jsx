import React from "react";
import { trackRecords } from "../../data";

function TrackRecords() {
  return (
    <div className="trackRecordWrapper w-full flex justify-center">
      <div className="trackRecord w-4/5 py-10 md:w-11/12 md:px-5  md:flex lg:flex justify-center items-center">
        {trackRecords.map((track, index) => (
          <div
            key={index}
            className="w-full text-center my-6 py-5 px-5 track flex-col justify-center items-center"
          >
            <h1 className="text-6xl font-black text-center text-primary md:text-4xl lg:text-6xl">
              {track.number}
            </h1>
            <h4 className="text-1xl font-semibold text-primary-light md:text-mxl md:text-1xl">
              {track.name}
            </h4>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TrackRecords;
