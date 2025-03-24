import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Middleware to authenticate the user by verifying JWT token
export const authenticateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; // ✅ Corrected header handling
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "Access token is required." });
    }

    const token = authHeader.split(" ")[1]; // Extract token from "Bearer <token>"

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token

    // Find the user by ID
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    req.user = user; // Attach user to request object
    next();
  } catch (error) {
    console.error("❌ Authentication Error:", error.message);
    return res.status(403).json({ error: "Invalid or expired token." });
  }
};
