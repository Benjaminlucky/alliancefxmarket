import express from "express";

import {
  addWallet,
  deleteWallet,
  getWallets,
  updateWallet,
} from "../controllers/walletController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import verifyAdmin from "../utils/verifyAdmin.js";

const router = express.Router();

// Add a new wallet
router.post("/addWallets", verifyAdmin, addWallet);

// Get all wallets
router.get("/getWallets", verifyAdmin, getWallets);

// Get all wallets for Investors
router.get("/getWalletsInvestors", getWallets);

// Update a wallet
router.put("/updateWallets/:id", authenticateToken, updateWallet);

// Delete a wallet
router.delete("/deleteWallets/:id", verifyAdmin, deleteWallet);

export default router;
