import React, { useState } from "react";
import { MdEmail } from "react-icons/md";
import { MdOutlinePassword } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import axios from "axios";
import { Spinner } from "flowbite-react";
import "./admin.css";
import { useNavigate } from "react-router-dom";

function AdminSignup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setMessage("");
    setError("");
    setLoading(true);

    const API_BASE_URL =
      window.location.origin === "http://localhost:5173"
        ? "http://localhost:3000"
        : "https://alliancefxmarket.onrender.com";
    try {
      const response = await axios.post(
        `${API_BASE_URL}/admin/register`,
        formData
      );
      setMessage(response.data.message);
      setFormData({ fullName: "", email: "", password: "" });
      setTimeout(() => {
        navigate("/admin");
      }, 2000); // Redirect after a short delay
    } catch (error) {
      setError(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin__section w-full">
      <div className="admin__wrapper mt-20 w-4/5 mx-auto">
        <div className="admin__content flex flex-col items-center md:px-32 py-20">
          <form
            onSubmit={handleSubmit} // Add onSubmit handler
            className="w-full md:w-2/5 flex flex-col items-center"
          >
            <div className="admin__title flex items-center">
              <h1 className="text-lg md:text-3xl font-bold py-8 text-2xl text-gray-700 !text-left">
                Register to manage your App
              </h1>
            </div>
            <div className="formcontent w-full">
              <div className="emailinput flex items-center border-2 border-gray-300 rounded-lg p-2 mb-5">
                <FaUserAlt className="text-3xl text-gray-700" />
                <input
                  type="text"
                  name="fullName"
                  placeholder="Enter your Full Name"
                  className="input border-none w-full ml-1 focus:outline-none focus:border-none focus:ring-0"
                  value={formData.fullName}
                  onChange={handleChange}
                />
              </div>
              <div className="emailinput flex items-center border-2 border-gray-300 rounded-lg p-2">
                <MdEmail className="text-3xl text-gray-700" />
                <input
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className="input border-none w-full ml-1 focus:outline-none focus:border-none focus:ring-0"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="passwordInput flex items-center border-2 border-gray-300 rounded-lg focus:ring-0 mt-5 p-2">
                <MdOutlinePassword className="text-3xl text-gray-700" />
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your Password"
                  className="border-none w-full ml-1 focus:outline-none focus:border-none focus:ring-0"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit" // Ensure button type is submit
                className="submitBtn w-full mt-5 bg-secondary-light rounded-lg p-3 text-xl font-bold text-gray-700 flex items-center justify-center border border-2 border-transparent hover:bg-black hover:border-2 hover:border-secondary-light hover:text-white transition-all duration-300"
              >
                {loading ? (
                  <>
                    <Spinner size="sm" color="white" /> Signing Up Admin...
                  </>
                ) : (
                  "Sign Up Admin"
                )}
              </button>
              {message && <p className="text-green-500 mt-3">{message}</p>}
              {error && <p className="text-red-500 mt-3">{error}</p>}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default AdminSignup;
