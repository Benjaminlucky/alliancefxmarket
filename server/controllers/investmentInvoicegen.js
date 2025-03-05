import UserInvestment from "../models/UserInvestment.js";
import User from "../models/User.js";

import { sendInvoiceEmail } from "../utils/sendInvoiceEmail.js";
import { generateInvoicePDF } from "../utils/invoiceUtils.js";

export const handleInvestment = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ error: "Unauthorized: No user found" });
    }

    const { planName, amount, roi, maturityDate, expectedPayout } = req.body;
    const userId = req.user._id;

    // Fetch user details
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Save investment details
    const investment = new UserInvestment({
      user: userId,
      planName,
      amount,
      startDate: new Date(),
      maturityDate,
      roi,
      expectedPayout,
      status: "pending",
    });

    await investment.save();

    // Generate Invoice PDF
    const baseUrl = `${req.protocol}://${req.get("host")}`;
    const { invoicePath, invoiceUrl } = await generateInvoicePDF({
      fullName: user.fullName,
      email: user.email,
      phone: user.phone || "N/A",
      country: user.country || "N/A",
      planName,
      amount,
      roi,
      maturityDate,
      expectedPayout,
      investmentId: investment._id,
      baseUrl, // Pass base URL for proper URL formation
    });

    // Ensure invoice file exists before sending email
    if (!invoicePath) {
      throw new Error("Invoice file not found");
    }

    // Send invoice email
    await sendInvoiceEmail(user.email, invoicePath, invoiceUrl);

    res.status(201).json({
      message: "Investment successful! Invoice sent to your email.",
      invoiceUrl: `${baseUrl}${invoiceUrl}`, // Ensure correct full URL
    });
  } catch (error) {
    console.error("Investment processing error:", error);
    res.status(500).json({ error: "Failed to process investment" });
  }
};
