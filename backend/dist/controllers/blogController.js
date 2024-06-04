const Blog = require("../model/blogModel");
const { uploadImage } = require("../uploadImage/uploadImages");
const blogController = {
  createBlog: async (req, res) => {
    try {
      const { title, content, author, image } = req.body;
      // const image = req.files.image;
      // console.log(image);
      if (!title || !content || !author) {
        return res.status(404).json({
          success: false,
          message: "Please enter a title, content or author",
        });
      }
      const img = await uploadImage(image);
      // console.log(img?.secure_url);
      // console.log(img.secure_url);
      // console.log(img?.public_id);
      const response = await Blog.create({
        image: {
          blogUrl: img.secure_url,
          public_id: img.public_id,
        },
        title: title,
        content: content,
        author: author,
      });
      return res.status(200).json({ success: true, message: response });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error creating blog" });
    }
  },
  getAllBlog: async (req, res) => {
    try {
      const blog = await Blog.find().sort({ $natural: -1 });
      return res.status(200).json({ success: true, data: blog });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "error get all blog" });
    }
  },
  getBlogDetail: async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) {
        return res
          .status(404)
          .json({ success: false, message: "blog not found" });
      }
      return res.status(200).json({ success: true, data: blog });
    } catch (error) {
      console.log("🚀 ~ getBlogDetail: ~ error:", error);
      return res
        .status(500)
        .json({ success: false, message: "error get blog" });
    }
  },
};

module.exports = blogController;
