import User from "../models/User.js";

export const fetchUsers = async (req, res) => {
  try {
    // Get the page and limit values from the query string, with defaults
    const page = parseInt(req.query.page) || 1; // Default to page 1 if not specified
    const limit = parseInt(req.query.limit) || 50; // Default to 50 users per page if not specified

    // Calculate the number of users to skip based on the page
    const skip = (page - 1) * limit;

    // Fetch the users with pagination
    const users = await User.find().skip(skip).limit(limit);

    // Count the total number of users for pagination info
    const totalUsers = await User.countDocuments();

    // Calculate total number of pages
    const totalPages = Math.ceil(totalUsers / limit);

    // Return paginated users data
    return res.status(200).json({
      users,
      totalUsers,
      totalPages,
      currentPage: page,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "server error", error: error.message });
  }
};
