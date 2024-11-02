import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Home from "./pages/home/Home";
import Signup from "./pages/signup/Signup";
import Signin from "./pages/sign/Signin";
import Dashboard from "./pages/dashboard/Dashboard";
import Invest from "./pages/dashboard/invest/Invest";
import Earning from "./pages/dashboard/earning/Earning";
import Payments from "./pages/dashboard/Payments";
import Dashboardlayout from "./pages/dashboard/layout/Dashboardlayout";
import Company from "./pages/company/Company";
import LayoutWithHeader from "./components/layoutoutwithheader/LayoutWithHeader";
import "./App.css";
import Referral from "./pages/dashboard/referral/Referral";
import Plans from "./pages/dashboard/plans/Plans";
import Withdrawal from "./pages/dashboard/withdrawal/Withdrawal";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const authState = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authState);
  }, []);

  return (
    <Router>
      <LayoutWithHeader>
        <Routes>
          {/* Main public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/signin"
            element={<Signin setIsAuthenticated={setIsAuthenticated} />}
          />

          {/* Protected Dashboard routes */}
          <Route
            path="/dashboard"
            element={
              isAuthenticated ? (
                <Dashboardlayout />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="payments" element={<Payments />} />
            <Route path="invest" element={<Invest />} />
            <Route path="earning" element={<Earning />} />
            <Route path="referral" element={<Referral />} />
            <Route path="plans" element={<Plans />} />
            <Route path="withdrawal" element={<Withdrawal />} />
          </Route>

          {/* Catch-all route to redirect to /dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </LayoutWithHeader>
    </Router>
  );
}

export default App;
