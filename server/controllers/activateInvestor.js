import User from "../models/User.js";
import UserInvestment from "../models/UserInvestment.js";
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

    // Validate required inputs
    if (!userId)
      return res.status(400).json({ message: "User ID is required" });
    if (!amountInvested || amountInvested <= 0)
      return res.status(400).json({ message: "Invalid investment amount" });
    if (!durationDays || durationDays <= 0)
      return res.status(400).json({ message: "Invalid investment duration" });

    // Convert to numbers
    const investmentAmount = Number(amountInvested);
    const durationMonths = durationDays / 30; // Convert days to months
    let roi = roiPercentage !== undefined ? Number(roiPercentage) / 100 : 0.1; // Default 10% ROI

    if (isNaN(investmentAmount) || isNaN(roi)) {
      return res
        .status(400)
        .json({ message: "Invalid investment amount or ROI percentage" });
    }

    console.log("ROI Percentage:", roi);

    // Fetch user
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    // Calculate maturity date
    const maturityDate = new Date();
    maturityDate.setDate(maturityDate.getDate() + durationDays);

    // Calculate expected payout
    const expectedReturns = Math.round(investmentAmount * roi * durationMonths);

    const totalPayout = Math.round(investmentAmount + expectedReturns);

    console.log(
      `Calculating Expected Returns: ${investmentAmount} * ${roi} * ${durationMonths}`
    );
    console.log("Expected Returns:", expectedReturns);
    console.log("Total Payout:", totalPayout);

    // Prepare investment data
    const investmentData = {
      user: userId,
      planName: planName || "Custom Plan",
      amount: investmentAmount,
      roi: Math.round(roi * 100),
      // Store as percentage
      startDate: new Date(),
      maturityDate, // Ensuring it's always set
      expectedPayout: totalPayout, // Ensuring it's always set
      status: "pending",
    };

    // If planId is provided, fetch the plan and validate deposit amount
    if (planId) {
      const plan = await investmentPlan.findById(planId);
      if (!plan)
        return res.status(404).json({ message: "Investment plan not found" });

      if (investmentAmount < plan.minimumDeposit) {
        return res
          .status(400)
          .json({ message: `Minimum deposit is ${plan.minimumDeposit}` });
      }

      investmentData.planId = plan._id;
      investmentData.planName = plan.planName;
    }

    // Update user's investment details
    user.amountInvested = investmentAmount;
    user.durationDays = durationDays;
    user.investmentDate = new Date();
    user.expectedReturns = expectedReturns;
    user.totalPayout = totalPayout;
    user.maturityDate = maturityDate;
    user.returnPercentage = Math.round(roi * 100);

    // Save investment
    const investment = new UserInvestment(investmentData);
    await investment.save();

    // Save user updates
    await user.save();

    return res.status(201).json({
      message: "Investment activated successfully",
      user,
      investment,
    });
  } catch (error) {
    console.error("Investment activation error:", error);
    return res
      .status(500)
      .json({ message: "Server error", error: error.message });
  }
};
