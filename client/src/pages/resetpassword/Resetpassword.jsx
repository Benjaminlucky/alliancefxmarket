import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../sign/signin.css";
import { Checkbox, Label, Spinner } from "flowbite-react"; // Import Spinner
import { RiLockPasswordFill } from "react-icons/ri";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"; // Import eye icons for toggle
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordRequest, resetPasswordSuccess, resetPasswordFailure } from "../../components/redux/slices/Userslice.js"; // Adjust path
import { testimony } from "../../data.js";

function Resetpassword({ setIsAuthenticated }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  // Redux state
  const { loading: reduxLoading, success: reduxSuccess, error: reduxError } = useSelector((state) => state.user);

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  const from = location.state?.from?.pathname || "/dashboard";
  const urlParams = new URLSearchParams(window.location.search);
  const email = urlParams.get("email");

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    // Validation for password match
    if (password !== confirmPassword) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    setLoading(true);
    dispatch(resetPasswordRequest()); // Dispatch loading state

    const API_BASE_URL =
      window.location.origin === "http://localhost:5173"
        ? "http://localhost:3000"
        : "https://alliancefxmarket.onrender.com";

    if (!email) {
      setError("Email is required to reset the password.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/user/resetpassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email, // Use the email obtained from the URL
          newPassword: password,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("Password updated successfully!");
        setPassword("");
        setConfirmPassword("");
        dispatch(resetPasswordSuccess()); // Dispatch success state
        setTimeout(() => navigate(from, { replace: true }), 2000); // Redirect after success
      } else {
        setError(data.error || "Failed to update password. Please try again.");
        dispatch(resetPasswordFailure(data.error || "Failed to update password.")); // Dispatch failure state
      }
    } catch (err) {
      setError("An unexpected error occurred. Please try again later.");
      dispatch(resetPasswordFailure("An unexpected error occurred."));
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
              <h2 className="font-extrabold text-3xl md:text-5xl lg:text-7xl pt-3">
                Reset Password
              </h2>
              <p className="text-secondary-light text-2xl mt-3">
                Your new password must be at least eight characters long.
              </p>
            </div>
            <div className="bottom w-full">
              <form onSubmit={handleSubmit} className="w-full">
                {/* Password Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="password"
                      value="New Password"
                      className="text-white"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <RiLockPasswordFill className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"} // Toggle between text and password
                      placeholder="******"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <AiOutlineEye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <div className="mb-2 block">
                    <Label
                      htmlFor="confirmPassword"
                      value="Confirm New Password"
                      className="text-white"
                    />
                  </div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <RiLockPasswordFill className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type={showPassword ? "text" : "password"} // Toggle between text and password
                      placeholder="******"
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <div
                      className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <AiOutlineEyeInvisible className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      ) : (
                        <AiOutlineEye className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                      )}
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="button mt-5">
                  <button
                    type="submit"
                    disabled={reduxLoading}
                    className="text-white w-full bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-3.5 text-center"
                  >
                    {reduxLoading ? (
                      <>
                        <Spinner size="sm" color="white" className="mr-2" />
                        Updating new password...
                      </>
                    ) : (
                      "Update new password"
                    )}
                  </button>
                </div>

                {/* Success and Error Messages */}
                {reduxError && (
                  <div className="text-red-500 font-semibold mt-4">{reduxError}</div>
                )}
                {reduxSuccess && (
                  <div className="text-green-500 font-semibold mt-4">
                    {reduxSuccess}
                  </div>
                )}
                {error && <p style={{ color: 'red' }}>{error}</p>}
                {success && <p className="text-green-500 font-semibold mt-4">{success}</p>}
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
                        <div className="bottom">
                          <p className="text-black font-bold text-sm md:text-xl">
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

export default Resetpassword;
