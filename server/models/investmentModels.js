import mongoose from "mongoose";

// declare schema for investment

const investmentPlansSchema = new mongoose.Schema(
  {
    planName: { type: String, required: true },
    minimumDeposit: { type: Number, required: true },
    minimumDuration: { type: Number, required: true },
    minimumReturns: { type: Number, required: true },
    features: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("investmentPlan", investmentPlansSchema);
