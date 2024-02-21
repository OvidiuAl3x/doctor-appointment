import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  patient: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  doctor: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  rating: Number,
  comment: String,
});

const Review = mongoose.model("Review", reviewSchema);

export default Review;
