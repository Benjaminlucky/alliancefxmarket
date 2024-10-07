import React, { useState } from "react";
import "./signup.css";
import { Checkbox, Label, TextInput } from "flowbite-react";
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

  // Add flex display for the flag and country name
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

  const handleChange = (value) => {
    setSelectedCountry(value);
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
              <form action="" className="w-full">
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
                      id="full-name"
                      type="text"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="Elon Musk"
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
                      type="text"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="elonmus79"
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
                      type="email"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="elon@example.com"
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
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="+1 0678 9088 787"
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
                      options={options}
                      value={selectedCountry}
                      onChange={handleChange}
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
                      type="password"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="******"
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
                      id="confirm-password"
                      type="password"
                      className="block w-full pl-10 p-2.5 text-sm font-bold bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                      placeholder="******"
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
                <div className="button">
                  <button
                    type="button"
                    class="text-white w-full mt-5  bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-lg px-5 py-3.5 text-center me-2 mb-2"
                  >
                    Create Account
                  </button>
                </div>
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
