import React, { useEffect, useState } from "react";
import Adminprofile from "./Adminprofile";

function Admininvestments() {
  const [openModal, setOpenModal] = useState(false);
  const [openFeatureModal, setOpenFeatureModal] = useState(false);
  const [formData, setFormData] = useState({
    planName: "",
    minimumDeposit: "",
    minimumReturns: "",
    minimumDuration: "",
  });
  const [selectedInvestment, setSelectedInvestment] = useState(null);
  const [investments, setInvestments] = useState([]);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [feature, setFeature] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [investmentToDelete, setInvestmentToDelete] = useState(null);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [newFeature, setNewFeature] = useState("");

  // Open delete confirmation modal
  const handleOpenDeleteModal = (investment) => {
    setInvestmentToDelete(investment);
    setOpenDeleteModal(true);
  };

  // Close delete modal
  const handleCloseDeleteModal = () => {
    setInvestmentToDelete(null);
    setOpenDeleteModal(false);
  };

  const handleModal = () => {
    setOpenModal(true);
  };

  const handleFeatureModal = () => {
    setSelectedInvestment(null); //Reset Selection
    setFeature("");
    setOpenFeatureModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setFormData({
      planName: "",
      minimumDeposit: "",
      minimumReturns: "",
      minimumDuration: "",
    });
  };

  const handleAddFeature = () => {
    if (newFeature.trim() !== "") {
      setFormData((prevData) => ({
        ...prevData,
        features: [...prevData.features, newFeature.trim()],
      }));
      setNewFeature(""); // Clear input after adding
    }
  };

  const handleRemoveFeature = (index) => {
    setFormData((prevData) => ({
      ...prevData,
      features: prevData.features.filter((_, i) => i !== index),
    }));
  };

  const handleEditInvestment = (investment) => {
    setSelectedInvestment(investment);
    setFormData({
      planName: investment.planName || "",
      minimumDeposit: investment.minimumDeposit || 0,
      minimumReturns: investment.minimumReturns || 0,
      minimumDuration: investment.minimumDuration || 0,
      features: investment.features || [], // Ensure features is handled as an array
    });
    setOpenEditModal(true);
  };

  const API_BASE_URL =
    window.location.origin === "http://localhost:5173"
      ? "http://localhost:3000"
      : "https://alliancefxmarket.onrender.com";

  // Fetch investments
  useEffect(() => {
    const fetchInvestments = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/admin/investments`);
        if (!response.ok) {
          throw new Error("Failed to fetch investments");
        }

        const data = await response.json();
        console.log("Fetched investments:", data); // Debug
        if (data && Array.isArray(data.plans)) {
          setInvestments(data.plans);
        } else {
          console.error("Unexpected response format:", data);
          setInvestments([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching investments:", error);
        setInvestments([]); // Fallback to empty array
      }
    };

    fetchInvestments();
  }, [API_BASE_URL]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification({ message: "", type: "" }), 3000);
  };

  const handleFeatureChange = (e) => {
    setFeature(e.target.value);
  };

  const handleCloseFeatureModal = () => {
    setOpenFeatureModal(false);
    setFeature("");
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const API_BASE_URL =
      window.location.origin === "http://localhost:5173"
        ? "http://localhost:3000"
        : "https://alliancefxmarket.onrender.com";

    try {
      const response = await fetch(`${API_BASE_URL}/admin/investments/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        showNotification("Investment Plan Added Successfully!", "success");
        handleCloseModal();
      } else {
        showNotification("Failed to add investment plan.", "error");
      }
    } catch (error) {
      console.error("Error adding investment plan:", error);
      showNotification("An error occurred. Please try again.", "error");
    }
  };

  // const handleAddFeature = async () => {
  //   if (!selectedInvestment || !feature) {
  //     showNotification(
  //       "Please select an investment and enter a feature.",
  //       "error"
  //     );
  //     return;
  //   }

  //   try {
  //     const response = await fetch(
  //       `${API_BASE_URL}/admin/investments/${selectedInvestment._id}/features`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ feature }),
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       showNotification("Feature added successfully!", "success");

  //       // Update the state with the new feature added
  //       setInvestments((prevInvestments) =>
  //         prevInvestments.map((inv) =>
  //           inv._id === selectedInvestment._id
  //             ? { ...inv, features: [...inv.features, feature] }
  //             : inv
  //         )
  //       );

  //       handleCloseFeatureModal();
  //     } else {
  //       showNotification("Failed to add feature.", "error");
  //     }
  //   } catch (error) {
  //     console.error("Error adding feature:", error);
  //     showNotification("An error occurred. Please try again.", "error");
  //   }
  // };

  // Handle delete investment
  const handleDeleteInvestment = async () => {
    if (!investmentToDelete) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/investments/${investmentToDelete._id}`,
        { method: "DELETE" }
      );

      if (response.ok) {
        showNotification("Investment deleted successfully!", "success");
        setInvestments(
          investments.filter((inv) => inv._id !== investmentToDelete._id)
        );
        handleCloseDeleteModal();
      } else {
        showNotification("Failed to delete investment.", "error");
      }
    } catch (error) {
      console.error("Error deleting investment:", error);
      showNotification("An error occurred. Please try again.", "error");
    }
  };

  const handleUpdateInvestment = async (e) => {
    e.preventDefault();

    if (!selectedInvestment) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/investments/${selectedInvestment._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        showNotification("Investment updated successfully!", "success");

        setInvestments((prevInvestments) =>
          prevInvestments.map((inv) =>
            inv._id === selectedInvestment._id ? { ...inv, ...formData } : inv
          )
        );

        setOpenEditModal(false);
      } else {
        showNotification("Failed to update investment.", "error");
      }
    } catch (error) {
      console.error("Error updating investment:", error);
      showNotification("An error occurred. Please try again.", "error");
    }
  };

  return (
    <div className="investment__section w-full">
      <div className="investment__wrapper w-11/12 mx-auto">
        {/* Notification */}
        {notification.message && (
          <div
            className={`notification fixed top-4 left-1/2 transform -translate-x-1/2 px-6 py-3 rounded-md text-center text-white font-bold shadow-md ${
              notification.type === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {notification.message}
          </div>
        )}

        <div className="investment__content">
          <div className="profile">
            <Adminprofile />
          </div>
          <div className="manage__plansTable mt-8">
            <div className="managePlans__btns py-6 flex flex-col md:flex-row justify-between items-center">
              <button
                className="plan bg-secondary-light px-5 py-3 font-bold rounded-sm hover:bg-secondary hover:text-white duration-200"
                onClick={handleModal}
              >
                Add Investment Plan
              </button>
              <button
                className="features bg-accent-light px-5 py-3 text-gray-300 font-bold rounded-sm hover:bg-accent-dark hover:text-gray-500 duration-200 mt-4 md:mt-0"
                onClick={handleFeatureModal}
              >
                Add Investment Features
              </button>
            </div>
            <div className="manageTitle text-xl md:text-2xl font-bold text-gray-600 mb-8 text-center md:text-left">
              Manage Investments
            </div>
            {/* Investment Plans Table */}
            <div className="plansTable__content">
              <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                  <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                      <th className="px-6 py-3">Investment Plans</th>
                      <th className="px-6 py-3">Minimum Deposit</th>
                      <th className="px-6 py-3">Minimum Returns</th>
                      <th className="px-6 py-3">Minimum Duration</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {investments.length > 0 ? (
                      investments.map((investment) => (
                        <tr
                          key={investment._id}
                          className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                        >
                          <td className="px-6 py-4 font-medium text-gray-900 dark:text-white">
                            {investment.planName}
                          </td>
                          <td className="px-6 py-4">
                            ${investment.minimumDeposit}
                          </td>
                          <td className="px-6 py-4">
                            ${investment.minimumReturns}
                          </td>
                          <td className="px-6 py-4">
                            {investment.minimumDuration} months
                          </td>
                          <td className="flex gap-3 items-center">
                            <button
                              className="bg-secondary-light px-5 py-2 rounded-sm font-bold hover:bg-secondary hover:text-white duration-200"
                              onClick={() => handleEditInvestment(investment)}
                            >
                              Edit
                            </button>
                            <button
                              className="bg-red-100 px-5 py-2 rounded-sm font-bold text-red-500 hover:bg-red-200"
                              onClick={() => handleOpenDeleteModal(investment)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="4" className="text-center py-4">
                          No investments found.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {openModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="modal__content mx-auto bg-white py-12 px-8 w-full max-w-lg rounded-md shadow-md">
              <div className="modal__title bg-secondary-light py-3 px-5 uppercase text-lg font-bold text-gray-700 text-center">
                <h3>Add Investment Plan</h3>
              </div>
              <form onSubmit={handleFormSubmit}>
                <div className="form__content py-8">
                  <div className="plan__name flex flex-col gap-2 mb-6">
                    <label htmlFor="planName">Plan</label>
                    <input
                      type="text"
                      name="planName"
                      value={formData.planName}
                      onChange={handleInputChange}
                      placeholder="Enter Plan Name"
                      className="bg-gray-100 focus:ring-0 rounded-md text-gray-600 font-bold py-3"
                      required
                    />
                  </div>
                  <div className="plan__deposit flex flex-col gap-2 mb-6">
                    <label htmlFor="minimumDeposit">Minimum Deposit $</label>
                    <input
                      type="number"
                      name="minimumDeposit"
                      value={formData.minimumDeposit}
                      onChange={handleInputChange}
                      placeholder="500"
                      className="bg-gray-100 focus:ring-0 rounded-md text-gray-600 font-bold py-3"
                      required
                    />
                  </div>
                  <div className="minimum__duration flex flex-col gap-2 mb-6">
                    <label htmlFor="minimumDuration">Minimum Duration</label>
                    <input
                      type="text"
                      name="minimumDuration"
                      value={formData.minimumDuration}
                      onChange={handleInputChange}
                      placeholder="6 months"
                      className="bg-gray-100 focus:ring-0 rounded-md text-gray-600 font-bold py-3"
                      required
                    />
                  </div>
                  <div className="minimum__returns flex flex-col gap-2 mb-6">
                    <label htmlFor="minimumReturns">Minimum Returns</label>
                    <input
                      type="text"
                      name="minimumReturns"
                      value={formData.minimumReturns}
                      onChange={handleInputChange}
                      placeholder="5%"
                      className="bg-gray-100 focus:ring-0 rounded-md text-gray-600 font-bold py-3"
                      required
                    />
                  </div>
                  <div className="investmentBtns flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={handleCloseModal}
                      className="bg-red-100 w-[50%] text-red-600 px-5 py-3 rounded-sm font-bold hover:bg-red-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-secondary-light w-[50%] text-gray-700 px-5 py-3 rounded-sm font-bold hover:bg-secondary-dark hover:text-white duration-200"
                    >
                      Add Investment Plan
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Add Feature Modal */}
        {openFeatureModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="modal__content mx-auto bg-white py-12 px-8 w-full max-w-lg rounded-md shadow-md">
              <div className="modal__title bg-secondary-light py-3 px-5 uppercase text-lg font-bold text-gray-700 text-center">
                <h3>Add Features</h3>
              </div>
              <div className="form__content py-8">
                <div className="select__investment mb-6">
                  <label htmlFor="investment" className="block mb-2">
                    Select Investment:
                  </label>
                  <select
                    id="investment"
                    value={selectedInvestment?._id || ""}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      const investment = investments.find(
                        (inv) => inv._id === selectedId
                      );
                      setSelectedInvestment(investment || null);
                    }}
                    className="w-full bg-gray-100 px-4 py-2 rounded-md"
                  >
                    <option value="" disabled>
                      Select an investment
                    </option>
                    {investments.map((investment) => (
                      <option key={investment._id} value={investment._id}>
                        {investment.planName}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="add__feature mb-6">
                  <label htmlFor="feature" className="block mb-2">
                    Feature:
                  </label>
                  <input
                    type="text"
                    id="feature"
                    value={feature}
                    onChange={handleFeatureChange}
                    className="w-full bg-gray-100 px-4 py-2 rounded-md"
                    placeholder="Enter feature"
                  />
                </div>
                <div className="investmentBtns flex justify-between gap-4">
                  <button
                    type="button"
                    onClick={handleCloseFeatureModal}
                    className="bg-red-100 w-[50%] text-red-600 px-5 py-3 rounded-sm font-bold hover:bg-red-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="bg-secondary-light w-[50%] text-gray-700 px-5 py-3 rounded-sm font-bold hover:bg-secondary-dark hover:text-white duration-200"
                  >
                    Add Feature
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {openDeleteModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="bg-white py-8 px-6 w-full max-w-md rounded-md shadow-md">
              <h3 className="text-lg font-bold text-center">
                Confirm Deletion
              </h3>
              <p className="text-center my-4">
                Are you sure you want to delete the investment plan{" "}
                <span className="font-bold text-red-500">
                  {investmentToDelete?.planName}
                </span>
                ?
              </p>
              <div className="flex justify-between gap-4">
                <button
                  onClick={handleCloseDeleteModal}
                  className="bg-gray-200 w-[50%] text-gray-700 px-4 py-2 rounded-sm font-bold hover:bg-gray-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteInvestment}
                  className="bg-red-500 w-[50%] text-white px-4 py-2 rounded-sm font-bold hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

        {openEditModal && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center">
            <div className="modal__content mx-auto bg-white py-12 px-8 w-full max-w-lg rounded-md shadow-md">
              <div className="modal__title bg-secondary-light py-3 px-5 uppercase text-lg font-bold text-gray-700 text-center">
                <h3>Edit Investment Plan</h3>
              </div>
              <form onSubmit={handleUpdateInvestment}>
                <div className="form__content py-8">
                  <div className="plan__name flex flex-col gap-2 mb-6">
                    <label htmlFor="planName">Plan</label>
                    <input
                      type="text"
                      name="planName"
                      value={formData.planName}
                      onChange={handleInputChange}
                      className="bg-gray-100 focus:ring-0 rounded-md text-gray-600 font-bold py-3"
                      required
                    />
                  </div>
                  <div className="plan__deposit flex flex-col gap-2 mb-6">
                    <label htmlFor="minimumDeposit">Minimum Deposit ($)</label>
                    <input
                      type="number"
                      name="minimumDeposit"
                      value={formData.minimumDeposit}
                      onChange={handleInputChange}
                      className="bg-gray-100 focus:ring-0 rounded-md text-gray-600 font-bold py-3"
                      required
                    />
                  </div>
                  <div className="minimum__returns flex flex-col gap-2 mb-6">
                    <label htmlFor="minimumReturns">Minimum Returns (%)</label>
                    <input
                      type="number"
                      name="minimumReturns"
                      value={formData.minimumReturns}
                      onChange={handleInputChange}
                      className="bg-gray-100 focus:ring-0 rounded-md text-gray-600 font-bold py-3"
                      required
                    />
                  </div>
                  <div className="minimum__duration flex flex-col gap-2 mb-6">
                    <label htmlFor="minimumDuration">
                      Minimum Duration (Months)
                    </label>
                    <input
                      type="number"
                      name="minimumDuration"
                      value={formData.minimumDuration}
                      onChange={handleInputChange}
                      className="bg-gray-100 focus:ring-0 rounded-md text-gray-600 font-bold py-3"
                      required
                    />
                  </div>

                  <div className="features flex flex-col gap-2 mb-6">
                    <label htmlFor="features">Features</label>
                    <div className="flex gap-2 flex-wrap">
                      {formData.features.map((feature, index) => (
                        <div
                          key={index}
                          className="bg-gray-200 px-3 py-1 rounded flex items-center"
                        >
                          <span>{feature}</span>
                          <button
                            type="button"
                            className="ml-2 text-red-500"
                            onClick={() => handleRemoveFeature(index)}
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      className="bg-gray-100 focus:ring-0 rounded-md text-gray-600 font-bold py-3 mt-2"
                      placeholder="Enter feature..."
                    />
                    <button
                      type="button"
                      onClick={handleAddFeature}
                      className="bg-secondary-light text-gray-900 font-bold px-4 py-2 rounded-md mt-2"
                    >
                      Add Feature
                    </button>
                  </div>

                  {/* Action Buttons */}
                  <div className="investmentBtns flex justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setOpenEditModal(false)}
                      className="bg-red-100 w-1/3 text-red-600 px-5 py-3 rounded-sm font-bold hover:bg-red-300"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="bg-secondary-light w-1/3 text-gray-700 px-5 py-3 rounded-sm font-bold hover:bg-secondary-dark hover:text-white duration-200"
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      onClick={handleDeleteInvestment}
                      className="bg-red-600 w-1/3 text-white px-5 py-3 rounded-sm font-bold hover:bg-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admininvestments;
