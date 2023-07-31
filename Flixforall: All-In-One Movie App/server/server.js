require("dotenv").config();

const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const reviewsRoutes = require("./routes/reviews-routes");
const path = require("path");

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGODB_CONN_STRING).then(() => {
  console.log("Database is up and running");
});

app.use("/api/reviews", reviewsRoutes);
app.use("*", (req, res) => {
  res
    .status(404)
    .sendFile(path.join(__dirname, "./response-pages/404-page/404-page.html"));
});

app.listen(4000, () => {
  console.log("Server listening on port 4000");
});
