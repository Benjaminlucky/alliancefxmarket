import crypto from "crypto";
import postmark from "postmark";
import User from "../models/User.js";

// Create a Postmark client
const postmarkApiKey = process.env.POSTMARK_API_KEY || "be326a40-1bb6-485b-8ea1-52be241a2bec";
const postmarkClient = new postmark.ServerClient(postmarkApiKey);

export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User with this email does not exist" });
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Store hashed reset token and expiration time in the database
    user.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    user.resetPasswordExpires = Date.now() + 3600000; // Token expires in 1 hour

    // Save the updated user document
    await user.save();

    // Generate the password reset URL with the token
    const resetURL = `${process.env.CLIENT_URL || "https://alliancefxmarket.netlify.app"}/resetpassword/${resetToken}?email=${encodeURIComponent(user.email)}`;


    // Send reset email via Postmark
    await postmarkClient.sendEmail({
      From: `"AllianceFX Market" <info@glamandessence.com>`, // Update with your verified sender email in Postmark
      To: user.email,
      Subject: "Password Reset Request",
      HtmlBody: `
        <p>Hello ${user.fullName || 'User'},</p> <!-- Use a fallback value -->
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <p><a href="${resetURL}" target="_blank">Reset Password</a></p>
        <p>If you did not request this, please ignore this email.</p>
      `,
      TextBody: `You requested a password reset. Click the link below to reset your password: ${resetURL}`,
    });

    // Respond with success message
    res.status(200).json({ message: "Password reset link sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error, please try again later" });
  }
};
