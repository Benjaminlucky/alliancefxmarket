import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUser, resetUser } from "../redux/slices/Userslice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [fullName, setFullName] = useState("User");
  const [investmentDetails, setInvestmentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_BASE_URL = window.location.hostname.includes("localhost")
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
  }, [investmentDetails]);

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

      let planName = "No Plan";
      if (data.planId) {
        planName = await fetchPlanName(data.planId);
      }

      setInvestmentDetails({
        planName,
        amount: data.amountInvested || 0,
        expectedReturns: data.expectedReturns || 0,
        totalPayout: data.totalPayout || 0,
        investmentDate: data.createdAt
          ? new Date(data.createdAt).toLocaleDateString()
          : "N/A",
        maturityDate: data.maturityDate
          ? new Date(data.maturityDate).toLocaleDateString()
          : "N/A",
      });

      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user profile.");
      setLoading(false);
    }
  };

  const fetchPlanName = async (planId) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/plans/${planId}`);
      if (!response.ok) throw new Error("Failed to fetch plan details");

      const planData = await response.json();
      return planData.plan ? planData.plan.planName : "No Plan";
    } catch (error) {
      console.error("Error fetching plan name:", error);
      return "No Plan";
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
        {investmentDetails ? (
          <>
            <div className="investment flex justify-center items-center font-bold text-gray-600 border border-transparent bg-secondary-light rounded-md hover:text-white hover:bg-transparent hover:border-secondary-light duration-200">
              <div className="investment__content py-4 px-5">
                <div className="invested__amount text-2xl">
                  ${investmentDetails.amount.toLocaleString()}
                </div>
                <div className="planDate flex items-center gap-5 font-bold">
                  <p>{investmentDetails.planName}</p>
                  <small className="dateInvested font-bold">
                    {investmentDetails.investmentDate}
                  </small>
                </div>
              </div>
            </div>

            <div className="TotalexpectedROI font-bold text-black bg-secondary-light rounded-md border border-transparent hover:text-white hover:bg-transparent hover:border-secondary-light duration-200">
              <div className="totalroi__content justify-center items-center py-4 px-5">
                <div className="total__payout text-2xl">
                  ${investmentDetails.totalPayout.toLocaleString()}
                </div>
                <div className="percent__date flex gap-5">
                  <div className="percent">
                    {investmentDetails.expectedReturns}%
                  </div>
                  <div className="date font-bold">
                    {investmentDetails.maturityDate}
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
