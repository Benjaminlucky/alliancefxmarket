import User from "../models/User.js";
import investmentPlan from "../models/investmentModels.js";

// Function to calculate maturity date
const calculateMaturityDate = (activationDate, durationMonths) => {
  const maturityDate = new Date(activationDate); // Create a new date object from the activation date
  maturityDate.setMonth(maturityDate.getMonth() + durationMonths); // Add the duration to the month
  return maturityDate; // Return the maturity date
};

// Function to activate an investor

export const activateInvestor = async (req, res) => {
  try {
    const { investorId, planId } = req.params; // Get the investorId and planId from the request body
    if (!investorId || !planId) {
      // Check if the investorId and planId are provided
      return res
        .status(400)
        .json({ message: "Investor ID and Plan ID are required" }); // Return an error if not provided
    }

    // Check if the investor exists in the database
    const investor = await User.findById(investorId);
    if (!investor) {
      // If the investor does not exist
      return res.status(404).json({ message: "Investor not found" }); // Return an error
    }

    // Check if the Investment plan exist
    const plan = await investmentPlan.findById(planId);
    if (!plan) {
      // If the plan does not exist
      return res.status(404).json({ message: "Investment Plan not found" }); // Return an error
    }

    // Calculate total payout
    const totalPayout =
      plan.minimumDeposit * plan.minimumDuration * plan.minimumReturns; // Calculate the total payout;

    // Calculate maturity date
    const activationDate = new Date(); // Get the current date as the activation date
    const maturityDate = calculateMaturityDate(
      activationDate,
      plan.minimumDuration
    ); // Calculate the maturity date

    // Update the investor details
    investor.planId = planId._id; // Set the planId
    investor.amountInvested = plan.minimumDeposit; // Set the amount invested
    investor.durationMonths = plan.minimumDuration; // Set the duration in months
    investor.expectedReturns = plan.minimumReturns; // Set the expected returns
    investor.totalPayout = totalPayout; // Set the total payout
    investor.maturityDate = maturityDate; // Set the maturity date
    investor.status = "Active"; // Set the status to Active

    // Save the updated investor details
    await investor.save();

    return res
      .status(200)
      .json({ message: "Investor activated successfully", investor }); // Return a success message
  } catch (error) {
    console.log("Error :", error); // Log the error to the console
    return res.status(500).json({ message: "Internal Server Error" }); // Return an error message
  }
};
