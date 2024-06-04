const mongoose = require("mongoose");
require("dotenv").config();
const dbState = [
  {
    value: 0,
    label: "disconnected",
  },

  {
    value: 1,
    label: "connected",
  },

  {
    value: 0,
    label: "connecting",
  },

  {
    value: 0,
    label: "disconnecting",
  },
];

// connect database
const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    const state = Number(mongoose.connection.readyState);
    console.log(dbState.find((f) => f.value === state).label, "to DB");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connection;
