import React from "react";
import { NavLink } from "react-router-dom";
import { dashnavigation } from "../../data";
import "./sidebar.css";

const Sidebar = ({ closeSidebar }) => {
  return (
    <aside className="nav flex flex-col gap-4">
      {dashnavigation.map((nav, index) => (
        <NavLink
          to={`/dashboard${nav.link}`}
          key={index}
          className={({ isActive }) =>
            `link flex items-center gap-3 py-4 px-2 text-lg text-white hover:bg-gray-700 rounded-md ${
              isActive ? "bg-gray-700 active" : ""
            }`
          }
          onClick={closeSidebar} // Close sidebar when a link is clicked
        >
          <div className="icon">{React.createElement(nav.icon)}</div>
          <div className="linkLabel">{nav.label}</div>
        </NavLink>
      ))}
    </aside>
  );
};

export default Sidebar;
