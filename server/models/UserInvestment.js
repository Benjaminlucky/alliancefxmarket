import mongoose from "mongoose";

const UserInvestmentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  planName: { type: String, required: true },
  amount: { type: Number, required: true },
  roi: { type: Number, required: true }, // ROI percentage (e.g., 10 for 10%)
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

// ✅ Auto-calculate expectedPayout before saving
UserInvestmentSchema.pre("save", function (next) {
  if (this.startDate && this.maturityDate) {
    const durationInMonths = Math.ceil(
      (this.maturityDate - this.startDate) / (1000 * 60 * 60 * 24 * 30)
    ); // Convert time difference to months
    this.expectedPayout =
      this.amount + (this.amount * this.roi * durationInMonths) / 100;
  }
  next();
});

// ✅ Auto-update expectedPayout if amount, ROI, or maturityDate changes
UserInvestmentSchema.pre("findOneAndUpdate", function (next) {
  const update = this.getUpdate();

  if (update.amount || update.roi || update.maturityDate) {
    const startDate =
      update.startDate || this.getQuery().startDate || new Date();
    const maturityDate = new Date(
      update.maturityDate || this.getQuery().maturityDate
    );

    const durationInMonths = Math.ceil(
      (maturityDate - startDate) / (1000 * 60 * 60 * 24 * 30)
    );

    update.expectedPayout =
      update.amount + (update.amount * update.roi * durationInMonths) / 100;
  }
  next();
});

export default mongoose.model("UserInvestment", UserInvestmentSchema);
