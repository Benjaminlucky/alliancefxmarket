import postmark from "postmark";
import fs from "fs";
import path from "path";

const postmarkApiKey =
  process.env.POSTMARK_API_KEY || "be326a40-1bb6-485b-8ea1-52be241a2bec";
const client = new postmark.ServerClient(postmarkApiKey);

export const sendInvoiceEmail = async (email, invoicePath, invoiceUrl) => {
  try {
    const baseUrl =
      process.env.NODE_ENV === "production"
        ? "https://alliancefxmarket.onrender.com"
        : "http://localhost:3000";

    const fullInvoiceUrl = `${baseUrl}${invoiceUrl}`;

    // Fix: Ensure file exists before attaching
    if (!fs.existsSync(invoicePath)) {
      throw new Error("Invoice file not found at " + invoicePath);
    }

    // Read the PDF as base64
    const pdfBuffer = fs.readFileSync(invoicePath);
    const pdfBase64 = pdfBuffer.toString("base64");

    const result = await client.sendEmail({
      From: "info@glamandessence.com",
      To: email,
      Subject: "Your Investment Invoice",
      TextBody: `Dear Investor,\n\nAttached is your investment invoice.\n\nYou can also download it here: ${fullInvoiceUrl}`,
      HtmlBody: `<p>Dear Investor,</p>
                 <p>Attached is your investment invoice.</p>
                 <p>You can also download it <a href="${fullInvoiceUrl}">here</a>.</p>`,
      Attachments: [
        {
          Name: "Investment_Invoice.pdf",
          Content: pdfBase64,
          ContentType: "application/pdf",
        },
      ],
    });

    console.log("Invoice email sent successfully:", result);
    return result;
  } catch (error) {
    console.error("Error sending invoice email:", error.message);
    throw new Error(`Error sending invoice email: ${error.message}`);
  }
};
