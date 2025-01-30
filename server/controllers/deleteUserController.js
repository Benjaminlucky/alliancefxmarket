//Import the user model
import User from "../models/User.js";

//Controller to delete a user by ID

export const deleteUser = async (req, res) => {
  const { id } = req.params; //Extract the user ID from the request params

  try {
    //Check if the user exist in the database
    const user = await User.findById(id);

    //If the user does not exist, return a 404 status code
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    //If the user exist, delete the user from the database
    await User.findByIdAndDelete(id);

    return res
      .status(200)
      .json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({
      success: false,
      message: "An error occurred while deleting user",
    });
  }
};
