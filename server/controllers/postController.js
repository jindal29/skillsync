const Post = require('../models/Post');

// Get all posts with pagination
const getPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const posts = await Post.find()
            .populate('author', 'name')
            .sort({ createdAt: -1 })
            .limit(limit * 1)
            .skip((page - 1) * limit);

        const count = await Post.countDocuments();

        res.json({
            posts,
            totalPages: Math.ceil(count / limit),
            currentPage: Number(page),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Create a new post
const createPost = async (req, res) => {
    try {
        const { title, content, tags } = req.body;
        const post = new Post({
            title,
            content,
            tags,
            author: req.user._id,
        });

        const createdPost = await post.save();
        res.status(201).json(createdPost);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

// Like a post
const likePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        if (post.likes.includes(req.user._id)) {
            return res.status(400).json({ message: 'Post already liked' });
        }

        post.likes.push(req.user._id);
        await post.save();
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = { getPosts, createPost, likePost };
