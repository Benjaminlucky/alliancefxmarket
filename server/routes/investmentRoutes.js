import express from "express";
import { getPlans, investPlan } from "../controllers/investmentController.js";

const router = express.Router();

router.post("/investments", investPlan);
router.get("/investments", getPlans);

export default router;
