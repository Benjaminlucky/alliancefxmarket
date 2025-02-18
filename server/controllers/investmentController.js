import investmentPlan from "../models/investmentModels.js";

export const investPlan = async (req, res) => {
  const {
    planName,
    minimumDeposit,
    minimumDuration,
    minimumReturns,
    features,
  } = req.body;

  // validate all fields
  if (!planName || !minimumDeposit || !minimumDuration || !minimumReturns) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Validate that plans exist
  try {
    const existingPlan = await investmentPlan.findOne({ planName });
    if (existingPlan) {
      return res.status(400).json({ message: "Plan already exist" });
    }

    const plan = new investmentPlan({
      planName,
      minimumDeposit,
      minimumDuration,
      minimumReturns,
    });

    await plan.save();
    return res
      .status(201)
      .json({ message: true, message: "Plan created", plan });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//Get Investment Plans
export const getPlans = async (req, res) => {
  try {
    const plans = await investmentPlan.find();
    return res.status(200).json({ success: true, plans });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Add Feature to a Specific Investment Plan
export const addFeatureToInvestment = async (req, res) => {
  try {
    const { id } = req.params;
    const { feature } = req.body;

    const investment = await investmentPlan.findById(id);
    if (!investment) {
      return res.status(404).json({ error: "Investment not found" });
    }

    investment.features.push(feature);
    await investment.save();

    res.status(200).json({ message: "Feature added successfully", investment });
  } catch (error) {
    console.error("Error adding feature:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Delete an Investment Plan
export const deleteInvestmentPlan = async (req, res) => {
  try {
    const { id } = req.params;

    // Find and delete the investment plan by ID
    const deletedPlan = await investmentPlan.findByIdAndDelete(id);

    if (!deletedPlan) {
      return res
        .status(404)
        .json({ success: false, message: "Investment plan not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Investment plan deleted successfully" });
  } catch (error) {
    console.error("Error deleting investment:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};
