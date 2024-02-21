import express from "express";
import Review from "../models/reviewModel.js";
import User from "../models/usersModel.js";

const router = express.Router();

// Route for Create a new review
router.post("/postReview", async (req, res) => {
  try {
    const { patientId, doctorId, rating, comment } = req.body;
    const review = new Review({
      // maybe hear instead of patient to be patientId and aswell for doctor
      //   we know when create front end
      patient: patientId,
      doctor: doctorId,
      rating,
      comment,
    });

    await review.save();

    await User.findByIdAndUpdate(doctorId, { $push: { reviews: review._id } });
    await User.findByIdAndUpdate(patientId, { $push: { reviews: review._id } });

    res.status(201).json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Route for Update a review
router.put("/updateReview/:id", async (req, res) => {
  try {
    const reviewId = req.params.id;

    const { rating, comment } = req.body;

    const existingReview = await Review.findById(reviewId);

    if (!existingReview) {
      return res.status(404).send({ message: "Review not found" });
    }

    if (rating) existingReview.rating = rating;
    if (comment) existingReview.comment = comment;

    await existingReview.save();

    return res.status(200).json(existingReview);
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: err.message });
  }
});

// Route for GET One review by id
router.get("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findById(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    res.status(200).json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

// Route for Delete One review by id
router.delete("/:reviewId", async (req, res) => {
  try {
    const { reviewId } = req.params;

    const review = await Review.findByIdAndDelete(reviewId);

    if (!review) return res.status(404).json({ message: "Review not found" });

    res.status(200).json(review);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

export default router;
