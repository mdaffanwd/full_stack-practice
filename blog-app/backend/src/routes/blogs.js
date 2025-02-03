import express from "express";
import { protect } from "../middleware/auth.js";
import {
  createBlog,
  deleteBlog,
  getBlogs,
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/create", protect, createBlog);
router.post("/", protect, createBlog);
router.get("/", getBlogs);
router.delete("/:id", protect, deleteBlog);

export default router;
