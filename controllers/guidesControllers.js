const Guide = require("../models/guidesModel");

const addGuide = async (req, res) => {
  const newGuide = Guide.create(req.body);
  res.status(201).json({ status: "success", data: newGuide });
};

module.exports = { addGuide };
