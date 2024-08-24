const User = require("../models/userModel");
const allUsers = async (req, res) => {
  try {
    const users = await User.find().select("-__v").select("-password");
    res.status(200).json({ status: "success", users });
  } catch (err) {
    res.status(500).json({ status: "fail", msg: "Server Error" });
  }
};

module.exports = {
  allUsers,
};
