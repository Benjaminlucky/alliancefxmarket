import React, { useState } from "react";
import "./dashboard.css";
import { NavLink } from "react-router-dom"; // Import NavLink instead of Link
import { dashnavigation } from "../../data";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for the menu toggle

function Dashboard() {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to toggle the nav

  // Function to toggle the navigation
  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <main className="main__wrapper text-white w-full py-20">
      <div className="innerwrapper flex w-4/5 mx-auto relative">
        {/* Menu toggle button for small and medium screens */}
        <button
          className="menu-toggle md:hidden text-3xl z-50"
          onClick={handleToggleNav}
        >
          {isNavOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Left navigation */}
        <div
          className={`left fixed top-0 left-0 h-full w-3/4 bg-black transition-transform duration-300 z-40 ${
            isNavOpen ? "translate-x-0" : "-translate-x-full"
          } md:relative md:translate-x-0 md:w-1/4`}
        >
          <div className="leftWrapper w-full py-8 px-6">
            <div className="navigation w-full">
              <div className="logoWrapper w-full">
                <NavLink to="/dashboard">
                  <h2 className="text-3xl font-bold">AllianceFX Market</h2>
                </NavLink>
              </div>
            </div>
            <div className="nav mt-10">
              <div className="navWrapper">
                <div className="nav flex-col">
                  {dashnavigation.map((nav, index) => (
                    <NavLink
                      to={nav.link}
                      key={index}
                      className="link flex items-center gap-5 py-4 text-2xl"
                      activeClassName="active" // Class for active link
                    >
                      <div className="icon">
                        {React.createElement(nav.icon)}
                      </div>
                      <div className="linkLabel">{nav.label}</div>
                    </NavLink>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right content */}
        <div className="right w-full md:w-3/4 ml-0 md:ml-1/4">
          <div className="rightWrapper">
            {/* Right side content goes here */}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
