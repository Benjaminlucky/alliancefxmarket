import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../sign/signin.css";
import { Checkbox, Label, Spinner } from "flowbite-react"; // Import Spinner
import { HiMail } from "react-icons/hi";
import { Link } from "react-router-dom";
import { testimony } from "../../data.js";
import axios from "axios";

function Forgotpassword({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Attempt to get the email from location state, or default to an empty string
  const initialEmail = location.state?.email || ""; // Check if the email is in state
  const [email, setEmail] = useState(initialEmail);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // If the email is provided through state, we want to set it as the default value.
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    const API_BASE_URL =
      window.location.origin === "http://localhost:5173"
        ? "http://localhost:3000"
        : "https://alliancefxmarket.onrender.com";

    try {
      const response = await axios.post(`${API_BASE_URL}/user/forgot-password`, { email });
      if (response && response.data) {
        setSuccess(response.data.message); // Success message
        setError(null);
      } else {
        setError("Unexpected response format");
        setSuccess(null);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.error); // Error message from server
      } else {
        setError("An error occurred during the request.");
      }
      setSuccess(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="innerWrapper max-w-full flex justify-center bg-black text-white">
      <div className="innerContent flex flex-col md:flex-col lg:flex-row gap-20 w-4/5 mt-20 py-20">
        <div className="left flex-2 items-start">
          <div className="leftContent">
            <div className="top py-10">
              <h2 className="font-extrabold text-2xl md:text-5xl lg:text-7xl pt-3">
                Forgotten Your Password?
              </h2>
              <p className="text-secondary-light text-xl mt-3">
                Enter your email address below and we'll send you a link to reset your password.
              </p>
            </div>
            <div className="bottom w-full">
              <form onSubmit={handleForgotPassword} className="w-full">
                {/* Email Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="email"
                      value="Email"
                      className="text-white"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <HiMail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="elon@example.com"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                </div>

                <div className="flex max-w-md gap-4 mt-5">
                  <span className="text-gray-500">Don't have an Account?</span>
                  <Link
                    to="/signup"
                    className="hover:underline text-secondary-light"
                  >
                    Sign Up
                  </Link>
                </div>

                <div className="button mt-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-3.5 text-center"
                  >
                    {loading ? (
                      <>
                        <Spinner size="sm" color="white" /> Resetting password...
                      </>
                    ) : (
                      "Reset Password"
                    )}
                  </button>
                </div>
                {/* Success and Error Messages */}
                {error && (
                  <div className="text-red-500 font-semibold mt-4">{error}</div>
                )}
                {success && (
                  <div className="text-green-500 font-semibold mt-4">
                    {success}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="right flex-1 w-full bg-white rounded-lg">
          <div className="rightContent p-10">
            <div className="top">
              <div className="rightTopContent">
                <h3 className="text-black font-extrabold text-xl md:text-4xl lg:text-5xl leading-normal">
                  See what Investors are saying about us!
                </h3>
              </div>
            </div>
            <div className="bottom">
              <div className="rightBottomContent mt-10">
                <div className="testimonials flex flex-col gap-5">
                  {testimony.slice(0, 1).map((testimony, index) => (
                    <div
                      key={index}
                      className="testimony relative overflow-hidden rounded-lg shadow-lg min-h-[200px]"
                    >
                      <div className="absolute inset-0 bg-secondary-light bg-opacity-50 backdrop-blur-sm"></div>
                      <div className="relative z-10 p-6 md:ml-10 md:mr-10 lg:ml-10 lg:mr-10">
                        <div className="top flex justify-between items-start mb-4">
                          <div className="left flex items-center">
                            <div className="testifier mr-4">
                              <img
                                className="w-16 h-16 rounded-full object-cover border-2 border-white"
                                src={testimony.image}
                                alt={testimony.name}
                              />
                            </div>
                            <div className="name">
                              <h3 className="font-bold text-lg text-primary">
                                {testimony.name}
                              </h3>
                              <h5 className="text-sm text-gray-600">
                                {testimony.Designation}
                              </h5>
                            </div>
                          </div>
                          <div className="right flex items-end text-xl text-primary">
                            {typeof testimony.icon === "function"
                              ? testimony.icon()
                              : testimony.icon}
                          </div>
                        </div>
                        <div className="bottom py-5">
                          <p className="text-gray-700 italic">
                            {testimony.testimony}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Forgotpassword;
