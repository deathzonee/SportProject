const Instructors = require("../model/instructorModel");
const Courses = require("../model/coursesModel");
const { uploadImage } = require("../uploadImage/uploadImages");
const InstructorsController = {
  createInstructors: async (req, res) => {
    try {
      const { image, name, courses } = req.body;
      const uploadedImage = await uploadImage(image);
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Please fill in the blank field.",
        });
      }
      const instructor = await Instructors.create({
        image: uploadedImage.secure_url,
        name: name,
      });

      if (courses) {
        const course = await Courses.findOne({
          name: { $regex: new RegExp(`^${courses}$`, "i") },
        });
        if (!course) {
          return res
            .status(404)
            .json({ success: false, message: "Course not found" });
        }
        await course.updateOne({ $push: { instructors: instructor._id } });
        instructor.courses = course._id;
        await instructor.save();
      }
      return res.status(200).json({ success: true, message: instructor });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Error creating instructor",
      });
    }
  },
  getAllInstructors: async (req, res) => {
    try {
      const instructor = await Instructors.find({});
      return res.status(200).json({ success: true, message: instructor });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error" });
    }
  },
  getAnInstructor: async (req, res) => {
    try {
      const instructor = await Instructors.findById(req.params.id).populate(
        "courses"
      );
      return res.status(200).json({ success: true, message: instructor });
    } catch (error) {
      console.log("🚀 ~ getAnInstructor: ~ error:", error);
      return res.status(500).json({ success: false, message: "Error" });
    }
  },
  updateInstructor: async (req, res) => {
    try {
      const instructor = await Instructors.findByIdAndUpdate(
        req.params.id,
        req.body
      );

      if (!instructor) {
        return res
          .status(404)
          .json({ success: false, message: "Instructor not found" });
      }

      // Find the old course and remove the instructor's id
      const oldCourse = await Courses.findOne({
        _id: { $in: instructor.courses },
      });

      if (oldCourse) {
        oldCourse.instructors.pull(instructor._id);
        await oldCourse.save();
      }

      // Find the new course and add the instructor's id
      const newCourse = await Courses.findOne({
        name: { $regex: new RegExp(`^${req.body.courses}$`, "i") },
      });

      if (newCourse) {
        newCourse.instructors.push(instructor._id);
        await newCourse.save();
        instructor.courses.pull(oldCourse._id);
        instructor.courses.push(newCourse._id);
        await instructor.save();
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Course not found" });
      }

      return res
        .status(200)
        .json({ success: true, message: "Instructor and course updated" });
    } catch (error) {
      console.log("🚀 ~ updateInstructor: ~ error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Error updating" });
    }
  },
  deleteInstructor: async (req, res) => {
    try {
      const instructor = await Instructors.findByIdAndDelete(req.params.id);
      if (!instructor) {
        return res
          .status(404)
          .json({ success: false, message: "Instructor not found" });
      }
      await Courses.updateMany(
        { instructors: req.params.id },
        { $pull: { instructors: req.params.id } }
      );
      return res
        .status(200)
        .json({ success: true, message: "Instructor deleted" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "error delete instructor" });
    }
  },
};

module.exports = InstructorsController;
