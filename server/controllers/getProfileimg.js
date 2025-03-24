import User from "../models/User.js";
import investmentPlan from "../models/investmentModels.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware sets req.user

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Default investment details from the user schema
    let investmentDetails = {
      planName: user.planName || "No Plan",
      amountInvested: user.amountInvested || 0,
      expectedReturns: user.expectedReturns || 0,
      totalPayout: user.totalPayout || 0,
      returnPercentage: user.returnPercentage || 0,
      investmentDate: user.investmentDate
        ? user.investmentDate.toISOString()
        : null,
      maturityDate: user.maturityDate ? user.maturityDate.toISOString() : null,
    };

    // If the user has a valid investment plan ID, fetch details from `investmentPlan`
    if (user.planId) {
      const plan = await investmentPlan.findById(user.planId);
      if (plan) {
        investmentDetails.planName = plan.name || "Investment Plan";
      }
    }

    return res.status(200).json({
      fullName: user.fullName,
      profileImage: user.profileImage,
      isVerified: user.isVerified,
      investmentDetails, // Ensures investment details are properly structured
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
