const Courses = require("../model/coursesModel");
const { uploadImage } = require("../uploadImage/uploadImages");
const coursesController = {
  createCourse: async (req, res) => {
    try {
      const {
        availableSeats,
        price,
        totalStudents,
        image,
        name,
        desc,
        schedule,
      } = req.body;

      const uploadedImage = await uploadImage(image);
      // if (!name || !availableSeats || !price || !totalStudents || !desc) {
      //   return res.status(400).json({
      //     success: false,
      //     message: "Vui lòng không để trống.",
      //   });
      // }
      const courseName = await Courses.findOne({
        name: { $regex: new RegExp(`^${name}$`, "i") },
      });
      if (courseName) {
        return res
          .status(409)
          .json({ success: false, message: "Lớp học đã tồn tại" });
      }

      const response = await Courses.create({
        image: uploadedImage.secure_url,
        name: name,
        availableSeats: availableSeats,
        price: price,
        totalStudents: totalStudents,
        desc: desc,
        schedule: schedule,
      });
      return res.status(200).json({ success: true, message: response });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error creating class" });
    }
  },
  getAllCourse: async (req, res) => {
    try {
      const courseName = await Courses.find({});
      if (!courseName) {
        return res
          .status(404)
          .json({ success: false, message: "Course not found" });
      }
      return res.status(200).json({ success: true, data: courseName });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error" });
    }
  },
  getACourse: async (req, res) => {
    try {
      const courseName = await Courses.findById(req.params.id).populate(
        "instructors"
      );
      return res.status(200).json({ success: true, data: courseName });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error" });
    }
  },
  searchCourse: async (req, res) => {
    try {
      const result = await Courses.aggregate([
        [
          {
            $search: {
              index: "search-text",
              text: {
                query: req.query.key,
                path: {
                  wildcard: "*",
                },
              },
            },
          },
        ],
      ]);
      if (!result) {
        return res.status(404).json({ success: false, message: "Not found" });
      }
      return res.status(200).json({ success: true, message: result });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error searching" });
    }
  },

  updateCourse: async (req, res) => {
    try {
      const course = await Courses.findByIdAndUpdate(req.params.id, req.body);
      if (!course) {
        return res
          .status(404)
          .json({ success: false, message: "course not found" });
      }
      return res.status(200).json({ success: true, message: "Course updated" });
    } catch (error) {
      console.log("🚀 ~ updateCourse: ~ error:", error);
      return res
        .status(500)
        .json({ success: false, message: "Error updating" });
    }
  },
  deleteCourse: async (req, res) => {
    try {
      const course = await Courses.findByIdAndDelete(req.params.id);
      if (!course) {
        return res
          .status(404)
          .json({ success: false, message: "course not found" });
      }
      return res.status(200).json({ success: true, message: "Course deleted" });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Error deleting" });
    }
  },
};

module.exports = coursesController;
