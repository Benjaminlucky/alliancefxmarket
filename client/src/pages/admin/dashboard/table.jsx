import React, { useState, useEffect } from "react";

function AdminWallets() {
  const [wallets, setWallets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false); // 👈 for loading state

  const fetchWallets = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const API_BASE_URL =
        window.location.origin === "http://localhost:5173"
          ? "http://localhost:3000"
          : "https://alliancefxmarket.onrender.com";

      const response = await fetch(`${API_BASE_URL}/wallets/getWallets`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
      });

      if (!response.ok) throw new Error("Failed to fetch wallets");

      const data = await response.json();
      setWallets(data.wallets);
    } catch (error) {
      showMessage("Failed to fetch wallets", "error");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWallets();
  }, []);

  const [addModal, setAddModal] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [logo, setLogo] = useState("");

  const [editModal, setEditModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [editWalletAddress, setEditWalletAddress] = useState("");
  const [editWalletIcon, setEditWalletIcon] = useState("");

  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteWalletId, setDeleteWalletId] = useState(null);

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleAddWallet = async () => {
    if (!name || !address || !logo) {
      showMessage("Please fill all fields", "error");
      return;
    }

    try {
      setAdding(true);
      const adminToken = localStorage.getItem("adminToken");
      const API_BASE_URL =
        window.location.origin === "http://localhost:5173"
          ? "http://localhost:3000"
          : "https://alliancefxmarket.onrender.com";

      const response = await fetch(`${API_BASE_URL}/wallets/addWallets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ name, address, logo }),
      });

      if (!response.ok) throw new Error("Failed to add wallet");

      await response.json(); // no need to keep the return, we're refreshing

      setAddModal(false);
      setName("");
      setAddress("");
      setLogo("");
      showMessage("Wallet added successfully!");

      // 🧠 Refetch updated wallets list
      fetchWallets();
    } catch (error) {
      console.error(error);
      showMessage("Failed to add wallet", "error");
    } finally {
      setAdding(false);
    }
  };

  return (
    <main className="p-6">
      <h2 className="text-3xl font-bold text-gray-700 mb-6">Manage Wallets</h2>

      {message && (
        <div
          className={`mb-4 p-3 rounded text-white transition-all duration-300 ${
            messageType === "success" ? "bg-green-500" : "bg-red-500"
          }`}
        >
          {message}
        </div>
      )}

      <div className="w-full mb-6">
        <button
          onClick={() => setAddModal(true)}
          className="bg-primary px-4 py-2 text-white rounded hover:bg-primary-dark"
        >
          + Add Wallet
        </button>
      </div>

      {loading ? (
        <p>Loading wallets...</p>
      ) : (
        <div className="overflow-x-auto">{/* Table remains unchanged */}</div>
      )}

      {/* Add Modal */}
      {addModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-6 py-4">Add New Wallet</h3>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>
            <input
              type="text"
              placeholder="e.g. Bitcoin"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full mb-4 p-2 border rounded text-gray-500 ring-2 ring-gray-300 focus:ring-2 focus:ring-secondary-light"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Wallet Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mb-4 p-2 border rounded text-gray-500 ring-2 ring-gray-300 focus:ring-2 focus:ring-secondary-light"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coin Logo (URL)
            </label>
            <input
              type="text"
              placeholder="Icon URL"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              className="w-full mb-6 p-2 border rounded text-gray-500 ring-2 ring-gray-300 focus:ring-2 focus:ring-secondary-light"
            />

            <div className="flex justify-between py-4">
              <button
                onClick={() => setAddModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWallet}
                disabled={adding}
                className={`${
                  adding
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-secondary-light"
                } px-4 py-2 text-gray-500 font-bold rounded flex items-center gap-2`}
              >
                {adding ? (
                  <>
                    <svg
                      className="animate-spin h-4 w-4 text-gray-500"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                      ></path>
                    </svg>
                    Adding...
                  </>
                ) : (
                  "Add Wallet"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminWallets;
