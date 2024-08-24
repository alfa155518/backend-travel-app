const Tour = require("../models/tourModel");

const addTour = async (req, res) => {
  const tour = Tour.create(req.body);
  res.status(201).json({ status: "success", data: tour });
};

// get single tour
const getTour = async (req, res) => {
  try {
    const tourId = await req.params.id;
    const tour = await Tour.findById(tourId)
      .populate({
        path: "guides",
        select: "-__v",
      })
      .populate({
        path: "reviews",
        select: "-__v",
      });
      
    if (!tour)
      return res.status(404).json({ status: "fail", msg: "Tour not found" });

    res.status(200).json({ status: "success", data: tour });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "fail", msg: "Server Error" });
  }
};

const allTours = async (req, res) => {
  try {
    const { limit, page } = await req.query;

    const skip = (page - 1) * limit;

    const tours = await Tour.find({}, "-__v").limit(limit).skip(skip);

    res
      .status(200)
      .json({ status: "success", result: tours.length, data: tours });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "fail", msg: "Server Error" });
  }
};

module.exports = {
  addTour,
  getTour,
  allTours,
};
