import express from "express";
import {
  getPlans,
  investPlan,
  addFeatureToInvestment,
  deleteInvestmentPlan,
  updateInvestmentPlan,
  getUserInvestmentDetails, // Import the new function
} from "../controllers/investmentController.js";
import { activateInvestor } from "../controllers/activateInvestor.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/investments", investPlan); // Create a new investment plan
router.get("/investments", getPlans); // Get all investment plans
router.post("/investments/:id/features", addFeatureToInvestment); // Add feature to a specific investment
router.put("/investments/:id", updateInvestmentPlan);
router.delete("/investments/:id", deleteInvestmentPlan);

// ✅ Route to get user investment details
// ✅ Ensure the route is correct
router.get("/investment-details", authenticateToken, getUserInvestmentDetails);

//New Route to activate an investor
router.post("/investments/activate/:investorId/:planId", activateInvestor);

export default router;
