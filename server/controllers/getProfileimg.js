// userController.js
import User from "../models/User.js"; // assuming you are using Mongoose for user model

// Function to get user's profile image

// Function to get all user data
export const getUserProfile = async (req, res) => {
  try {
    const userId = req.user.id; // Assuming you have user ID from authentication middleware
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send all user data
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
