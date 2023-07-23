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
    await newReview?.save();
    res.status(201).json({ successMessage: "Created review successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//get a specific review
reviewsRoutes.get("/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const foundReview = await Reviews.findOne({ _id: reviewId });
    if (!foundReview) {
      return res
        .status(404)
        .json({ errorMessage: `Review with id ${reviewId} not found` });
    }
    res.status(200).json(foundReview);
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//update a specific review
reviewsRoutes.put("/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { user, content } = req.body;
    const foundReview = await Reviews.findOne({ _id: reviewId });
    if (!foundReview) {
      return res
        .status(404)
        .json({ errorMessage: `Review with id ${reviewId} not found` });
    }
    //could also just do Reviews.findOne(id, user)
    if (foundReview.user !== user) {
      return res.status(404).json({
        errorMessage: "This user does not own this review. Cannot update.",
      });
    }
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

//delete a specific review
reviewsRoutes.delete("/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;
    const { user } = req.body;
    const foundReview = Reviews.findOne({ _id: reviewId });
    if (!foundReview) {
      return res
        .status(404)
        .json({ errorMessage: `Review with id ${reviewId} not found` });
    }
    if (foundReview.user !== user) {
      return res.status(404).json({
        errorMessage: "This user does not own this review. Cannot delete.",
      });
    }
    await Reviews.deleteOne({ _id: reviewId });
    await Reviews.save();
    res.status(200).json({ successMessage: "Deleted review successfully!" });
  } catch (error) {
    res.status(500).json({ errorMessage: error.message });
  }
});

module.exports = reviewsRoutes;
