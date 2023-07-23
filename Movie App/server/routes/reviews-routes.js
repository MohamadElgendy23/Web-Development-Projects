const express = require("express");
const reviewsRoutes = express();
const Reviews = require("../models/review-model");

//gets all reviews for a particular movie
reviewsRoutes.get("/movie/:id", async (req, res) => {
  try {
    const movieId = req.params.id;
    const filteredReviewsCursor = await Reviews.find({ movieId: movieId });
    const filteredReviews = filteredReviewsCursor?.toArray();
    if (!filteredReviews.length) {
      return res
        .status(404)
        .json({ errorMessage: `No reviews for movie with id ${movieId}` });
    }
    res.status(200).json(filteredReviews);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//create new review
reviewsRoutes.post("/new", async (req, res) => {
  try {
    const { movieId, user, content } = req.body;
    const newReview = res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = reviewsRoutes;
