const express = require("express");
const reviewsRoutes = express();

reviewsRoutes.get("/:id", (req, res) => {
  res.status(200).json("Hello There");
});

reviewsRoutes.get("/", (req, res) => {
  res.status(200).json("Hello There");
});

module.exports = reviewsRoutes;
