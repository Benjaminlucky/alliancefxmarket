import bcrypt from "bcrypt";
import User from "../models/User.js"; // Adjust the path to your User model
import postmark from "postmark"; // Import the Postmark SDK

// Set up the Postmark client using your server API token
const postmarkApiKey = process.env.POSTMARK_API_KEY || "be326a40-1bb6-485b-8ea1-52be241a2bec";
const client = new postmark.ServerClient(postmarkApiKey);

export const resetPassword = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  try {
    // Validate input fields
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res
        .status(400)
        .json({ error: "New password and confirm password do not match" });
    }

    if (newPassword.length < 8) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long",
      });
    }

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update the password in the database
    user.password = hashedPassword;
    await user.save();

    // Send a confirmation email using Postmark
    await client.sendEmail({
      From: `"AllianceFX Market" <info@glamandessence.com>`, // Your sender email
      To: email,
      Subject: "Your password has been reset",
      HtmlBody: `<html><body><p>Dear ${user.fullName},</p><p>Your password has been successfully reset.</p><p>If you did not request this change, please contact support immediately.</p></body></html>`,
      TextBody: `Dear ${user.fullName},\n\nYour password has been successfully reset.\n\nIf you did not request this change, please contact support immediately.`,
    });

    // Send success response
   return res.status(200).json({
      success: true,
      message: "Password reset successfully and confirmation email sent",
    });
  } catch (error) {
    console.error("Error during password reset:", error.message);
    res.status(500).json({ error: "Server error" });
  }
};
