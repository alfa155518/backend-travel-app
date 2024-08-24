const mongoose = require("mongoose");
const express = require("express");
const app = express();
const cors = require("cors");

// env file
require("dotenv").config();

app.use(cors());

const authRoute = require("./routes/authenticationsRoutes");
const userRoute = require("./routes/usersRoutes");
const tourRoute = require("./routes/tourRoutes");
const guideRoute = require("./routes/guidesRoutes");
const reviewRoute = require("./routes/reviewsRoute");

app.use(express.json());
mongoose.connect(process.env.DATA_BASE).then(() => {
  console.log("Database Connected");
});

app.use("/api/v1/users", authRoute);
app.use("/api/v1/users", userRoute);
app.use("/api/v1/tours", tourRoute);
app.use("/api/v1/guide", guideRoute);
app.use("/api/v1/reviews", reviewRoute);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
