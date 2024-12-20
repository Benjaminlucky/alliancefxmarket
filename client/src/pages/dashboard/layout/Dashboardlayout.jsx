import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Importing the icons
import "./layout.css";
import Sidebar from "../../../components/sidebar/Sidebar";

const Dashboardlayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false); // Close sidebar after a route is clicked
  };

  return (
    <div className="layout relative flex bg-black min-h-screen">
      {/* Sidebar toggle button for mobile */}
      <button
        className="sidebar-toggle md:hidden text-white absolute  top-4 z-50"
        onClick={handleSidebarToggle}
      >
        {sidebarOpen ? <FiX size={24} /> : <FiMenu size={24} />}
      </button>

      {/* Sidebar */}
      <aside
        className={`sidebar bg-gray-800 transition-transform duration-300 ease-in-out md:h-auto  ${
          sidebarOpen ? "sidebar-open z-50" : "hidden md:block"
        }`}
      >
        <Sidebar closeSidebar={closeSidebar} />{" "}
        {/* Pass closeSidebar function */}
      </aside>

      {/* Main content */}
      <main className=" flex-1 ">
        <Outlet /> {/* Render child routes */}
      </main>
    </div>
  );
};

export default Dashboardlayout;
