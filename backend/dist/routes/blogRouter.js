const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.post("/create-blog", blogController.createBlog);
router.get("/get-blogs", blogController.getAllBlog);
router.get("/get-blog/:id", blogController.getBlogDetail);
module.exports = router;
