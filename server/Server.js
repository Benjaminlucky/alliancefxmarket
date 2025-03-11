import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path"; // ✅ Import path module
import { fileURLToPath } from "url"; // ✅ Required for __dirname in ES modules
import userRoutes from "./routes/userRoutes.js";
import getCryptoPrice from "./controllers/cryptoPrices.js";
import adminRoutes from "./routes/adminRoutes.js";
import fetchUsersRoutes from "./routes/fetchUsers.routes.js";
import investmentRoutes from "./routes/investmentRoutes.js";
import planRoutes from "./routes/fetchPlanroutes.js";

// Define __dirname manually for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load the appropriate .env file based on the environment
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config();
}

const app = express();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log(err.message));

const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://alliancefxmarket.netlify.app", // Production frontend
];

// CORS setup
app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: "Authorization,Content-Type",
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// Middleware to parse incoming requests
app.use(express.json());

// Serve static files (e.g., images)
app.use("/uploads", express.static("uploads"));

// Root route
app.get("/", (req, res) => res.send("Welcome to the server!"));

// Use the routes
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/admin", investmentRoutes);
app.use("/user", fetchUsersRoutes);
app.use("/user", investmentRoutes);

app.get("/crypto-price", getCryptoPrice);

// ✅ Serve invoices from the "public/invoices" directory
app.use(
  "/invoices",
  express.static(path.join(__dirname, "public", "invoices"))
);

// ✅ Fix: Make sure Express serves invoices from the correct folder
app.use("/invoices", express.static(path.join(__dirname, "invoices")));
app.use(
  "/invoices",
  express.static(path.join(__dirname, "server", "invoices"))
);

// Use the plan routes
app.use("/user", planRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
