const express = require("express");
const router = express.Router();
const instructorsController = require("../controllers/instructorsController");

router.post("/create-instructor", instructorsController.createInstructors);
router.get("/get-instructor", instructorsController.getAllInstructors);
router.get("/get-instructor/:id", instructorsController.getAnInstructor);
router.put("/update-instructor/:id", instructorsController.updateInstructor);
router.delete("/delete-instructor/:id", instructorsController.deleteInstructor);
module.exports = router;
