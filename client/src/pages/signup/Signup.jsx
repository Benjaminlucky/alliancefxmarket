import React, { useState } from "react";
import axios from "axios";
import "./signup.css";
import { Checkbox, Label, TextInput, Spinner } from "flowbite-react";
import { HiMail } from "react-icons/hi";
import { FaUserCircle } from "react-icons/fa";
import { HiPhone } from "react-icons/hi";
import { FaIdCardClip } from "react-icons/fa6";
import { RiLockPasswordFill } from "react-icons/ri";
import Select from "react-select";
import countryList from "react-select-country-list";
import Flag from "react-world-flags"; // Import flag library
import { testimony } from "../../data.js";
import { Link } from "react-router-dom";

function Signup() {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    country: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false); // Track loading state
  const [responseMessage, setResponseMessage] = useState(""); // To hold success or error message
  const [errorMessages, setErrorMessages] = useState([]); // For error messages

  const options = countryList()
    .getData()
    .map((country) => ({
      value: country.value,
      label: (
        <div style={{ display: "flex", alignItems: "center" }}>
          <Flag
            code={country.value}
            style={{ width: "20px", marginRight: "10px" }}
          />
          <span>{country.label}</span>
        </div>
      ),
    }));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCountryChange = (value) => {
    setSelectedCountry(value);
    setFormData((prev) => ({
      ...prev,
      country: value ? value.value : "", // Use only `value`
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        formData
      );
      // On success, display the success message
      setResponseMessage(response.data.message);
      setErrorMessages([]); // Clear previous errors
    } catch (error) {
      // On failure, split the error message into individual errors and display them
      if (error.response?.data?.error) {
        const errors = error.response.data.error.split(", ");
        setErrorMessages(errors); // Store the errors as an array
      }
      setResponseMessage(""); // Clear any success messages
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="innerWrapper max-w-full flex justify-center bg-black text-white">
      <div className="innerContent flex flex-col md:flex-col lg:flex-row gap-20 w-4/5 py-20 ">
        <div className="left flex-2 items-start">
          <div className="leftContent">
            <div className="top py-10">
              <h2 className="font-extrabold text-3xl md:text-5xl lg:text-7xl pt-3">
                Create an Account
              </h2>
              <p className="text-secondary-light text-3xl mt-3">
                To Start Investing...
              </p>
            </div>
            <div className="bottom w-full">
              <form action="" className="w-full" onSubmit={handleSubmit}>
                {/* Full Name Field */}
                <div className="max-w-2xl mt-3 flex flex-col">
                  <Label htmlFor="full-name" className="text-white pb-3">
                    Full Name
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaUserCircle className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Elon Musk"
                      onChange={handleChange}
                      value={formData.fullName}
                    />
                  </div>
                </div>

                {/* Username Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <Label htmlFor="username" className="text-white pb-3">
                    Username
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaIdCardClip className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="elonmus79"
                      onChange={handleChange}
                      value={formData.username}
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <Label htmlFor="email" className="text-white pb-3">
                    Email
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <HiMail className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="elon@example.com"
                      onChange={handleChange}
                      value={formData.email}
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <Label htmlFor="phone" className="text-white pb-3">
                    Phone
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <HiPhone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="+1 0678 9088 787"
                      onChange={handleChange}
                      value={formData.phone}
                    />
                  </div>
                </div>

                {/* Country Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <Label htmlFor="country" className="text-white pb-3">
                    Country
                  </Label>
                  <div className="relative max-w-2xl mt-5 flex flex-col">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <HiPhone className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <Select
                      id="country"
                      name="country"
                      options={options}
                      value={selectedCountry}
                      onChange={handleCountryChange}
                      className="text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg"
                      placeholder="Select your country"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <Label htmlFor="password" className="text-white pb-3">
                    Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <RiLockPasswordFill className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="******"
                      onChange={handleChange}
                      value={formData.password}
                    />
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div className="max-w-2xl mt-5 flex flex-col">
                  <Label htmlFor="confirm-password" className="text-white pb-3">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <RiLockPasswordFill className="w-5 h-5 text-gray-500 dark:text-gray-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="******"
                      onChange={handleChange}
                      value={formData.confirmPassword}
                    />
                  </div>
                </div>

                {/* Checkbox for Terms and Conditions */}
                <div className="flex max-w-md flex-col gap-4 mt-10">
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="accept"
                      defaultChecked
                      className="text-primary-light"
                    />
                    <Label htmlFor="accept" className="flex text-gray-400 pb-3">
                      I agree with the&nbsp;
                      <a
                        href="#"
                        className="text-primary-light hover:underline"
                      >
                        terms and conditions
                      </a>
                    </Label>
                  </div>
                </div>
                <div className="flex max-w-md gap-4 mt-2">
                  <span className="text-gray-500">
                    Already have an Account ?{" "}
                  </span>
                  <Link
                    to="/signin"
                    className="hover:underline text-secondary-light"
                  >
                    Sign in
                  </Link>
                </div>
                {/* Submit Button */}
                <div className="button">
                  <button
                    type="submit"
                    className="text-white w-full mt-5 bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-3.5 text-center me-2 mb-2"
                    disabled={loading} // Disable the button while loading
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Spinner size="sm" />
                        <span>Submitting...</span>
                      </div>
                    ) : (
                      "Create Account"
                    )}
                  </button>
                </div>
                {responseMessage && (
                  <div className="response-message mt-4 text-white">
                    {responseMessage}
                  </div>
                )}

                {errorMessages && (
                  <div className="error-messages mt-4 text-red-500">
                    <ul>
                      {errorMessages.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
        <div className="right flex-1 w-full  bg-white rounded-lg">
          <div className="rightContent p-5">
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
                  {testimony.map((testimony, index) => (
                    <div
                      key={index}
                      className="testimony relative overflow-hidden rounded-lg shadow-lg min-h-[200px]"
                    >
                      <div className="absolute inset-0 bg-secondary-light bg-opacity-50 backdrop-blur-sm"></div>
                      <div className="relative z-10 p-6 md:ml-10 md:mr-10 lg:ml-10 lg:mr-10">
                        <div className="top flex  justify-between items-start mb-4">
                          <div className="left flex  items-center">
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

export default Signup;
