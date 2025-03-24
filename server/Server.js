import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import fetchUsersRoutes from "./routes/fetchUsers.routes.js";
import investmentRoutes from "./routes/investmentRoutes.js";
import planRoutes from "./routes/fetchPlanroutes.js";
import getCryptoPrice from "./controllers/cryptoPrices.js";
import authMiddleware from "./middlewares/authMiddleware.js"; // ✅ Authentication middleware

// Define __dirname for ES module compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config();
}

const app = express();

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO)
  .then(() => console.log("✅ Database connected"))
  .catch((err) => console.error("❌ Database connection error:", err.message));

// ✅ CORS Setup
const allowedOrigins = [
  "http://localhost:5173", // Local development
  "https://alliancefxmarket.netlify.app", // Production frontend
];

app.options("*", cors()); // Handle preflight requests

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
    exposedHeaders: ["Authorization"],
    credentials: true,
  })
);

// ✅ Middleware
app.use(express.json());

// ✅ Debugging Middleware (Logs headers for debugging authentication issues)
app.use((req, res, next) => {
  console.log("🔍 Request Headers:", req.headers);
  next();
});

// ✅ Serve Static Files
app.use("/uploads", express.static("uploads"));
app.use(
  "/invoices",
  express.static(path.join(__dirname, "public", "invoices"))
);

// ✅ Routes
app.get("/", (req, res) => res.send("🚀 Welcome to the server!"));

// ✅ Protect user and admin routes using authentication middleware
app.use("/user", authMiddleware, userRoutes);
app.use("/user", authMiddleware, fetchUsersRoutes);
app.use("/user", authMiddleware, investmentRoutes);
app.use("/user", authMiddleware, planRoutes);

app.use("/admin", authMiddleware, adminRoutes);
app.use("/admin", authMiddleware, investmentRoutes);

app.get("/crypto-price", getCryptoPrice);

// ✅ Start the Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server is running on port ${PORT}`));
