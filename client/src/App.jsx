import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import Header from "./components/header/Header";
import Company from "./pages/company/Company";
import Footer from "./components/footer/Footer";
import "./App.css";
import Signup from "./pages/signup/Signup";
import "flowbite/dist/flowbite.css";
import Signin from "./pages/sign/Signin";
import Dashboard from "./pages/dashboard/Dashboard";

function Layout({ children }) {
  return (
    <div className="app-container">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/company"
          element={
            <Layout>
              <Company />
            </Layout>
          }
        />
        <Route
          path="/signup"
          element={
            <Layout>
              <Signup />
            </Layout>
          }
        />
        <Route
          path="/signin"
          element={
            <Layout>
              <Signin />
            </Layout>
          }
        />
        <Route
          path="/dashboard"
          element={
            <Layout>
              <Dashboard />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
