const express = require("express");

const router = express.Router();

const guidesControllers = require("../controllers/guidesControllers");

router.post("/", guidesControllers.addGuide);

module.exports = router;
