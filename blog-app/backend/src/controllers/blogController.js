import Blog from "../models/Blog";

// createBlog controller
const createBlog = async (req, res) => {
  const { title, content, tags } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required" });
  }

  try {
    const blog = new Blog({
      title,
      content,
      tags,
      author: req.user._id,
    });

    await blog.save();
    res.status(201).json({ blog });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// getBlogs controller
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.json({ blogs });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// deleteBlog controller
const deleteBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // check ownership
    if (blog.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: "You are not allowed to delete" });
    }

    await blog.remove();
    res.json({ message: "Blog deleted" });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

export default { createBlog, getBlogs, deleteBlog };
// export default { createBlog, getBlogs, deleteBlog };