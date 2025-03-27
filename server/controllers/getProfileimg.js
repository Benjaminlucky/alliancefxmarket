import User from "../models/User.js";
import UserInvestment from "../models/UserInvestment.js";
import investmentPlan from "../models/investmentModels.js";

export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming authentication middleware sets req.user

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Fetch investment from UserInvestment model
    const userInvestment = await UserInvestment.findOne({ user: userId }).sort({
      startDate: -1,
    }); // Get latest investment if multiple exist

    let investmentDetails = null;

    if (userInvestment) {
      investmentDetails = {
        planName: userInvestment.planName,
        amountInvested: userInvestment.amount,
        expectedReturns: userInvestment.expectedPayout - userInvestment.amount, // ROI Calculation
        totalPayout: userInvestment.expectedPayout,
        returnPercentage: userInvestment.roi,
        investmentDate: userInvestment.startDate
          ? userInvestment.startDate.toISOString()
          : null,
        maturityDate: userInvestment.maturityDate
          ? userInvestment.maturityDate.toISOString()
          : null,
        status: userInvestment.status,
      };
    } else if (user.amountInvested > 0) {
      // If no record in UserInvestment, check User schema
      investmentDetails = {
        planName: user.planName || "No Plan",
        amountInvested: user.amountInvested,
        expectedReturns: user.expectedReturns || 0,
        totalPayout: user.totalPayout || 0,
        returnPercentage: user.roiPercentage || 0,
        investmentDate: user.investmentDate
          ? user.investmentDate.toISOString()
          : null,
        maturityDate: user.maturityDate
          ? user.maturityDate.toISOString()
          : null,
        status: "Active",
      };
    }

    return res.status(200).json({
      fullName: user.fullName,
      profileImage: user.profileImage,
      isVerified: user.isVerified,
      investmentDetails, // Now includes data from UserInvestment if available
    });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return res.status(500).json({ message: "Internal server error", error });
  }
};
