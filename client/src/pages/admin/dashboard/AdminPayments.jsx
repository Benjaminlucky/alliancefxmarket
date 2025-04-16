import React, { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";

function AdminPayments() {
  const [investors, setInvestors] = useState([]);
  const [investmentPlans, setInvestmentPlans] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 10;
  const [investorModal, setInvestorModal] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("");
  const [manualPlanName, setManualPlanName] = useState("");
  const [manualAmount, setManualAmount] = useState(0);
  const [durationDays, setDurationDays] = useState(0); // Changed from months to days
  const [roiPercentage, setRoiPercentage] = useState(0); // New ROI input

  const API_BASE_URL =
    window.location.origin === "http://localhost:5173"
      ? "http://localhost:3000"
      : "https://alliancefxmarket.onrender.com";

  useEffect(() => {
    const fetchData = async () => {
      const API_BASE_URL =
        window.location.origin === "http://localhost:5173"
          ? "http://localhost:3000"
          : "https://alliancefxmarket.onrender.com";

      try {
        setLoading(true);

        const [investorsRes, plansRes] = await Promise.all([
          fetch(
            `${API_BASE_URL}/user/fetchUsers?page=${currentPage}&limit=${usersPerPage}`
          ),
          fetch(`${API_BASE_URL}/admin/investments/`),
        ]);

        if (!investorsRes.ok || !plansRes.ok)
          throw new Error("Failed to fetch data");

        const investorsData = await investorsRes.json();
        const plansData = await plansRes.json();

        setInvestors(investorsData.users || []);
        setInvestmentPlans(plansData.plans || []);
        setTotalPages(investorsData.totalPages || 1);
      } catch (error) {
        setMessage("Error: Investor ID is missing");
        setMessageType("error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);
  const showMessage = (text, type) => {
    setMessage({ text, type });
    setTimeout(() => setMessage({ text: "", type: "" }), 3000);
  };

  const handleInvestorModal = (investor) => {
    setSelectedInvestor(investor);
    setInvestorModal(true);
  };

  // Handle activation
  const handleActivateInvestor = async () => {
    if (!selectedInvestor?._id) {
      console.error("Investor ID is missing");
      return alert("Error: Investor ID is missing");
    }

    let requestBody = {
      userId: selectedInvestor._id,
    };

    if (selectedPlan && selectedPlan !== "manual") {
      const selectedPlanData = investmentPlans.find(
        (plan) => plan._id === selectedPlan
      );
      if (!selectedPlanData) {
        setMessage("Error: Selected plan not found.");
        setMessageType("error");
        return;
      }

      requestBody.planId = selectedPlan;
      requestBody.planName = selectedPlanData.planName;
      requestBody.amountInvested = selectedPlanData.minimumDeposit;
      requestBody.durationDays = selectedPlanData.minimumDuration;
      requestBody.roiPercentage = selectedPlanData.minimumReturns;
    } else if (selectedPlan === "manual" && manualPlanName && manualAmount) {
      requestBody.planName = manualPlanName;
      requestBody.amountInvested = manualAmount;
      requestBody.durationDays = parseInt(durationDays, 10);
      requestBody.roiPercentage = parseFloat(roiPercentage);
    }

    try {
      console.log("Request Payload:", JSON.stringify(requestBody, null, 2));

      const response = await fetch(
        `${API_BASE_URL}/admin/investments/activate`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Failed to activate investor");

      setMessage("Investor activated successfully");
      setMessageType("success");
      setInvestorModal(false);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
      setMessageType("error");
    }
  };

  const handlePlanSelection = (planId) => {
    setSelectedPlan(planId);
    if (planId !== "manual") {
      const selectedPlanData = investmentPlans.find(
        (plan) => plan._id === planId
      );
      if (selectedPlanData) {
        setManualPlanName(selectedPlanData.planName);
        setManualAmount(selectedPlanData.minimumDeposit);
        setDurationDays(selectedPlanData.minimumDuration);
        setRoiPercentage(selectedPlanData.returnPercentage);
      }
    } else {
      setManualPlanName("");
      setManualAmount(0);
      setDurationDays(0);
      setRoiPercentage(0);
    }
  };

  return (
    <main>
      <div className="w-full p-6">
        <h3 className="text-3xl font-bold text-gray-500">Manage Deposits</h3>
        {message && (
          <div
            className={`mt-4 p-3 rounded-md text-white transition-opacity duration-500 ${
              messageType === "success" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <div className="relative shadow-md sm:rounded-lg overflow-visible mt-6">
          {loading ? (
            <p className="text-center text-gray-500">Loading...</p>
          ) : (
            <>
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th className="px-6 py-3">Investor Name</th>
                    <th className="px-6 py-3">Investment Plan</th>
                    <th className="px-6 py-3">Investment Amount</th>
                    <th className="px-6 py-3">Investment ROI</th>
                    <th className="px-6 py-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {investors.length > 0 ? (
                    investors.map((investor) => (
                      <tr
                        key={investor._id}
                        className="bg-white border-b hover:bg-gray-50"
                      >
                        <td className="px-6 py-4 font-medium text-gray-900">
                          {investor.fullName || "N/A"}
                        </td>
                        <td className="px-6 py-4">
                          {investor.planName ||
                            investmentPlans?.find(
                              (plan) => plan?._id === investor?.planId
                            )?.planName ||
                            "N/A"}
                        </td>

                        <td className="px-6 py-4">
                          ${investor.amountInvested || "0.00"}
                        </td>
                        <td className="px-6 py-4">
                          ${investor.expectedReturns || 0}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button
                            onClick={() => handleInvestorModal(investor)}
                            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                          >
                            Pay Investor
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-4 text-gray-500"
                      >
                        No investors found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* ✅ Pagination Controls */}
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === 1
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Previous
                </button>
                <span className="text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() =>
                    setCurrentPage((prev) =>
                      prev < totalPages ? prev + 1 : prev
                    )
                  }
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded-md ${
                    currentPage === totalPages
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-blue-500 text-white hover:bg-blue-600"
                  }`}
                >
                  Next
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {investorModal && selectedInvestor && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-900 bg-opacity-50">
          <div className="bg-white shadow-lg rounded-md p-6 w-96">
            <h3 className="text-xl font-bold text-gray-700 text-center">
              Activate Investor
            </h3>
            <p className="text-center text-secondary-dark font-bold mt-2 py-2">
              {selectedInvestor.fullName || "Unknown Investor"}
            </p>

            {/* Radio Button to Choose Mode */}
            <div className="flex justify-between mt-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="entryMode"
                  value="auto"
                  checked={selectedPlan !== "manual"}
                  onChange={() => setSelectedPlan("")}
                  className="h-5 w-5 text-secondary-dark border-gray-300 ring-secondary-dark ring-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <span className="text-gray-700 font-medium">Choose Plan</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="entryMode"
                  value="manual"
                  checked={selectedPlan === "manual"}
                  onChange={() => setSelectedPlan("manual")}
                  className="h-5 w-5 text-secondary-dark border-gray-300 ring-2 ring-secondary-dark focus:ring-2 focus:ring-secondary-dark  focus:outline-none"
                />
                <span className="text-gray-700 font-medium">
                  Enter Manually
                </span>
              </label>
            </div>

            {/* If Selecting a Plan */}
            <select
              className="w-full mt-4 p-2 border rounded-md"
              value={selectedPlan}
              onChange={(e) => handlePlanSelection(e.target.value)}
            >
              <option value="">Select Investment Plan</option>
              {investmentPlans.map((plan) => (
                <option key={plan._id} value={plan._id}>
                  {plan.planName}
                </option>
              ))}
              <option value="manual">Enter Manually</option>
            </select>

            {/* If Entering Manually */}
            {selectedPlan === "manual" && (
              <div className="mt-8">
                <label className="block text-gray-700 text-sm font-medium">
                  Investment Plan Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Investment Plan Name"
                  className="w-full p-2 border border-gray-400 ring-2 ring-gray-200 mt-1 rounded-sm focus:ring-2 focus:ring-secondary-dark focus:border-blue-500"
                  value={manualPlanName}
                  onChange={(e) => setManualPlanName(e.target.value)}
                />

                <label className="block text-gray-700 text-sm font-medium mt-5">
                  Amount Received
                </label>
                <input
                  type="number"
                  placeholder="Enter Amount Received"
                  className="w-full p-2 text-gray-400 border border-gray-400 ring-2 ring-gray-200 mt-1 rounded-sm focus:ring-2 focus:ring-secondary-dark focus:border-blue-500"
                  value={manualAmount}
                  onChange={(e) => setManualAmount(e.target.value)}
                />

                <label className="block text-gray-700 text-sm font-medium mt-5">
                  Duration (Days)
                </label>
                <input
                  type="number"
                  placeholder="Enter Duration (Days)"
                  className="w-full p-2 border border-gray-400 ring-2 ring-gray-200 mt-1 rounded-sm focus:ring-2 focus:ring-secondary-dark focus:border-blue-500"
                  value={durationDays}
                  onChange={(e) => setDurationDays(e.target.value)}
                />
                <label className="block text-gray-700 text-sm font-medium mt-5">
                  ROI (Return on Investment)
                </label>
                <input
                  type="number"
                  placeholder="Enter ROI (%)"
                  className="w-full p-2 border border-gray-400 ring-2 ring-gray-200 mt-1 rounded-sm focus:ring-2 focus:ring-secondary-dark focus:border-blue-500"
                  value={roiPercentage}
                  onChange={(e) => setRoiPercentage(e.target.value)}
                />
              </div>
            )}

            {/* Buttons */}
            <div className="flex justify-between mt-6">
              <button
                onClick={() => setInvestorModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleActivateInvestor}
                className="px-4 py-2 bg-green-500 text-white rounded-md"
              >
                Activate Investor
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default AdminPayments;
