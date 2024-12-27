import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../header/Header";
import Footer from "../footer/Footer";

const LayoutWithHeader = ({ children }) => {
  const location = useLocation();

  // Determine if the header should be displayed based on the current path
  const hideHeaderPaths = ["/dashboard", "/payments", "/invest", "/earning"];

  // Hide the header if the path starts with any of the above
  const showHeader = !hideHeaderPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {showHeader && <Header />} {/* Conditionally render the Header */}
      {children} {/* Render children (i.e., Routes and other components) */}
      <Footer />
    </>
  );
};

export default LayoutWithHeader;
