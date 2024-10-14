import React, { useState } from "react";
import "./dashboard.css";
import { NavLink } from "react-router-dom"; // Import NavLink instead of Link
import { dashnavigation, plans } from "../../data";
import { FaBars, FaTimes } from "react-icons/fa"; // Icons for the menu toggle

function Dashboard() {
  const [isNavOpen, setIsNavOpen] = useState(false); // State to toggle the nav

  // Function to toggle the navigation
  const handleToggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <main className="main__wrapper bg-black text-white w-full py-20 overflow-hidden">
      <div className="innerwrapper flex gap-20 lg:w-4/5 mx-auto relative md:flex-row">
        {/* Menu toggle button for small and medium screens */}
        <button
          className="menu-toggle md:hidden text-3xl z-50"
          onClick={handleToggleNav}
        >
          {isNavOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Left navigation */}
        <div
          className={`left fixed md:static top-0 left-0 h-full bg-black transition-transform duration-300 overflow-y-auto 
            ${isNavOpen ? "flex" : "hidden"} 
            md:flex md:w-1/4`}
        >
          <div className="leftWrapper w-full py-16 md:py-8">
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
                      activeClassName="active"
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
        <div
          className={`right flex-grow left-0 w-full ${
            isNavOpen ? "ml-0" : "md:ml-1/4"
          }`}
        >
          <div className="rightWrapper px-3 md:px-0 overflow-x-hidden">
            <div className="rightTop flex gap-3 justify-between">
              <div className="leftTopInner flex flex-col">
                <h4 className="text-xl font-bold">Hello Tosin</h4>
                <p className="text-sm text-gray-400">
                  Track your Investment Journey here
                </p>
              </div>
              <div className="rightTopInner flex pr-5">
                <div className="account grid grid-cols-2 justify-center items-center gap-3">
                  <div className="sign text-gray-400">Sign Out</div>
                  <div className="avatar w-8 h-8 rounded-full overflow-hidden flex items-center justify-center">
                    <img
                      src="../assets/headshot.jpg"
                      className="w-full h-full object-cover"
                      alt="User Avatar"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="rightBottom">
              <div className="investment w-5/5 mt-10 mx-auto lg:mx-0">
                <div className="investmentTabs grid grid-rows-1 md:grid-cols-3 gap-5">
                  <div className="total flex flex-col justify-center w-full mx-auto flex-1 border border-spacing-1 border-gray-700 p-6 rounded-sm">
                    <p className="text-secondary-light">Total Investment</p>
                    <h3 className="text-3xl font-bold  py-2">$15,867.00</h3>
                    <div className="plan flex flex-col">
                      <span className="text-secondary-light">Starter Plan</span>
                      <small className="text-sm text-gray-400">
                        Invested August 15 2022
                      </small>
                    </div>
                  </div>
                  <div className="roi flex-1 flex flex-col justify-center w-full mx-auto border border-spacing-1 border-gray-700 p-6 rounded-sm">
                    <p className="text-secondary-light">Total ROI</p>
                    <h3 className="text-3xl font-bold  py-2">$1,522.00</h3>
                    <span className="text-secondary-light text-sm">
                      6.5% Monthly
                    </span>
                  </div>
                  <div className="balance flex flex-col justify-center w-full mx-auto flex-1 border border-spacing-1 border-gray-700 p-6 rounded-sm">
                    <p className="text-secondary-light">Balance Pending</p>
                    <h3 className="text-3xl font-bold  py-2">$18,000.00</h3>
                    <span className="text-secondary-light text-sm">
                      Due Date - August 16 2024
                    </span>
                  </div>
                </div>
              </div>
              <div className="plans w-full py-20">
                <div className="plansContent">
                  <div className="planTitle mb-20">
                    <h2 className="text-2xl md:text-4xl font-bold text-gray-300">
                      Choose an Investment Plan
                    </h2>
                  </div>
                  <div className="plansWrapper w-5/5 mx-auto md:mx-0 gap-10 md:gap-5 grid grid-cols-1 md:grid-cols-3 rounded-sm ">
                    {plans.map((plan, id) => (
                      <div className="plan bg-accent" key={id}>
                        <div className="planContent p-4">
                          <h3 className="text-2xl font-bold text-secondary-light">
                            {plan.plan}
                          </h3>
                          <h5 className="font-bold text-xl py-1">
                            {plan.amount}
                          </h5>
                          {plan.list.map((subitem, subindex) => (
                            <li
                              key={subindex}
                              className="list-none mb-1 text-gray-300"
                            >
                              {subitem}
                            </li>
                          ))}
                          <button className="rounded-full border text-lg font-semibold border-secondary-light mt-5 py-3 px-10 hover:border-transparent hover:bg-secondary-light hover:text-accent">
                            Invest Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
