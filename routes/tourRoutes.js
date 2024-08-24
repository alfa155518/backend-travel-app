const express = require("express");
const router = express.Router();

const tourControllers = require("../controllers/tourControllers");

router.post("/", tourControllers.addTour);
router.get("/:id", tourControllers.getTour);
router.get("/", tourControllers.allTours);

module.exports = router;
