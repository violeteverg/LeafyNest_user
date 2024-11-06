import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { useCreateCommentMutation } from "@/redux/product/api";

export default function Review({ productDetails, isUser, productId }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const [createComment] = useCreateCommentMutation();

  const handleStarClick = (value) => {
    setRating(value);
  };
  const handleCommentSubmit = async () => {
    if (!comment && rating === 0) {
      alert("Please enter a comment or select a rating.");
      return;
    }

    try {
      console.log(comment, rating, "rating");
      await createComment({
        id: productId,
        body: { comment, rating },
      });
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div className='mt-8 border-black border  rounded-md p-4'>
      <h2 className='text-2xl text-black font-semibold mb-4'>Reviews</h2>
      {productDetails?.Reviews?.map((review) => (
        <div
          key={review?.id}
          className='flex items-start gap-6 mb-4 bg-teal-900 py-4 px-2 '
        >
          <img
            src={review?.User?.avatar}
            alt={`${review?.User?.fullName}'s avatar`}
            className='w-10 h-10 rounded-full'
          />
          <div className='flex-1'>
            <p className='font-semibold'>{review?.User?.fullName}</p>
            <div className='flex items-center gap-1'>
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={16}
                  className={
                    index < review?.rating ? "text-yellow-500" : "text-gray-400"
                  }
                />
              ))}
            </div>
            {review?.comment && (
              <p className='text-gray-300 mt-1'>{review?.comment}</p>
            )}
          </div>
        </div>
      ))}
      {isUser && (
        <div className='mt-4'>
          <textarea
            placeholder='Write a comment...'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className='w-full p-2 border border-gray-300 rounded-md text-black'
          />

          <div className='flex items-center mt-2'>
            <label className='mr-2 text-sm font-medium text-gray-700'>
              Rating:
            </label>
            {[1, 2, 3, 4, 5].map((value) => (
              <Star
                key={value}
                onClick={() => handleStarClick(value)}
                className={`w-6 h-6 cursor-pointer ${
                  value <= rating ? "text-yellow-500" : "text-gray-300"
                }`}
              />
            ))}
          </div>

          <Button className='mt-2' onClick={handleCommentSubmit}>
            Submit Comment
          </Button>
        </div>
      )}
    </div>
  );
}

Review.propTypes = {
  productDetails: PropTypes.any,
  isUser: PropTypes.bool,
  productId: PropTypes.number,
};
