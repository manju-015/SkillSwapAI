import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import api from "../api/api";

import toast from "react-hot-toast";

function ReviewsPage() {
  const { userId } = useParams();

  const [reviews, setReviews] = useState([]);

  const [rating, setRating] = useState("");

  const [comment, setComment] = useState("");

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`/reviews/${userId}`);

      setReviews(data);
    } catch (error) {
      toast.error("Failed to load reviews");
    }
  };

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      await api.post("/reviews/create", {
        reviewee: userId,
        rating,
        comment,
      });

      toast.success("Review submitted");

      setRating("");
      setComment("");

      fetchReviews();
    } catch (error) {
      toast.error("Submission failed");
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-10">
      <h1 className="text-3xl font-bold mb-6">Reviews</h1>

      <form
        onSubmit={submitReview}
        className="bg-white p-6 rounded shadow mb-8"
      >
        <div className="mb-4">
          <label className="block mb-2">Rating</label>

          <select
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="w-full border p-3 rounded"
            required
          >
            <option value="">Select Rating</option>

            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block mb-2">Comment</label>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="w-full border p-3 rounded"
            rows="4"
            required
          />
        </div>

        <button type="submit" className="bg-black text-white px-6 py-3 rounded">
          Submit Review
        </button>
      </form>

      <div className="grid gap-4">
        {reviews.map((review) => (
          <div key={review._id} className="bg-white p-5 rounded shadow">
            <h2 className="font-bold">{review.reviewer.name}</h2>

            <p className="mt-2">Rating: {review.rating}/5</p>

            <p className="mt-2">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ReviewsPage;
