const Comment = require("../model/commentModel");

const commentController = {
  createComment: async (req, res) => {
    try {
      const { name, email, comment } = req.body;
      if (!name || !email || !comment) {
        return res.status(404).json({
          success: false,
          message: "Please enter a name, email or comment",
        });
      }
      const response = await Comment.create({
        image: req.body.image,
        name: name,
        email: email,
        comment: comment,
      });
      return res.status(200).json({ success: true, message: response });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error creating comment" });
    }
  },

  getAllComments: async (req, res) => {
    try {
      const comments = await Comment.find();
      return res.status(200).json({ success: true, data: comments });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error" });
    }
  },
};

module.exports = commentController;
