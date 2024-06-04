const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    username: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    dateofbirth: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const userName = mongoose.model("users", userSchema);
module.exports = userName;
