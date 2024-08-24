const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
// create user Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "enter a valid name"],
  },
  email: {
    type: String,
    required: [true, "enter a valid email address"],
    trim: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "{VALUE} is not a valid email"],
  },
  phone: {
    type: String,
    trim: true,
    unique: true,
    validate: [validator.isMobilePhone, "{VALUE} is not a valid phone number"],
  },
  password: {
    type: String,
    required: [true, "enter a valid password"],
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: [true, "confirm password"],
    trim: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match",
    },
    minLength: 8,
  },
  photo: {
    type: Object,
    default: {
      url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
      publicId: null,
    },
    required: [true, "Select a photo"],
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash password
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
  this.confirmPassword = await bcrypt.hash(this.confirmPassword, 10);
  this.confirmPassword = undefined;
});

const User = mongoose.model("User", userSchema);

module.exports = User;
