const mongoose = require("mongoose");

const guideSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "lead-guide", "guide", "user"],
    default: "user",
  },
  photo: { type: String, required: true },
  active: {
    type: Boolean,
    default: true,
  },
  tour: {
    type: String,
  },
});

const Guide = mongoose.model("Guide", guideSchema);

module.exports = Guide;
