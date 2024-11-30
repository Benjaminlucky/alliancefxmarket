import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [userFullName, setUserFullName] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [isVerified, setIsVerified] = useState(false); // State for email verification
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Check if user is logged in and fetch verification status
    const storedFullName = localStorage.getItem("fullName");
    const storedAuthToken = localStorage.getItem("authToken");

    if (!storedAuthToken || !storedFullName) {
      console.log("User is not logged in. Redirecting to login.");
      navigate("/signin");
    } else {
      setUserFullName(storedFullName);
      setAuthToken(storedAuthToken);

      // Fetch user verification status
      const fetchUserStatus = async () => {
        const API_BASE_URL =
          window.location.origin === "http://localhost:5173"
            ? "http://localhost:3000" // Development backend
            : "https://alliancefxmarket.onrender.com"; // Production backend

        try {
          const response = await fetch(`${API_BASE_URL}/user/status`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${storedAuthToken}`,
            },
          });

          if (!response.ok) {
            throw new Error("Failed to fetch user status.");
          }

          const data = await response.json();
          setIsVerified(data.isVerified); // Update the isVerified state
        } catch (error) {
          console.error("Error fetching user status:", error);
          navigate("/signin");
        }
      };

      fetchUserStatus();
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("fullName");
    navigate("/signin");
  };

  const handleResendVerification = async () => {
    setIsResending(true);
    setError(null);
    setSuccessMessage(null);

    if (!authToken) {
      setError("Authentication token is missing. Please sign in again.");
      setIsResending(false);
      return;
    }

    const API_BASE_URL =
      window.location.origin === "http://localhost:5173"
        ? "http://localhost:3000"
        : "https://alliancefxmarket.onrender.com";

    try {
      const response = await fetch(`${API_BASE_URL}/user/resend-verification`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      const contentType = response.headers.get("Content-Type");
      let result;

      if (contentType && contentType.includes("application/json")) {
        result = await response.json();
      } else {
        const text = await response.text();
        console.error("Unexpected response format:", text);
        throw new Error("Unexpected response format from the server.");
      }

      if (response.ok) {
        setSuccessMessage(
          result.message || "Verification email sent successfully."
        );

        // Redirect to dashboard after successful verification
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000); // Redirect after 2 seconds
      } else {
        setError(result.error || "Failed to resend verification email.");
      }
    } catch (error) {
      console.error("Unexpected error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  if (!userFullName) {
    return <div>Loading...</div>; // Show loading until fullName is fetched
  }

  return (
    <div className="profileSection">
      <div className="profileWrapper flex justify-between items-center">
        <div className="profileLeft">
          <div className="profileDetails">
            <h2 className="font-bold text-2xl text-white">
              {`Hello ${userFullName}`}
            </h2>
            <p className="text-gray-400 text-sm md:text-xl">
              Track your Investment Journey here
            </p>
            {!isVerified && (
              <div className="verificationAlert bg-secondary-light mt-5 p-4 text-black rounded-lg">
                <p>Please verify your email to fully activate your account.</p>
                <button
                  onClick={handleResendVerification}
                  disabled={isResending}
                  className="text-black font-bold text-2xl hover:underline"
                >
                  {isResending ? "Resending..." : "Resend Verification Email"}
                </button>
                {error && <p className="text-red-500">{error}</p>}
                {successMessage && (
                  <p className="text-green-500">{successMessage}</p>
                )}
              </div>
            )}
          </div>
        </div>
        <div className="profileRight">
          <div className="profileAvatar flex flex-col md:flex-row gap-3 justify-center items-center">
            <span
              onClick={handleSignOut}
              className="text-gray-300 cursor-pointer hover:text-red-500"
            >
              Sign Out
            </span>
            <img
              src={localStorage.getItem("userAvatar") || "default-avatar.jpg"}
              alt="User Avatar"
              className="avatar w-14 h-14 md:w-20 md:h-20 rounded-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
