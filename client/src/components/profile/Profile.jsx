import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetUser } from "../redux/slices/Userslice";
import { useNavigate } from "react-router-dom";

const Profile = ({ setInvestmentDetails }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [fullName, setFullName] = useState("User");
  const [localInvestmentDetails, setLocalInvestmentDetails] = useState(null);

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL =
    window.location.origin === "http://localhost:5173"
      ? "http://localhost:3000"
      : "https://alliancefxmarket.onrender.com";
  useEffect(() => {
    const storedAuthToken = localStorage.getItem("authToken");

    if (storedAuthToken) {
      fetchUser(storedAuthToken);
    } else {
      setError("Authentication token missing.");
      setLoading(false);
    }
  }, []); // ✅ Removed `investmentDetails` to prevent infinite loops

  const fetchUser = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      setFullName(data.fullName || "User");
      setProfileImage(data.profileImage || "/default-avatar.png");
      setIsVerified(data.isVerified || false);

      // ✅ Investment details now come directly from the backend
      if (setInvestmentDetails) {
        setInvestmentDetails(data.investmentDetails || null);
      }
      setLocalInvestmentDetails(data.investmentDetails || null);
      setLoading(false);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user profile.");
      setLoading(false);
    }
  };

  const handleSignOut = () => {
    dispatch(resetUser());
    localStorage.clear();
    navigate("/signin");
  };

  return (
    <div className="main__container grid grid-cols-1 md:grid-cols-2">
      <div className="left">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <div className="profileSection flex items-center gap-5 h-10 mb-10 text-white">
            <div className="relative">
              <img
                src={profileImage}
                alt="Profile Avatar"
                className="w-20 h-20 rounded-full object-cover border-2 border-gray-500"
              />
            </div>
            <div className="mt-4 text-left">
              <h2 className="font-bold text-2xl">{`Hello, ${fullName}`}</h2>
              <p className="text-gray-400">
                Track your investment journey here
              </p>
              <p>Status: {isVerified ? "Verified" : "Not Verified"}</p>
            </div>
            <button
              onClick={handleSignOut}
              className="mt-8 bg-red-600 hover:bg-red-700 text-white px-6 py-2 ml-10 rounded-md transition"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      <div className="right grid gap-5 grid-cols-1 md:grid-cols-2">
        {localInvestmentDetails ? (
          <>
            <div className="investment flex justify-center items-center font-bold text-gray-600 border border-transparent bg-secondary-light rounded-md hover:text-white hover:bg-transparent hover:border-secondary-light duration-200">
              <div className="investment__content py-4 px-5">
                <div className="invested__amount text-2xl">
                  ${localInvestmentDetails?.amountInvested?.toLocaleString()}
                </div>
                <div className="planDate flex items-center gap-5 font-bold">
                  <p>{localInvestmentDetails?.planName}</p>
                  <small className="dateInvested font-bold">
                    {localInvestmentDetails?.investmentDate
                      ? new Date(
                          localInvestmentDetails?.investmentDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </small>
                </div>
              </div>
            </div>

            <div className="TotalexpectedROI font-bold text-black bg-secondary-light rounded-md border border-transparent hover:text-white hover:bg-transparent hover:border-secondary-light duration-200">
              <div className="totalroi__content justify-center items-center py-4 px-5">
                <div className="total__payout text-2xl">
                  ${localInvestmentDetails.totalPayout.toLocaleString()}
                </div>
                <div className="percent__date flex gap-5">
                  <div className="percent">
                    {localInvestmentDetails.returnPercentage}%
                  </div>
                  <div className="date font-bold">
                    {localInvestmentDetails.maturityDate
                      ? new Date(
                          localInvestmentDetails.maturityDate
                        ).toLocaleDateString()
                      : "N/A"}
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <p className="text-gray-400 col-span-2 text-center">
            No active investments
          </p>
        )}
      </div>
    </div>
  );
};

export default Profile;
