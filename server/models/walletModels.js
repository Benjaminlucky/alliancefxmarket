// models/walletModel.js
import mongoose from "mongoose";

const walletSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
      unique: true,
    },
    logo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true, // optional but useful to track createdAt and updatedAt
  }
);

// Use singular model name ("Wallet") and file name "walletModel.js"
const Wallet = mongoose.model("Wallet", walletSchema);
export default Wallet;
