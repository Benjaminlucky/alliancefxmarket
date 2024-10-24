import React from "react";
import avatar from "../../assets/headshot1.jpg";

function Profile() {
  return (
    <div className="profileSection">
      <div className="profileWrapper flex justify-between items-center">
        <div className="profileLeft">
          <div className="profileDetails">
            <h2 className="font-bold text-2xl text-white">Hello Tosin</h2>
            <p className="text-gray-400 text-sm md:text-xl">
              Track your Investment Journey here
            </p>
          </div>
        </div>
        <div className="profileRight">
          <div className="profileAvatar flex flex-col md:flex-row gap-3 justify-center items-center">
            <span className="text-gray-300">Sign Out</span>
            <img
              src={avatar}
              alt="User Avatar"
              className="avatar w-14 h-14 md:w-20 md:h-20 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
