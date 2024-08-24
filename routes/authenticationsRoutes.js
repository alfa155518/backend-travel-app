const express = require("express");
const router = express.Router();

const authController = require("../controllers/authControllers");
const uploadUserPhoto = require("../middlewares/uploadPhoto");

router.post("/signUp", uploadUserPhoto, authController.signUp);
router.post("/login", authController.login);

module.exports = router;
