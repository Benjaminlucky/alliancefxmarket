import React, { useState, useEffect } from "react";

function AdminWallets() {
  // Edit modal states
  const [editModal, setEditModal] = useState(false);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [editWalletAddress, setEditWalletAddress] = useState("");
  const [editWalletIcon, setEditWalletIcon] = useState("");

  // Add modal states
  const [addModal, setAddModal] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [logo, setLogo] = useState("");
  const [adding, setAdding] = useState(false);

  // Wallets state
  const [wallets, setWallets] = useState([]);

  // Delete modal states
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteWalletId, setDeleteWalletId] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(true);

  // Message notification
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");

  const showMessage = (text, type = "success") => {
    setMessage(text);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
    }, 3000);
  };

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address);
    showMessage("Wallet address copied to clipboard!", "success");
  };

  const openEditModal = (wallet) => {
    setSelectedWallet(wallet);
    setEditWalletAddress(wallet.address);
    setEditWalletIcon(wallet.logo);
    setEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      const updated = wallets.map((w) =>
        w._id === selectedWallet._id
          ? { ...w, address: editWalletAddress, logo: editWalletIcon }
          : w
      );
      setWallets(updated);
      setEditModal(false);
      showMessage("Wallet updated successfully!");
    } catch (error) {
      showMessage("Failed to update wallet", "error");
    }
  };

  const openDeleteModal = (walletId) => {
    setDeleteWalletId(walletId);
    setDeleteModal(true);
  };

  const handleDeleteWallet = async () => {
    try {
      const adminToken = localStorage.getItem("adminToken");
      const API_BASE_URL =
        window.location.origin === "http://localhost:5173"
          ? "http://localhost:3000"
          : "https://alliancefxmarket.onrender.com";

      const response = await fetch(
        `${API_BASE_URL}/wallets/deleteWallets/${deleteWalletId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${adminToken}`,
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete wallet");
      }

      // Remove the deleted wallet from local state
      const updated = wallets.filter((wallet) => wallet._id !== deleteWalletId);
      setWallets(updated);
      setDeleteModal(false);
      showMessage("Wallet deleted successfully!");
    } catch (error) {
      console.error("Delete Wallet Error:", error.message);
      showMessage("Failed to delete wallet", "error");
    }
  };

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

  // Convert image file to base64
  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  // Add wallet handler (with base64 image)
  const handleAddWallet = async () => {
    if (!name || !address || !logo) {
      showMessage("All fields are required", "error");
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

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to add wallet");
      }

      setWallets((prev) => [...prev, data.wallet]);
      setAddModal(false);
      setName("");
      setAddress("");
      setLogo("");
      showMessage("Wallet added successfully!");
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
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-3">Cryptocurrency</th>
                <th className="px-6 py-3">Wallet Address</th>
                <th className="px-6 py-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {wallets.map((wallet) => (
                <tr
                  key={wallet?._id}
                  className="bg-white border-b hover:bg-gray-50"
                >
                  <td className="flex items-center gap-2 px-6 py-4 font-medium text-gray-900">
                    <img
                      src={wallet?.logo}
                      alt={wallet.name}
                      className="w-6 h-6"
                    />
                    {wallet.name}
                  </td>
                  <td className="px-6 py-4">{wallet.address}</td>
                  <td className="px-6 py-4 text-center space-x-2">
                    <button
                      onClick={() => handleCopy(wallet.address)}
                      className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => openEditModal(wallet)}
                      className="px-3 py-1 text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(wallet._id)}
                      className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Edit Modal */}
      {editModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-12">Edit Wallet</h3>

            <label className="block text-sm font-medium text-gray-700 mb-1">
              Wallet Address
            </label>
            <input
              type="text"
              placeholder="Wallet Address"
              value={editWalletAddress}
              onChange={(e) => setEditWalletAddress(e.target.value)}
              className="w-full mb-4 px-4 py-2 border rounded text-gray-500"
            />

            <label className="block text-sm font-medium text-gray-700 mt-6">
              Coin Logo (URL)
            </label>
            <input
              type="text"
              placeholder="Icon URL"
              value={editWalletIcon}
              onChange={(e) => setEditWalletIcon(e.target.value)}
              className="w-full mb-12 p-2 border rounded text-gray-500"
            />

            <div className="flex justify-between">
              <button
                onClick={() => setEditModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-green-500 px-4 py-2 text-white rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4 text-red-600">
              Confirm Deletion
            </h3>
            <p className="mb-4">Are you sure you want to delete this wallet?</p>
            <div className="flex justify-between">
              <button
                onClick={() => setDeleteModal(false)}
                className="bg-gray-300 px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteWallet}
                className="bg-red-500 px-4 py-2 text-white rounded"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
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
              className="w-full mb-4 p-2 border rounded text-gray-500"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              placeholder="Wallet Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mb-4 p-2 border rounded text-gray-500"
            />

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Coin Logo (Image)
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                const file = e.target.files[0];
                if (file) {
                  const base64 = await convertToBase64(file);
                  setLogo(base64);
                }
              }}
              className="w-full mb-6 p-2 border rounded text-gray-500"
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
