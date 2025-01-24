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
import Referral from "./pages/dashboard/referral/Referral";
import Plans from "./pages/dashboard/plans/Plans";
import Withdrawal from "./pages/dashboard/withdrawal/Withdrawal";
import Forgotpassword from "./pages/forgotpassword/Forgotpassword";
import Resetpassword from "./pages/resetpassword/Resetpassword";
import Terms from "./pages/terms/Terms";
import Privacy from "./pages/privacy/Privacy";
import Admin from "./pages/admin/Admin";
import Admindashboard from "./pages/admin/dashboard/Admindashboard";
import Adminusers from "./pages/admin/dashboard/Adminusers";
import AdminPayments from "./pages/admin/dashboard/adminPayments";
import Admininvestments from "./pages/admin/dashboard/Admininvestments";
import Adminplans from "./pages/admin/dashboard/Adminplans";
import AdminSignup from "./pages/admin/AdminSignup";
import AdminLayout from "./pages/admin/dashboard/Adminlayout";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(
    !!localStorage.getItem("adminToken")
  );

  useEffect(() => {
    setIsAuthenticated(localStorage.getItem("isAuthenticated") === "true");
    setIsAdminAuthenticated(!!localStorage.getItem("adminToken"));
  }, []);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={
            <LayoutWithHeader>
              <Home />
            </LayoutWithHeader>
          }
        />
        <Route
          path="/company"
          element={
            <LayoutWithHeader>
              <Company />
            </LayoutWithHeader>
          }
        />
        <Route
          path="/terms-condition"
          element={
            <LayoutWithHeader>
              <Terms />
            </LayoutWithHeader>
          }
        />
        <Route
          path="/privacy-policy"
          element={
            <LayoutWithHeader>
              <Privacy />
            </LayoutWithHeader>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/admin"
          element={<Admin setIsAdminAuthenticated={setIsAdminAuthenticated} />}
        />
        <Route path="/forgotpassword" element={<Forgotpassword />} />
        <Route path="/resetpassword/:token" element={<Resetpassword />} />
        <Route
          path="/signin"
          element={<Signin setIsAuthenticated={setIsAuthenticated} />}
        />

        {/* Protected Dashboard Routes */}
        <Route
          path="/dashboard/*"
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

        {/* Admin Dashboard Routes */}
        <Route
          path="/admindashboard/*"
          element={
            isAdminAuthenticated ? (
              <AdminLayout />
            ) : (
              <Navigate to="/admin" replace />
            )
          }
        >
          <Route index element={<Admindashboard />} />
          <Route path="manageUsers" element={<Adminusers />} />
          <Route path="managePayments" element={<AdminPayments />} />
          <Route path="manageInvestments" element={<Admininvestments />} />
          <Route path="managePlans" element={<Adminplans />} />
          <Route path="signup" element={<AdminSignup />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
