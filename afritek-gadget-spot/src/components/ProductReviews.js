import React, { useState } from "react";
import { Star, ThumbsUp, User } from "lucide-react";

const ProductReviews = ({ productId }) => {
  const [reviews, setReviews] = useState([
    {
      id: 1,
      author: "John Kipchoge",
      rating: 5,
      title: "Excellent Quality!",
      comment:
        "This phone is amazing! Fast performance, great camera, and battery lasts all day. Highly recommend!",
      date: "2 days ago",
      helpful: 45,
      verified: true,
    },
    {
      id: 2,
      author: "Sarah Mwangi",
      rating: 5,
      title: "Best Phone I've Owned",
      comment:
        "Fantastic display and the 5G speed is incredible. Customer service was also very helpful.",
      date: "1 week ago",
      helpful: 32,
      verified: true,
    },
    {
      id: 3,
      author: "David Omondi",
      rating: 4,
      title: "Very Good Value",
      comment:
        "Great phone for the price. Only minor issue is the storage, but overall very satisfied.",
      date: "2 weeks ago",
      helpful: 18,
      verified: true,
    },
    {
      id: 4,
      author: "Grace Kariuki",
      rating: 5,
      title: "Perfect Purchase",
      comment:
        "Arrived quickly, packaging was excellent, and the phone works perfectly. Will buy again!",
      date: "3 weeks ago",
      helpful: 28,
      verified: true,
    },
  ]);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    author: "",
    rating: 5,
    title: "",
    comment: "",
  });

  const [sortBy, setSortBy] = useState("helpful");

  // Calculate average rating
  const averageRating =
    reviews.length > 0
      ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
      : 0;

  // Rating distribution
  const ratingDistribution = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!newReview.author || !newReview.title || !newReview.comment) {
      alert("Please fill in all fields");
      return;
    }

    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: "Just now",
      helpful: 0,
      verified: false,
    };

    setReviews([review, ...reviews]);
    setNewReview({ author: "", rating: 5, title: "", comment: "" });
    setShowReviewForm(false);
    alert("Thank you! Your review has been posted.");
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === "helpful") return b.helpful - a.helpful;
    if (sortBy === "newest") return 0; // Already in order
    if (sortBy === "highest") return b.rating - a.rating;
    if (sortBy === "lowest") return a.rating - b.rating;
  });

  return (
    <section className="py-16 px-6 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold mb-12">
        Customer <span className="text-blue-500">Reviews</span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Rating Summary */}
        <div className="lg:col-span-1">
          <div className="bg-[#111827] rounded-2xl p-8 border border-gray-800 sticky top-32">
            {/* Average Rating */}
            <div className="text-center mb-8">
              <div className="text-5xl font-bold text-white mb-2">
                {averageRating}
              </div>
              <div className="flex justify-center gap-1 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < Math.round(averageRating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-600"
                    }`}
                  />
                ))}
              </div>
              <p className="text-gray-400">Based on {reviews.length} reviews</p>
            </div>

            {/* Rating Breakdown */}
            <div className="space-y-4 mb-8">
              {[5, 4, 3, 2, 1].map((rating) => (
                <div key={rating} className="flex items-center gap-3">
                  <span className="text-sm font-medium text-gray-400 w-8">
                    {rating}★
                  </span>
                  <div className="flex-1 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-yellow-400"
                      style={{
                        width: `${
                          (ratingDistribution[rating] / reviews.length) * 100
                        }%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-400 w-8">
                    {ratingDistribution[rating]}
                  </span>
                </div>
              ))}
            </div>

            {/* Write Review Button */}
            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors"
            >
              {showReviewForm ? "Cancel" : "Write a Review"}
            </button>
          </div>
        </div>

        {/* Right: Reviews List */}
        <div className="lg:col-span-2">
          {/* Review Form */}
          {showReviewForm && (
            <div className="bg-[#111827] rounded-2xl p-8 border border-blue-500/30 mb-8">
              <h3 className="text-2xl font-bold mb-6">Share Your Experience</h3>
              <form onSubmit={handleSubmitReview} className="space-y-4">
                {/* Name */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={newReview.author}
                    onChange={(e) =>
                      setNewReview({ ...newReview, author: e.target.value })
                    }
                    className="w-full bg-[#0a0c10] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                    placeholder="Enter your name"
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <button
                        key={rating}
                        type="button"
                        onClick={() =>
                          setNewReview({ ...newReview, rating })
                        }
                        className="focus:outline-none transition-transform hover:scale-110"
                      >
                        <Star
                          size={28}
                          className={`${
                            rating <= newReview.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-600"
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Review Title
                  </label>
                  <input
                    type="text"
                    value={newReview.title}
                    onChange={(e) =>
                      setNewReview({ ...newReview, title: e.target.value })
                    }
                    className="w-full bg-[#0a0c10] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none"
                    placeholder="e.g., Great phone, highly recommend!"
                  />
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Your Review
                  </label>
                  <textarea
                    value={newReview.comment}
                    onChange={(e) =>
                      setNewReview({ ...newReview, comment: e.target.value })
                    }
                    rows="4"
                    className="w-full bg-[#0a0c10] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none resize-none"
                    placeholder="Share your experience with this product..."
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition-colors"
                >
                  Post Review
                </button>
              </form>
            </div>
          )}

          {/* Sort Options */}
          <div className="mb-6 flex justify-between items-center">
            <h3 className="text-lg font-bold">Recent Reviews</h3>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-[#111827] border border-gray-700 rounded-lg px-4 py-2 text-white focus:border-blue-500 outline-none text-sm"
            >
              <option value="helpful">Most Helpful</option>
              <option value="newest">Newest</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>

          {/* Reviews List */}
          <div className="space-y-6">
            {sortedReviews.map((review) => (
              <div
                key={review.id}
                className="bg-[#111827] rounded-2xl p-6 border border-gray-800 hover:border-blue-500/30 transition-all"
              >
                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <User size={16} className="text-blue-500" />
                      <span className="font-bold">{review.author}</span>
                      {review.verified && (
                        <span className="bg-green-500/20 text-green-400 text-xs px-2 py-1 rounded border border-green-500/30">
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <p className="text-gray-500 text-sm">{review.date}</p>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-600"
                      }`}
                    />
                  ))}
                </div>

                {/* Title */}
                <h4 className="font-bold text-lg mb-2">{review.title}</h4>

                {/* Comment */}
                <p className="text-gray-300 mb-4 leading-relaxed">
                  {review.comment}
                </p>

                {/* Helpful Button */}
                <button className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  <ThumbsUp size={16} />
                  Helpful ({review.helpful})
                </button>
              </div>
            ))}
          </div>

          {/* No Reviews Message */}
          {reviews.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-400 mb-4">
                No reviews yet. Be the first to review this product!
              </p>
              <button
                onClick={() => setShowReviewForm(true)}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg transition-colors"
              >
                Write a Review
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductReviews;