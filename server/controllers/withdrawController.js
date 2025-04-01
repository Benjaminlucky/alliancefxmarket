import postmark from "postmark";
import dotenv from "dotenv";

dotenv.config();

// Set up the Postmark client using your server API token
const postmarkApiKey =
  process.env.POSTMARK_API_KEY || "be326a40-1bb6-485b-8ea1-52be241a2bec";
const client = new postmark.ServerClient(postmarkApiKey);

export const withdrawController = async (req, res) => {
  try {
    const { amount, walletAddress } = req.body;

    // Ensure the admin email is used for sending the notification
    const adminEmail = process.env.ADMIN_EMAIL || "bamidelebenjamin5@gmail.com"; // Default to 'info@glamandessence.com' if no admin email is set

    if (!amount || !walletAddress) {
      return res
        .status(400)
        .json({ message: "Amount and Wallet Address are required." });
    }

    if (isNaN(amount) || amount <= 0) {
      return res.status(400).json({ message: "Invalid withdrawal amount." });
    }

    // Send confirmation email to the admin (info@glamandessence.com or any email you want)
    await client.sendEmail({
      From: `"AllianceFX Market" <info@glamandessence.com>`,
      To: adminEmail, // Send to the admin email
      Subject: "Withdrawal Request Submitted",
      HtmlBody: `
        <html><body>
          <p>A withdrawal request has been submitted:</p>
          <p><strong>Amount:</strong> $${amount}</p>
          <p><strong>Wallet Address:</strong> ${walletAddress}</p>
          <p>Your request is being processed. Please allow up to 48 hours.</p>
        </body></html>
      `,
      TextBody: `A withdrawal request has been submitted:\n\nAmount: $${amount}\nWallet Address: ${walletAddress}\n\nPlease process the request within 48 hours.`,
    });

    // Send notification email to the admin as well
    await client.sendEmail({
      From: `"AllianceFX Market" <info@glamandessence.com>`,
      To: adminEmail, // Admin email to notify of the withdrawal request
      Subject: "New Withdrawal Request",
      HtmlBody: `
        <html><body>
          <p>A new withdrawal request has been received:</p>
          <p><strong>Amount:</strong> $${amount}</p>
          <p><strong>Wallet Address:</strong> ${walletAddress}</p>
          <p>Please process the request within 48 hours.</p>
        </body></html>
      `,
      TextBody: `A new withdrawal request has been received:\n\nAmount: $${amount}\nWallet Address: ${walletAddress}\n\nPlease process the request within 48 hours.`,
    });

    return res.status(200).json({
      message:
        "Withdrawal request submitted successfully and notification email sent to the admin.",
    });
  } catch (error) {
    console.error("Withdrawal request error:", error);
    return res.status(500).json({ message: "Internal server error." });
  }
};
