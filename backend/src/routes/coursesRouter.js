const express = require("express");
const router = express.Router();
const coursesController = require("../controllers/coursesController");

router.post("/create-course", coursesController.createCourse);
router.get("/get-course", coursesController.getAllCourse);
router.get("/get-course/:id", coursesController.getACourse);
router.get("/search-course", coursesController.searchCourse);
router.put("/update-course/:id", coursesController.updateCourse);
router.delete("/delete-course/:id", coursesController.deleteCourse);
module.exports = router;
