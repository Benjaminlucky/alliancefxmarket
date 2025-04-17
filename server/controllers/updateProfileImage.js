import User from "../models/User.js";

export const updateProfileImage = async (req, res) => {
  try {
    const userId = req.user._id; // ← Fix here
    const { profileImage } = req.body;

    if (!profileImage) {
      return res.status(400).json({ message: "Profile image required." });
    }

    const user = await User.findByIdAndUpdate(
      userId,
      { profileImage },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({
      message: "Profile image updated successfully",
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error("Error updating profile image:", error);
    res.status(500).json({ message: "Server error" });
  }
};
