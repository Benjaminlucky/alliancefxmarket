import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const [userFullName, setUserFullName] = useState(null);
  const [isResending, setIsResending] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    // Check if user is logged in by verifying localStorage
    const userFullName = localStorage.getItem("fullName");
    const authToken = localStorage.getItem("authToken");

    if (!authToken || !userFullName) {
      console.log("User is not logged in. Redirecting to login.");
      navigate("/signin");
    } else {
      // Set the userFullName from localStorage
      setUserFullName(userFullName);
    }
  }, [navigate]);

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("fullName");
    navigate("/signin");
  };

  const resendVerificationEmail = async () => {
    try {
      setIsResending(true);
      setError(null);

      const email = localStorage.getItem("userEmail"); // Assuming you store email in localStorage

      if (email) {
        const response = await axios.post(
          "http://localhost:3000/user/resend-verification",
          { email }
        );

        if (response.data.success) {
          setSuccessMessage(
            "Verification email has been resent. Please check your inbox."
          );
        } else {
          setError(response.data.error);
        }
      }
    } catch (error) {
      setError(error.response?.data?.error || "An error occurred");
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
            {!localStorage.getItem("isVerified") && (
              <div className="verificationAlert text-yellow-500 p-3 rounded-lg">
                <p>Please verify your email to fully activate your account.</p>
                <button
                  onClick={resendVerificationEmail}
                  disabled={isResending}
                  className="text-blue-500 hover:underline"
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
