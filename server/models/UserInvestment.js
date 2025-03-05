import mongoose from "mongoose";

const UserInvestment = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planName: { type: String, required: true },
  amount: { type: Number, required: true },
  roi: { type: Number, required: true },
  startDate: { type: Date, default: Date.now },
  maturityDate: { type: Date, required: true },
  expectedPayout: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  invoiceUrl: { type: String }, // Store path to generated invoice
});

export default mongoose.model("UserInvestment", UserInvestment);
