const mongoose = require("mongoose");

const coursesSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  availableSeats: {
    type: Number,
  },
  price: {
    type: Number,
  },
  totalStudents: {
    type: Number,
  },
  desc: {
    type: String,
  },
  schedule: {
    type: String,
  },
  instructors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "instructors",
    },
  ],
});

const Courses = mongoose.model("courses", coursesSchema);
module.exports = Courses;
