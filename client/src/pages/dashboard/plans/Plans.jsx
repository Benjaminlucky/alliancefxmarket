import React, { useEffect, useState } from "react";
import Profile from "../../../components/profile/Profile";

function Plans() {
  const [plans, setPlans] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
          throw new Error(`HTTP error! Status: ${response.status}`);
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
        alert("Investment successful! Invoice sent.");

        if (data.invoiceUrl) {
          console.log("Opening invoice:", data.invoiceUrl); // Debugging
          window.open(data.invoiceUrl, "_blank"); // ✅ Ensure valid URL format
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
    <main className="main">
      <div className="mainWrapper mx-auto w-4/5 py-10">
        <div className="mainContent">
          <div className="profileSection">
            <div className="profileWrapper">
              <div className="profileContent">
                <Profile />
              </div>
            </div>
          </div>
          <div className="planSection">
            <div className="planWrapper py-16">
              <h2 className="text-white text-4xl font-bold pb-14">
                All Available Plans
              </h2>
              {isLoading ? (
                <p className="text-white text-center">Loading plans...</p>
              ) : (
                <div className="planContent text-white gap-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {plans.map((plan, id) => (
                    <div className="plan bg-accent rounded-sm" key={id}>
                      <div className="planDetails px-8 py-6">
                        <h3 className="text-secondary-light text-3xl font-bold pb-2">
                          {plan.planName}
                        </h3>
                        <h4 className="font-bold text-2xl pb-3">
                          ${plan.minimumDeposit}
                        </h4>

                        {plan.features.map((feature, index) => (
                          <li key={index} className="list-none text-gray-400">
                            {feature}
                          </li>
                        ))}
                        <div className="button py-5">
                          <button
                            onClick={() => handleInvestment(plan)}
                            className="border border-1 border-secondary-light hover:border-transparent hover:bg-secondary-light hover:text-accent py-2 px-5 rounded-full font-semibold"
                          >
                            Invest Now
                          </button>
                        </div>
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

export default Plans;
