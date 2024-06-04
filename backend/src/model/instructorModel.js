const mongoose = require("mongoose");

const instructorsSchema = new mongoose.Schema({
  image: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  courses: [
    {
      type: String,
      ref: "courses",
    },
  ],
});

const Instructors = mongoose.model("instructors", instructorsSchema);
module.exports = Instructors;
