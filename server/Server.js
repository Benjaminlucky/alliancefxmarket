import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js"; // Ensure correct import
import getCryptoPrice from "./controllers/cryptoPrices.js";
import adminRoutes from "./routes/adminRoutes.js";

// Load the appropriate .env file based on the environment
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config(); // Defaults to .env for development
}

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log(err.message);
  });

const allowedOrigins = [
  "http://localhost:5173", // For local development
  "https://alliancefxmarket.netlify.app", // Production frontend
];

// CORS setup
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // Ensure OPTIONS is allowed
    allowedHeaders: "Authorization,Content-Type",
    credentials: true,
  })
);

// Handle preflight requests manually (optional but helps ensure correctness)
app.options(
  "*",
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: "Authorization,Content-Type",
  })
);

// Middleware to parse incoming requests
app.use(express.json());

// Serve static files (images, etc.) from the 'uploads' folder
app.use("/uploads", express.static("uploads"));

// Root route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the server!");
});

// Use the user routes
app.use("/user", userRoutes); // Ensure the user route is mounted correctly
app.use("/admin", adminRoutes); // Admin Routes

app.get("/crypto-price", getCryptoPrice);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
