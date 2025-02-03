import express from "express";
import { protect, admin } from "../middleware/auth.js";
import User from "../models/User.js";
import Blog from "../models/Blog.js";

const router = express.Router();

// @desc    Delete any user (Admin only)
router.delete("/user/:id", protect, admin, async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await user.remove();
    res.json({ message: "User removed" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
});

export default router;
