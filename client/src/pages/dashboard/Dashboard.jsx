import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // ✅ Import animation library
import Profile from "../../components/profile/profile";

function Dashboard() {
  const [isLoading, setIsLoading] = useState(false);
  const [plans, setPlans] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // ✅ State for success message

  useEffect(() => {
    const fetchPlans = async () => {
      const API_BASE_URL =
        window.location.origin === "http://localhost:5173"
          ? "http://localhost:3000"
          : "https://alliancefxmarket.onrender.com";

      try {
        setIsLoading(true);
        const response = await fetch(`${API_BASE_URL}/admin/investments/`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Fetched plans:", data);

        if (data && Array.isArray(data.plans)) {
          setPlans(data.plans);
        } else {
          setPlans([]);
        }
      } catch (error) {
        console.error("Error fetching investment plans:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const handleInvestment = async (plan) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        alert("You must be logged in to invest.");
        return;
      }

      const API_BASE_URL =
        window.location.origin === "http://localhost:5173"
          ? "http://localhost:3000"
          : "https://alliancefxmarket.onrender.com";

      const response = await fetch(`${API_BASE_URL}/user/investmentinvoice/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planName: plan.planName,
          amount: plan.minimumDeposit,
          roi: plan.minimumReturns,
          maturityDate: new Date(
            new Date().setMonth(new Date().getMonth() + plan.minimumDuration)
          ).toISOString(),
          expectedPayout:
            plan.minimumDeposit +
            (plan.minimumDeposit * plan.minimumReturns) / 100,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage(
          "🎉 Investment successful! Your invoice has been sent."
        ); // ✅ Set success message
        setTimeout(() => setSuccessMessage(""), 5000); // ✅ Hide after 5 seconds

        if (data.invoiceUrl) {
          console.log("Opening invoice:", data.invoiceUrl);
          window.open(data.invoiceUrl, "_blank"); // ✅ Open invoice preview
        }
      } else {
        alert("Error: " + (data.message || "Investment failed"));
      }
    } catch (error) {
      console.error("Investment error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <main className="section px-3 md:px-0 md:w-4/5 lg:w-4/5 mx-auto text-white">
      <div className="mainWrapper w-full py-14 px-2 md:px-20">
        <div className="profile">
          <Profile />
        </div>

        {/* ✅ Animated Success Message */}
        <AnimatePresence>
          {successMessage && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-6 py-3 rounded-md shadow-lg z-50"
            >
              {successMessage}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="investmentSection">
          <div className="investmentWrapper mt-3">
            <div className="investmentContent">
              <div className="investmentTitle py-10 mb-10">
                <h2 className="text-4xl font-bold">
                  Choose an Investment Plan
                </h2>
              </div>
              {isLoading ? (
                <p className="text-center">Loading investment plans...</p>
              ) : (
                <div className="investmentPlansWrapper gap-5 grid grid-col-1 md:grid-cols-3">
                  {plans.map((plan, id) => (
                    <div className="plan bg-accent rounded-sm" key={id}>
                      <div className="planContent px-5 py-8">
                        <h3 className="text-2xl font-bold text-secondary-light">
                          {plan.planName}
                        </h3>
                        <h5 className="font-bold text-3xl py-1">
                          ${plan.minimumDeposit}
                        </h5>
                        {plan.features && plan.features.length > 0 ? (
                          plan.features.map((feature, index) => (
                            <li
                              key={index}
                              className="list-none mb-1 text-gray-400"
                            >
                              {feature}
                            </li>
                          ))
                        ) : (
                          <p className="text-gray-400">No features listed</p>
                        )}
                        <button
                          onClick={() => handleInvestment(plan)}
                          className="rounded-full border text-lg font-semibold border-secondary-light mt-5 py-3 px-10 hover:border-transparent hover:bg-secondary-light hover:text-accent"
                        >
                          Invest Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
