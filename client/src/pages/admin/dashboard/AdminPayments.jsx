import React, { Fragment, useState, useEffect } from "react";
import { Menu, Transition } from "@headlessui/react";

function AdminPayments() {
  const [investors, setInvestors] = useState([]);
  const [investmentPlans, setInvestmentPlans] = useState([]);
  const [investments, setInvestments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const usersPerPage = 10;
  const [investorModal, setInvestorModal] = useState(false);
  const [selectedInvestor, setSelectedInvestor] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState("");
  const [message, setMessage] = useState("");

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
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [currentPage]);

  const fetchInvestmentPlans = async () => {
    const API_BASE_URL =
      window.location.origin === "http://localhost:5173"
        ? "http://localhost:3000"
        : "https://alliancefxmarket.onrender.com";

    try {
      const response = await fetch(`${API_BASE_URL}/admin/investments/`);
      if (!response.ok) throw new Error("Failed to fetch investment plans");

      const data = await response.json();
      setInvestmentPlans(data.plans || []);
    } catch (error) {
      console.error("Error fetching investment plans:", error);
    }
  };

  const handleInvestorModal = (investor) => {
    setSelectedInvestor(investor);
    setInvestorModal(true);
    fetchInvestmentPlans();
  };

  const handleActivateInvestor = async () => {
    if (!selectedInvestor || !selectedPlan) {
      alert("Please select an investor and an investment plan.");
      return;
    }

    const API_BASE_URL =
      window.location.origin === "http://localhost:5173"
        ? "http://localhost:3000"
        : "https://alliancefxmarket.onrender.com";

    try {
      const response = await fetch(
        `${API_BASE_URL}/admin/investments/activate/${selectedInvestor._id}/${selectedPlan}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            investorId: selectedInvestor._id,
            planId: selectedPlan,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to activate investor");

      alert("Investor activated successfully!");
      setInvestorModal(false);
    } catch (error) {
      console.error("Error activating investor:", error);
      alert("Error activating investor.");
    }
  };

  return (
    <main>
      <div className="w-full p-6">
        <h3 className="text-3xl font-bold text-gray-500">Manage Deposits</h3>

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
                          {investmentPlans.find(
                            (plan) => plan._id === investor.planId
                          )?.planName || "N/A"}
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
            <p className="text-center text-gray-500 mt-2 py-2">
              {selectedInvestor.fullName || "Unknown Investor"}
            </p>

            <select
              className="w-full mt-4 p-2 border rounded-md"
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
            >
              <option value="">Select Investment Plan</option>
              {investmentPlans.map((plan) => (
                <option key={plan._id} value={plan._id}>
                  {plan.planName}
                </option>
              ))}
            </select>

            {message && (
              <p className="text-center text-red-500 mt-2">{message}</p>
            )}

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
