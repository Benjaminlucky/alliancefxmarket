import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    country: { type: String, required: false },
    password: { type: String, required: true },
    planId: { type: mongoose.Schema.Types.ObjectId, ref: "investmentPlan" },
    planName: { type: String },
    amountInvested: { type: Number, default: 0 },
    durationDays: { type: Number, default: 0 }, // Store duration in days
    durationMonths: { type: Number, default: 0 }, // Store months for calculations
    expectedReturns: { type: Number, default: 0 },
    totalPayout: { type: Number },
    investmentDate: { type: Date, default: Date.now }, // Set when activated
    returnPercentage: Number, // <-- Add this
    maturityDate: { type: Date },
    status: {
      type: String,
      enum: ["Active", "Completed", "Cancelled"],
      default: "Active",
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String },
    profileImage: {
      type: String,
      default: "https://untitledui.com/images/avatars/natali-craig",
    },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
