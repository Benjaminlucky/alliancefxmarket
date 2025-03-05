import fs from "fs";
import path from "path";
import PDFDocument from "pdfkit";

export const generateInvoicePDF = async (invoiceData) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    const invoiceDir = path.join("server", "invoices");
    const fileName = `invoice_${invoiceData.investmentId}.pdf`;
    const invoicePath = path.join(invoiceDir, fileName);
    const invoiceUrl = `${invoiceData.baseUrl}/invoices/${fileName}`; // Generate correct URL

    if (!fs.existsSync(invoiceDir)) {
      fs.mkdirSync(invoiceDir, { recursive: true });
    }

    const writeStream = fs.createWriteStream(invoicePath);
    doc.pipe(writeStream);

    // Header Section
    doc
      .fontSize(24)
      .fillColor("#333")
      .text("Investment Invoice", { align: "center" })
      .moveDown(0.5);

    doc
      .fontSize(14)
      .fillColor(invoiceData.status === "paid" ? "green" : "red")
      .text(invoiceData.status === "paid" ? "PAID" : "UNPAID", {
        align: "center",
      })
      .fillColor("black")
      .moveDown(1);

    // Date Section
    doc
      .fontSize(12)
      .text(`Invoice #: ${invoiceData.investmentId}`)
      .moveDown(0.5);

    doc
      .fontSize(12)
      .text(`Issued On: ${new Date().toLocaleDateString()}`, { align: "left" })
      .text(
        `Due On: ${new Date(invoiceData.maturityDate).toLocaleDateString()}`,
        {
          align: "right",
        }
      )
      .moveDown(2);

    // Sender & Receiver Information
    doc
      .fontSize(12)
      .text("From:", { underline: true, continued: true })
      .text("  Alliance FX Market")
      .text("  123 Investment Street")
      .text("  New York, NY 10001")
      .moveDown();

    doc
      .fontSize(12)
      .text("To:", { underline: true, continued: true })
      .text(`  ${invoiceData.fullName}`)
      .text(`  ${invoiceData.email}`)
      .text(`  ${invoiceData.phone || "N/A"}`)
      .moveDown(2);

    // Investment Plan Details - Styled as Table
    doc
      .fontSize(14)
      .text("Investment Details", { underline: true })
      .moveDown(0.5);

    doc
      .fontSize(12)
      .text(`Plan Name: ${invoiceData.planName}`)
      .text(`Investment Amount: $${invoiceData.amount.toLocaleString()}`)
      .text(`ROI: ${invoiceData.roi}%`)
      .text(`Expected Payout: $${invoiceData.expectedPayout.toLocaleString()}`)
      .moveDown(2);

    // Total Payout Section
    doc
      .fontSize(14)
      .fillColor("#222")
      .text("TOTAL PAYOUT", { align: "center", underline: true })
      .moveDown(0.5);

    doc
      .fontSize(16)
      .fillColor("#000")
      .text(`$${invoiceData.expectedPayout.toLocaleString()}`, {
        align: "center",
      })
      .fillColor("black")
      .moveDown(2);

    // Footer Message
    doc
      .fontSize(12)
      .fillColor("red")
      .text("Your account will be activated within the next 24 hours", {
        align: "center",
      })
      .fillColor("black");

    doc.end();

    writeStream.on("finish", () => {
      console.log("✅ Invoice generated successfully:", invoicePath);
      const invoiceUrl = `/invoices/${fileName}`;
      resolve({ invoicePath, invoiceUrl }); // Return both values
    });

    writeStream.on("error", (err) => {
      console.error("❌ Invoice PDF generation error:", err);
      reject(err);
    });
  });
};
