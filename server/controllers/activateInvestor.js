import User from "../models/User.js";
import investmentPlan from "../models/investmentModels.js";

export const activateInvestor = async (req, res) => {
  try {
    const { investorId, planId } = req.params;
    if (!investorId || !planId) {
      return res
        .status(400)
        .json({ message: "Investor ID and Plan ID are required" });
    }

    // Check if the investor exists
    const investor = await User.findById(investorId);
    if (!investor) {
      return res.status(404).json({ message: "Investor not found" });
    }

    // Check if the investment plan exists
    const plan = await investmentPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ message: "Investment Plan not found" });
    }

    // Calculate ROI dynamically based on the new returns percentage
    const roiAmount =
      (plan.minimumDeposit * plan.minimumReturns * investor.durationMonths) /
      100;
    const totalPayout = plan.minimumDeposit + roiAmount;

    // Calculate maturity date
    const activationDate = new Date();
    const maturityDate = new Date(activationDate);
    maturityDate.setMonth(maturityDate.getMonth() + investor.durationMonths);

    // Use findByIdAndUpdate with { new: true } to return the updated document immediately
    const updatedInvestor = await User.findByIdAndUpdate(
      investorId,
      {
        planId,
        amountInvested: plan.minimumDeposit,
        durationMonths: plan.minimumDuration,
        expectedReturns: plan.minimumReturns,
        totalPayout,
        maturityDate,
        status: "Active",
      },
      { new: true, runValidators: true } // Ensure validators run and return the updated document
    );

    return res.status(200).json({
      message: "Investor activated successfully",
      investor: updatedInvestor, // Now updated immediately
    });
  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
