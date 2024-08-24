const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const path = require("path");
const createToken = require("../utils/createToken");
const {
  cloudinaryUploadImage,
  cloudinaryRemoveImage,
} = require("../utils/cloudinary");

const signUp = async (req, res) => {
  try {
    // 1) check if the email is already exit
    const user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).json({ message: "Email already exists" });

    // 2) Validation
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    // 3) Upload To Cloudinary
    const imagePath = await path.join(
      __dirname,
      `../uploads/${req.file.filename}`
    );
    const result = await cloudinaryUploadImage(imagePath);

    const newUser = await new User(req.body);
    // 4)Delete Old Profile photo if exit
    if (newUser.photo.publicId !== null) {
      await cloudinaryRemoveImage(user.photo.publicId);
    }
    // 5) Change the ProfilePhoto in The DB
    newUser.photo = {
      url: result.secure_url,
      publicId: result.public_id,
    };

    // 6) Create a new user
    await newUser.save();

    // 7) Create a new Token
    const token = createToken(newUser._id);

    res
      .status(201)
      .json({ status: "User created successfully", user: newUser, token });

    // 8) Delete File From Uploads
    if (imagePath) {
      fs.unlinkSync(imagePath);
    }
  } catch (error) {
    const imagePath = path.join(__dirname, `../uploads/${req?.file?.filename}`);
    const errors = Object?.values(error.errors)?.map((err) => err.message);
    if (imagePath) {
      fs.unlinkSync(imagePath);
    }
    res.status(500).json({ status: "fail", message: errors });
    process.exit(1);
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    // console.log(user);
    if (!user) return res.status(404).json({ message: "User not found" });

    //1) Check if there headers authorization
    if (!req.header("Authorization")) {
      return res.status(401).json({ message: "Not authorized" });
    }

    //2) Check if token in headers authorization
    const token = await req.header("Authorization").split(" ")[1];

    if (!token) return res.status(401).json({ message: "Not authorized" });

    //3) Verify token
    const { data } = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    //4) Check if user still exists
    const currentUser = await User.findById(data);
    console.log(currentUser);
    if (!currentUser)
      return res.status(401).json({ message: "Not authorized" });

    //5) compare password with current user
    const password = await bcrypt.compare(
      req.body.password,
      currentUser.password
    );

    if (!password)
      return res.status(401).json({ message: "Password Not Correct" });

    //6) Return user and token
    res.json({
      status: "Logged in successfully",
      user: currentUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  signUp,
  login,
};
