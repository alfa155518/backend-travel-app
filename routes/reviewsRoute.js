const express = require("express");
const router = express.Router();
const reviewControllers = require("../controllers/reviewsControllers");

router.post("/", reviewControllers.addReview);
module.exports = router;
