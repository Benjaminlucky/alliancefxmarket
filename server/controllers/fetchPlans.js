import investmentPlan from "../models/investmentModels.js";

// Fetch Plan Details by ID
const fetchPlanController = async (req, res) => {
  try {
    const { planId } = req.params;

    // Validate planId
    if (!planId) {
      return res
        .status(400)
        .json({ success: false, message: "Plan ID is required" });
    }

    // Find plan by ID
    const plan = await investmentPlan.findById(planId);

    if (!plan) {
      return res
        .status(404)
        .json({ success: false, message: "Plan not found" });
    }

    // Return the plan details
    res.status(200).json({ success: true, plan });
  } catch (error) {
    console.error("Error fetching plan:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export default fetchPlanController;
