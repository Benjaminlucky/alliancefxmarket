import React, { useState } from "react";
import { MdEmail, MdOutlinePassword } from "react-icons/md";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import "./admin.css";

function Admin({ setIsAdminAuthenticated }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(null); // Added success state

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null); // Reset success state on new submission

    const API_BASE_URL =
      window.location.origin === "http://localhost:5173"
        ? "http://localhost:3000"
        : "https://alliancefxmarket.onrender.com";

    try {
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const { user_id, admin_fullname, admin_email, token } = data;

        setIsAdminAuthenticated(true);
        localStorage.setItem("adminToken", token);
        localStorage.setItem("adminId", user_id);
        localStorage.setItem("adminName", admin_fullname);
        localStorage.setItem("adminEmail", admin_email);

        setSuccess("Login successful! Redirecting..."); // Set success message
        setTimeout(() => {
          navigate("/admindashboard");
        }, 2000); // Redirect after a short delay
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (error) {
      setError(error.message || "An error occurred during login.");
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="admin__section w-full">
      <div className="admin__wrapper mt-20 w-4/5 mx-auto">
        <div className="admin__content flex flex-col items-center md:px-32 py-20">
          <form
            onSubmit={handleSignIn}
            className="w-full md:w-2/5 flex flex-col items-center"
          >
            <h1 className="text-lg md:text-3xl font-bold py-8 text-gray-700">
              Please Sign in to your Dashboard
            </h1>
            <div className="formcontent w-full">
              <div className="emailinput flex items-center border-2 rounded-lg p-2">
                <MdEmail className="text-3xl text-gray-700" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  required
                  className="input w-full ml-1 focus:outline-none focus:border-none focus:ring-0"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="passwordInput relative flex items-center border-2 rounded-lg mt-5 p-2">
                <MdOutlinePassword className="text-3xl text-gray-700" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your Password"
                  required
                  className="w-full ml-1 focus:outline-none focus:border-none focus:ring-0"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                </div>
              </div>
              <button
                type="submit"
                className="submitBtn w-full mt-5 p-3 rounded-lg bg-secondary-light text-xl font-bold"
                disabled={loading}
              >
                {loading ? "Loading..." : "Login to Dashboard"}
              </button>
              {error && <p className="text-red-500 mt-3">{error}</p>}
              {success && (
                <div className="text-green-500 font-semibold mt-4">
                  {success}
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}

export default Admin;
