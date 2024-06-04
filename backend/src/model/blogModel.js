const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    image: {
      blogUrl: {
        type: String,
        default: null,
      },

      public_id: { type: String, default: null },
    },
    title: {
      type: String,
      // required: true,
    },

    content: {
      type: String,
      // required: true,
    },

    author: {
      type: String,
      // required: true,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("blog", blogSchema);
module.exports = Blog;
