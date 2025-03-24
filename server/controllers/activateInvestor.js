import User from "../models/User.js";
import investmentPlan from "../models/investmentModels.js";

export const activateInvestor = async (req, res) => {
  try {
    console.log("Received request body:", req.body);

    const {
      userId,
      planId,
      planName,
      amountInvested,
      durationDays,
      roiPercentage,
    } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!amountInvested || amountInvested <= 0) {
      return res.status(400).json({ message: "Invalid investment amount" });
    }
    if (!durationDays || durationDays <= 0) {
      return res.status(400).json({ message: "Invalid investment duration" });
    }

    // Convert inputs to numbers
    const investmentAmount = Number(amountInvested);
    const durationMonths = durationDays / 30; // Convert days to months
    let roi = roiPercentage !== undefined ? Number(roiPercentage) / 100 : 0.1; // Convert from % to decimal

    if (isNaN(investmentAmount) || isNaN(roi)) {
      return res
        .status(400)
        .json({ message: "Invalid investment amount or ROI percentage" });
    }

    console.log("ROI Percentage:", roi); // Debugging

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (planId) {
      const plan = await investmentPlan.findById(planId);
      if (!plan) {
        return res.status(404).json({ message: "Investment plan not found" });
      }
      user.planId = plan._id;
      user.planName = plan.name;
      roi = roiPercentage !== undefined ? roi : plan.roi / 100 || 0.1;
    } else if (planName) {
      user.planName = planName;
      user.planId = null;
    } else {
      return res
        .status(400)
        .json({ message: "Either planId or planName is required" });
    }

    // Store investment details
    user.amountInvested = investmentAmount;
    user.durationDays = durationDays;
    user.investmentDate = new Date();

    // **ROI Calculation (Now Uses User's ROI Correctly!)**
    user.expectedReturns = investmentAmount * roi * durationMonths;
    user.totalPayout = investmentAmount + user.expectedReturns;
    user.returnPercentage = roi * 100;

    // Debugging Logs
    console.log(
      `Calculating Expected Returns: ${investmentAmount} * ${roi} * ${durationMonths}`
    );
    console.log("Expected Returns:", user.expectedReturns);
    console.log("Total Payout:", user.totalPayout);

    // Calculate Maturity Date
    const maturityDate = new Date();
    maturityDate.setDate(maturityDate.getDate() + durationDays);
    user.maturityDate = maturityDate;

    await user.save();
    return res
      .status(200)
      .json({ message: "Investment created successfully", user });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
