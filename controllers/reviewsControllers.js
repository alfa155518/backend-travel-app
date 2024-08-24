const Reviews = require("../models/reviewsModel");

// Add a new review

const addReview = async (req, res) => {
  try {
    const newReview = await Reviews.create(req.body);
    res.status(201).json({
      success: true,
      message: "Review added successfully",
      review: newReview,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = {
  addReview,
};
