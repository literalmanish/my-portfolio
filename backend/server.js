require("dotenv").config();

const express = require("express");
const cors = require("cors");
const connectDB = require("./db");
const Blog = require("./modules/Blog");
const app = express();

const PORT = 5000;

connectDB();


// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
    res.send("Portfolio Backend is Running!");
});

// Test API
app.get("/api/test", (req, res) => {
    res.json({
        success: true,
        message: "API is working!"
    });
});

// Blogs API
app.get("/api/blogs", async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.json(blogs);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch blogs"
        });
    }
});
// Get a single blog
app.get("/api/blogs/:id", async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);

        if (!blog) {
            return res.status(404).json({
                message: "Blog not found"
            });
        }

        res.json(blog);
    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch blog"
        });
    }
});
// Add a new blog
app.post("/api/blogs", async (req, res) => {
    try {
        const { title, description, content, date } = req.body;
        const newBlog = new Blog({
    title,
    description,
    content,
    date
});

        const savedBlog = await newBlog.save();

        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({
            message: "Failed to create blog"
        });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});