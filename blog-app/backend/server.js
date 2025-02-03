import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/auth.js";
import blogRoutes from "./src/routes/blogs.js";
import adminRoutes from "./src/routes/admin.js";
// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter)

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/admin", adminRoutes);

// Error handling for undefined routes
// 404 Route Handling
app.use((req, res) => res.status(404).json({ message: "Route not found" }));

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Something went wrong, please try again" });
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("Shutting down gracefully...");
  process.exit();
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
