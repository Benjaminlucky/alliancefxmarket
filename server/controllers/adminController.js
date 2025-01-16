import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";

// Admin Registration

export const registerAdmin = async (req, res) => {
  const { fullName, email, password } = req.body;

  // Validate required fields

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Check if admin already exist
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new admin
    const newAdmin = new Admin({
      fullName,
      email,
      password: hashedPassword,
    });
    await newAdmin.save();
    res
      .status(201)
      .json({ message: "Admin registered sucessfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
