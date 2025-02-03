import User from "../models/User.js";

const updateUser = async (req, res) => {
  const userId = req.params.id; // get the user id from the request

  // get the new user data from the request body
  const { fullName, email, phone, avatar } = req.body;

  try {
    // find the user by their ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.fullName = fullName || user.fullName;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.avatar = avatar || user.avatar;

    //save the updated user back to the database
    const updateUser = await user.save();
    // Send the updated user data as a response
    return res
      .status(200)
      .json({ message: "User updated successfully", user: updateUser });
  } catch (error) {
    console.log("Error: ", error.message);
    return res
      .status(500)
      .json({ message: "Error updating user. Please try again" });
  }
};

export default updateUser;
