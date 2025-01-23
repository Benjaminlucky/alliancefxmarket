import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";
import jwt from "jsonwebtoken";

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

export const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const adminExist = await Admin.findOne({ email });
    if (!adminExist) {
      return res.status(400).json({ message: "Admin does not exist" });
    }

    const validPassword = await bcrypt.compare(password, adminExist.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: adminExist._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Admin logged in successfully",
      success: true,
      user_id: adminExist._id,
      admin_fullname: adminExist.fullName,
      admin_email: adminExist.email,
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
