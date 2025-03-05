import express from "express";
import { upload, uploadAvatar } from "../controllers/avataruploadController.js";
import {
  registerUser,
  loginUser,
  getUser,
  resendVerificationEmail,
  verifyUser,
  getUserStatus,
} from "../controllers/userController.js";
import { authenticateToken } from "../middlewares/authMiddleware.js";
import { getUserProfileImage } from "../controllers/getProfileimg.js";
import { forgotPassword } from "../controllers/forgotPassword.js";
import { resetPassword } from "../controllers/resetpassword.js";
import { deleteUser } from "../controllers/deleteUserController.js";
import updateUser from "../controllers/editUserController.js";
import { handleInvestment } from "../controllers/investmentInvoicegen.js";

const router = express.Router();

// User routes
router.post("/signup", registerUser);
router.post("/signin", loginUser);
router.get("/user/:userId", authenticateToken, getUser); // Added authentication for user details
router.post("/resend-verification", authenticateToken, resendVerificationEmail);
router.get("/verify/:token", verifyUser);
router.get("/verify-email", verifyUser);
router.get("/status", authenticateToken, getUserStatus);
router.post("/investmentinvoice", authenticateToken, handleInvestment);

// Avatar upload route
router.post(
  "/upload-avatar",
  authenticateToken,
  upload.single("avatar"),
  uploadAvatar
);

router.get("/profile", authenticateToken, getUserProfileImage);

// Forgot Password Route
router.post("/forgot-password", forgotPassword);
router.post("/resetpassword", resetPassword);

//Delet User
router.delete("/deleteuser/:id", deleteUser);
router.put("/updateuser/:id", updateUser);

export default router;
