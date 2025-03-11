import express from "express";
import fetchPlanController from "../controllers/fetchPlans.js";

const router = express.Router();

// GET route to fetch a plan by ID
router.get("/plans/:planId", fetchPlanController);

export default router;
