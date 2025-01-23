import express from "express";
import { loginAdmin, registerAdmin } from "../controllers/adminController.js";

const router = express.Router();

// POST  / admin / register

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

export default router;
