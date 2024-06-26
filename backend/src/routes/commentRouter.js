const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");

router.post("/create-comment", commentController.createComment);
router.get("/get-comments", commentController.getAllComments);
module.exports = router;
