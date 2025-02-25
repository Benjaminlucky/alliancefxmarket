import express from "express";
import {
  getPlans,
  investPlan,
  addFeatureToInvestment,
  deleteInvestmentPlan,
  updateInvestmentPlan, // Import the new function
} from "../controllers/investmentController.js";
import { activateInvestor } from "../controllers/activateInvestor.js";

const router = express.Router();

router.post("/investments", investPlan); // Create a new investment plan
router.get("/investments", getPlans); // Get all investment plans
router.post("/investments/:id/features", addFeatureToInvestment); // Add feature to a specific investment
router.put("/investments/:id", updateInvestmentPlan);
router.delete("/investments/:id", deleteInvestmentPlan);

//New Route to activate an investor
router.post("/investments/activate/:investorId/:planId", activateInvestor);

export default router;
