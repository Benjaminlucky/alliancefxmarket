import express from "express";
import { upload, uploadAvatar } from "../controllers/avataruploadController.js";
import {
  registerUser,
  loginUser,
  getUser,
  resendVerificationEmail,
  verifyUser,
  getUserStatus,
  getUserById,
} from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { getUserProfile } from "../controllers/getProfileimg.js";
import { forgotPassword } from "../controllers/forgotPassword.js";
import { resetPassword } from "../controllers/resetpassword.js";
import { deleteUser } from "../controllers/deleteUserController.js";
import updateUser from "../controllers/editUserController.js";
import { handleInvestment } from "../controllers/investmentInvoicegen.js";

const router = express.Router();

// User routes
router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/user/:userId", authMiddleware, getUser); // Added authentication for user details
router.post("/resend-verification", authMiddleware, resendVerificationEmail);
router.get("/verify/:token", verifyUser);
router.get("/verify-email", verifyUser);
router.get("/status", authMiddleware, getUserStatus);
router.post("/investmentinvoice", authMiddleware, handleInvestment);

// Avatar upload route
router.post(
  "/upload-avatar",
  authMiddleware,
  upload.single("avatar"),
  uploadAvatar
);

router.get("/profile", authMiddleware, getUserProfile);
router.get("/users/:userId", getUserById); // ✅ This should exist

// Forgot Password Route
router.post("/forgot-password", forgotPassword);
router.post("/resetpassword", resetPassword);

//Delet User
router.delete("/deleteuser/:id", deleteUser);
router.put("/updateuser/:id", updateUser);

export default router;
