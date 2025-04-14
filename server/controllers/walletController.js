// controllers/walletController.js
import walletModels from "../models/walletModels.js";

export const getWallets = async (req, res) => {
  try {
    const wallets = await walletModels.find();
    // console.log(wallets); // Optional: remove in production
    res.json({ wallets }); // ✅ wrapped inside an object
  } catch (err) {
    console.error(err); // 👈 Always good to log errors
    res.status(500).json({ message: "Error fetching wallets." });
  }
};

export const updateWallet = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, address, logo } = req.body;
    console.log(req.body); // Optional: remove in production

    const updated = await walletModels.findByIdAndUpdate(
      id,
      { name, address, logo },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Error updating wallet." });
  }
};

// controllers/walletController.js
export const deleteWallet = async (req, res) => {
  const { id } = req.params;
  console.log(id); // Optional: remove in production
  try {
    const wallet = await walletModels.findByIdAndDelete(id);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }
    res.status(200).json({ message: "Wallet deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// controllers/walletController.js

export const addWallet = async (req, res) => {
  try {
    const { name, address, logo } = req.body;
    console.log(req.body); // Optional: remove in production

    const existing = await walletModels.findOne({ address });
    if (existing) {
      return res.status(400).json({ message: "Wallet already exists" });
    }

    const wallet = await walletModels.create({ name, address, logo });
    res.status(201).json({ message: "Wallet added", wallet });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
