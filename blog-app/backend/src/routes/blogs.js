import express from 'express';
import { protect } from '../middleware/auth';
import { createBlog, deleteBlog, getBlogs } from '../controllers/blogController';

const router = express.Router();

router.post('/create', protect, createBlog);
router.get('/', getBlogs);
router.delete('/:id', protect, deleteBlog);


export default router;