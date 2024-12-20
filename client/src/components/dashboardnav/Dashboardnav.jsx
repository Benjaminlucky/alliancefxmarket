import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { dashnavigation } from "../../data"; // Assuming the navigation data is here
import { FaBars, FaTimes } from "react-icons/fa"; // For toggling icons
import "../../pages/dashboard/dashboard.css";
function Dashboardnav() {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to toggle the nav

  // Function to toggle the navigation
  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      {/* Mobile Nav Toggle Button */}
      <button
        className="text-white absolute top-5 right-5 md:hidden"
        onClick={handleToggleNav}
      >
        {isNavOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
      </button>

      {/* Navigation Wrapper */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-gray-900 p-6 z-40 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isNavOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="logoWrapper mb-10">
          <NavLink to="/dashboard">
            <h2 className="text-3xl font-bold text-white">AllianceFX Market</h2>
          </NavLink>
        </div>

        {/* Navigation Links */}
        <div className="nav flex flex-col gap-4">
          {dashnavigation.map((nav, index) => (
            <NavLink
              to={nav.link}
              key={index}
              className={({ isActive }) =>
                `link flex items-center gap-3 py-4 px-2 text-lg text-white hover:bg-gray-700 rounded-md ${
                  isActive ? "bg-gray-700" : ""
                }`
              }
            >
              <div className="icon">{React.createElement(nav.icon)}</div>
              <div className="linkLabel">{nav.label}</div>
            </NavLink>
          ))}
        </div>
      </div>

      {/* Overlay to close nav on mobile */}
      {isNavOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-30 md:hidden"
          onClick={handleToggleNav}
        ></div>
      )}
    </>
  );
}

export default Dashboardnav;
