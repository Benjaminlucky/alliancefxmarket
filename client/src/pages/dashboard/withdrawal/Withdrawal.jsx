import React, { useState, useEffect } from "react";
import Profile from "../../../components/profile/profile";
import { BiSolidDownload } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";

function Withdrawal() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [profileImage, setProfileImage] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [fullName, setFullName] = useState("User");
  const [investmentDetails, setInvestmentDetails] = useState(null);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [walletAddress, setWalletAddress] = useState("");

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
      setInvestmentDetails(data.investmentDetails || null);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching user data:", error);
      setError("Error fetching user profile.");
      setLoading(false);
    }
  };

  const handleWithdraw = async () => {
    try {
      // Retrieve the authToken and email from localStorage
      const authToken = localStorage.getItem("authToken");
      const userEmail = localStorage.getItem("email"); // Email from localStorage

      // Check if the token and email exist
      if (!authToken || !userEmail) {
        alert("Authorization failed. Please log in again.");
        return;
      }

      // Make the POST request with the email included
      const response = await fetch(`${API_BASE_URL}/user/withdraw`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`, // Use the stored auth token
        },
        body: JSON.stringify({
          amount: withdrawAmount,
          walletAddress,
          email: userEmail, // Include the email in the request body
        }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to submit withdrawal request. Status: ${response.status}`
        );
      }

      alert("Withdrawal request submitted successfully.");
      setShowModal(false);
    } catch (error) {
      console.error("Withdrawal error:", error);
      alert("Failed to submit withdrawal request.");
    }
  };

  return (
    <main className="mainsection">
      <div className="mainWrapper mx-auto w-4/5 py-10">
        <div className="mainContent">
          <div className="profileSection">
            <div className="profileWrapper">
              <div className="profileContent">
                <Profile />
              </div>
            </div>
          </div>
          <div className="withdrawalSection">
            {investmentDetails ? (
              <div className="withdrawalWrapper py-20">
                <div className="withdrawalContent text-white">
                  <div className="withdraw">
                    <p className="text-secondary-light">Current Balance</p>
                    <h3 className="balance text-5xl font-bold">
                      ${investmentDetails.totalPayout.toLocaleString()}
                    </h3>
                    <div className="buttons flex flex-col md:flex-row py-5 gap-5">
                      <div
                        className="withdrawButton flex bg-white gap-3 justify-center items-center py-2 px-5 rounded-full cursor-pointer hover:bg-secondary-light"
                        onClick={() => setShowModal(true)}
                      >
                        <BiSolidDownload className="bg-black h-10 w-10 rounded-full p-2 " />
                        <p className="text-black font-semibold text-xl">
                          Withdrawal
                        </p>
                      </div>

                      {/* <div className="withdrawButton flex bg-white gap-3 justify-center items-center py-2 px-5 rounded-full cursor-pointer hover:bg-secondary-light">
                        <BiSolidDownload className="bg-black h-10 w-10 rounded-full p-2  rotate-180" />
                        <p className="text-black font-semibold text-xl">
                          Invest
                        </p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="errorSection">
                <p className="text-red-500">No investment details available.</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal bg-gray-800 bg-opacity-75 fixed inset-0 flex items-center justify-center">
          <div className="modalContent bg-white p-5 rounded-md shadow-lg">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black"
              onClick={() => setShowModal(false)}
            >
              <AiOutlineClose className="w-6 h-6 text-gray-300 font-bold" />
            </button>
            <h2 className="text-xl font-bold py-7">Withdrawal Request</h2>
            <label>Amount</label>
            <div className="relative my-3 mb-8">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-500 font-bold">
                $
              </span>
              <input
                type="number"
                value={withdrawAmount}
                onChange={(e) => setWithdrawAmount(e.target.value)}
                className="pl-8 border p-2 w-full border-gray-300 rounded-md text-gray-500 font-bold ring-2 ring-gray-300 focus:ring-2 focus:ring-secondary-light"
              />
            </div>

            <label className="">Wallet Address</label>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              className="border p-2 w-full border-gray-300 rounded-md font-bold text-gray-500 ring-2 ring-gray-300 focus:ring-2 focus:ring-secondary-light my-3 mb-8"
            />
            <p className="text-sm text-gray-600 mt-2">
              It may take up to 48 hours for your wallet to be credited.
            </p>
            <button
              className="bg-secondary text-white px-4 py-2 rounded mt-8 hover:bg-secondary-light transition duration-200 mb-5 hover:text-gray-500 font-bold"
              onClick={handleWithdraw}
            >
              Submit Request
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

export default Withdrawal;
