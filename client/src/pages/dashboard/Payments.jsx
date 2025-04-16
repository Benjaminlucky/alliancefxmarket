import React, { useState, useEffect } from "react";
import Profile from "../../components/profile/Profile";

function Payments() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [investmentDetails, setInvestmentDetails] = useState(null);

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleCopy = (walletAddress, index) => {
    navigator.clipboard.writeText(walletAddress);
    setCopiedIndex(index);
    showMessage("Copied to clipboard!", "success");
    setTimeout(() => setCopiedIndex(null), 2000); // Reset the copied state after 2 seconds
  };

  const fetchWallets = async () => {
    try {
      const API_BASE_URL =
        window.location.origin === "http://localhost:5173"
          ? "http://localhost:3000"
          : "https://alliancefxmarket.onrender.com";

      const response = await fetch(
        `${API_BASE_URL}/wallets/getWalletsInvestors`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const contentType = response.headers.get("content-type");

      // Check if it's actually JSON
      if (!contentType || !contentType.includes("application/json")) {
        const errorText = await response.text(); // read the HTML or text response
        console.error("Unexpected response format:", errorText);
        throw new Error("Server returned non-JSON response.");
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch wallets");
      }

      setWallets(data.wallets);
    } catch (error) {
      showMessage("Failed to fetch wallets", "error");
      console.error("Error fetching wallets:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

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

  return (
    <main className="paymentSection">
      <div className="paymentwrapper w-4/5 mx-auto py-10">
        <div className="paymentContent">
          <div className="profileSection">
            <Profile setInvestmentDetails={setInvestmentDetails} />
          </div>
          {investmentDetails ? (
            <div className="activitySection my-10">
              <div className="activitysectionWrapper">
                <div className="activityContent grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="balance bg-gray-800 rounded-2xl shadow-md hover:shadow-lg transition duration-300 border border-gray-700">
                    <div className="p-6 flex flex-col justify-between h-full">
                      <p className="text-sm text-gray-400 uppercase tracking-widest">
                        Wallet Balance
                      </p>
                      <h3 className="text-white text-4xl font-bold py-4">
                        ${investmentDetails?.totalPayout?.toLocaleString()}
                      </h3>
                      <span className="text-secondary-light font-medium text-base">
                        Available Payout
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center mt-6">No Wallet Balance</p>
          )}
          <div className="bg-yellow-100 border-l-4 my-12 border-yellow-500 text-yellow-800 p-4 rounded-lg text-sm sm:text-base max-w-2xl mx-auto mt-4">
            <p className="font-semibold mb-2">
              ⚠️ No Refunds on Cryptocurrency Payments
            </p>
            <p className="mb-2">
              Please note that{" "}
              <span className="font-bold uppercase">no refunds</span> are
              possible for cryptocurrency payment issues such as:
            </p>
            <ul className="list-disc list-inside mb-2 space-y-1">
              <li>You made a typo</li>
              <li>You did not send to the correct address</li>
              <li>You sent more than one payment</li>
              <li>You sent the wrong cryptocurrency</li>
            </ul>
            <p className="mb-2">
              Orders are valid for a limited amount of time. If you cannot
              initiate or broadcast the payment within the timeframe shown
              above, please start a new order.
            </p>
            <p className="mb-0">
              Cryptocurrency payment speed can vary due to network congestion
              and mining fees. Please plan accordingly.
            </p>
          </div>

          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">Cryptocurrency</th>
                <th className="px-6 py-3">Wallet Address</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((wallet, index) => (
                <tr
                  key={wallet?._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="flex items-center gap-2 px-6 py-4 font-medium text-gray-900">
                    <img
                      src={wallet?.logo}
                      alt={wallet?.name}
                      className="w-6 h-6"
                    />
                    {wallet.name}
                  </td>
                  <td className="px-6 py-4">{wallet.address}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleCopy(wallet?.address, index)}
                      className="px-4 py-1 text-sm bg-secondary-light text-gray-600 font-bold rounded hover:bg-blue-600"
                    >
                      {copiedIndex === index ? "Copied!" : "Copy"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}

export default Payments;
