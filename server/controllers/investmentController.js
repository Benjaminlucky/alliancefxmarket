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
