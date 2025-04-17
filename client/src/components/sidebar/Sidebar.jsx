import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { dashnavigation } from "../../data";

import "./sidebar.css";
import { resetUser } from "../redux/slices/Userslice";

const Sidebar = ({ closeSidebar }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(resetUser());
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <aside className="nav flex flex-col gap-4">
      {dashnavigation.map((nav, index) => {
        const isLogout = nav.label === "Log Out";

        return (
          <div
            key={index}
            onClick={() => {
              closeSidebar();
              if (isLogout) handleSignOut();
            }}
          >
            <NavLink
              to={isLogout ? "#" : `/dashboard${nav.link}`}
              className={({ isActive }) => {
                const baseStyles =
                  "link flex items-center gap-3 py-4 px-2 text-lg rounded-md transition";

                const activeStyles =
                  isActive && !isLogout
                    ? "bg-gray-700 text-white"
                    : "text-white hover:bg-gray-700";

                const logoutStyles = "bg-red-600 text-white hover:bg-red-700";

                return `${baseStyles} ${
                  isLogout ? logoutStyles : activeStyles
                }`;
              }}
            >
              <div className="icon">{React.createElement(nav.icon)}</div>
              <div className="linkLabel">{nav.label}</div>
            </NavLink>
          </div>
        );
      })}
    </aside>
  );
};

export default Sidebar;
