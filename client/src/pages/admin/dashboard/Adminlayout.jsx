import React, { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { adminDashboardLinks } from "../../../data";
import { HiMenu } from "react-icons/hi";

function AdminLayout() {
  const path = useLocation().pathname;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="w-full flex flex-col lg:flex-row">
      {/* Mobile header */}
      <div className="flex justify-between items-center p-4 lg:hidden bg-white shadow-md z-50">
        <h2 className="text-xl font-semibold">Admin Dashboard</h2>
        <button
          className="text-3xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          <HiMenu />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`bg-gray-100 shadow-md fixed top-0 left-0 h-full z-40 transform transition-transform duration-300 w-64 lg:relative lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:w-1/5`}
      >
        <div className="p-4 lg:p-0 mt-16 lg:mt-0">
          <ul className="flex flex-col gap-3 py-4">
            {adminDashboardLinks.map((link, index) => (
              <li key={index}>
                <Link
                  to={link.link}
                  onClick={() => setIsSidebarOpen(false)}
                  className={`flex items-center gap-3 py-2 px-4 hover:bg-secondary-light transition-all duration-300 ${
                    path === link.link
                      ? "!bg-secondary-light !text-gray-500"
                      : "text-gray-700"
                  }`}
                >
                  {React.createElement(link.icon, {
                    className: `text-3xl ${
                      path === link.link ? "text-gray-500" : "text-gray-700"
                    }`,
                  })}
                  <span
                    className={`text-lg ${
                      path === link.link ? "text-gray-500" : "text-gray-500"
                    }`}
                  >
                    {link.name}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Main content */}
      <div className="mainarea flex-1 bg-white w-full lg:w-4/5 p-4 mt-2 lg:mt-0">
        <div className="mainArea__content p-2 md:p-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
