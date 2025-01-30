import mongoose from 'mongoose'

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxLength: 200
    },
    content: {
        type: String,
        required: true,
        trim: true,
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: {
        type: [String],
        default: [],
        required: true,
    },
    thumbnail: {
        type: String,
        required: true,
    },
}, { timestamps: true })

const Blog = mongoose.model('Blog', blogSchema) 

export default Blog;