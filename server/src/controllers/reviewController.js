import Review from "../models/Review.js";

// CREATE REVIEW
export const createReview = async (req, res) => {
  try {
    const { reviewee, rating, comment } = req.body;

    const review = await Review.create({
      reviewer: req.user._id,
      reviewee,
      rating,
      comment,
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// GET USER REVIEWS
export const getUserReviews = async (req, res) => {
  try {
    const reviews = await Review.find({
      reviewee: req.params.userId,
    })
      .populate("reviewer", "name")
      .sort({
        createdAt: -1,
      });

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
