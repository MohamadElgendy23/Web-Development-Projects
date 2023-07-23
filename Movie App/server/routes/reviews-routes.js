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
    const newReview = new Reviews(req.body);
    await newReview.save();
    res.status(201).json(newReview);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//get a specific review
reviewsRoutes.get("/:id", (req, res) => {
  try {
    const reviewId = req.params.id;
    const findReview = Reviews.findOne({ _id: reviewId });
    if (!findReview) {
      return res
        .status(404)
        .json({ errorMessage: `Review with id ${reviewId} not found` });
    }
    res.status(200).json(findReview);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//update a specific review
reviewsRoutes.put("/:id", (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//delete a specific review
reviewsRoutes.delete("/:id", (req, res) => {});

module.exports = reviewsRoutes;
