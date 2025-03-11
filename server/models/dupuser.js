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
    amountInvested: { type: Number, default: 0 },
    durationMonths: { type: Number, default: 0 },
    expectedReturns: { type: Number, default: 0 },
    totalPayout: { type: Number },
    maturityDate: { type: Date },
    status: {
      type: String,
      enum: ["Active", "Completed", "Cancelled"],
      default: "Active",
    },
    isVerified: { type: Boolean, default: false },
    verificationToken: { type: String }, // Store the token for email verification
    profileImage: {
      type: String,
      default: "https://untitledui.com/images/avatars/natali-craig",
    },
    resetPasswordToken: { type: String }, // Token for password reset
    resetPasswordExpires: { type: Date }, // Expiration time for the token
  },
  { timestamps: true } // Enable timestamps
);

export default mongoose.model("User", userSchema);
