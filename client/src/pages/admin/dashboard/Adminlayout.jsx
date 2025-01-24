import React from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { adminDashboardLinks } from "../../../data";

function AdminLayout() {
  const path = useLocation().pathname;

  return (
    <div className="w-full flex">
      <aside className="adminDashboard__sidebar bg-gray-100 shadow-md w-full lg:w-1/5 p-4 lg:p-0">
        <ul className="flex flex-col gap-3 py-4 mt-10">
          {adminDashboardLinks.map((link, index) => (
            <li key={index}>
              <Link
                to={link.link}
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
      </aside>

      <div className="mainarea flex-1 bg-white w-full lg:w-4/5 p-4">
        {/* You can add other layout components like header here */}
        <div className="mainArea__content p-4 md:p-5">
          {/* Check if there is no outlet content, and render a default message */}
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
