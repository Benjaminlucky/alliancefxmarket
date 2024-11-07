import User from "../models/User.js"; // Use `import` for ES Modules

const registerUser = async (req, res) => {
  const { fullName, username, email, phone, country, password } = req.body;

  console.log("Request body:", req.body); // Log to verify received data

  try {
    const newUser = new User({
      fullName,
      username,
      email,
      phone,
      country,
      password,
    });

    await newUser.save();
    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Registration error:", error); // Log the error
    return res.status(500).json({ error: "Failed to register user" });
  }
};

export default registerUser; // Use `export default` for ES Modules
