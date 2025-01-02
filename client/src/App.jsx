import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
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
import { UserProvider } from "./components/profile/UserContext";
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

// Import the UserProvider

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );

  useEffect(() => {
    const authState = localStorage.getItem("isAuthenticated") === "true";
    setIsAuthenticated(authState);
  }, []);

  return (
    // Wrap the entire Router with UserProvider
    <Router>
      <LayoutWithHeader>
        <Routes>
          {/* Main public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/company" element={<Company />} />
          <Route path="/terms-condition" element={<Terms />} />
          <Route path="/privacy-policy" element={<Privacy />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/forgotpassword" element={<Forgotpassword />} />
          <Route path="/resetpassword/:token" element={<Resetpassword />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admindashboard" element={<Admindashboard />} />
          <Route path="/adminDashboard/manageUsers" element={<Adminusers />} />
          <Route
            path="/adminDashboard/managePayments"
            element={<AdminPayments />}
          />
          <Route
            path="/adminDashboard/manageInvestments"
            element={<Admininvestments />}
          />
          <Route path="/adminDashboard/managePlans" elements={<Adminplans />} />
          <Route
            path="/signin"
            element={<Signin setIsAuthenticated={setIsAuthenticated} />}
          />
          {/* Protected Dashboard routes */}
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
          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </LayoutWithHeader>
    </Router>
  );
}

export default App;
