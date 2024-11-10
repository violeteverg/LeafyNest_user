import { useState } from "react";
import PropTypes from "prop-types";
import { Button } from "../ui/button";
import { Star } from "lucide-react";
import { useCreateCommentMutation } from "@/redux/product/api";

export default function CardOrderReview({
  id,
  image,
  title,
  quantity,
  orderStatus,
}) {
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
        id: id,
        body: { comment, rating },
      });
      setComment("");
      setRating(0);
    } catch (error) {
      console.error("Failed to submit comment:", error);
    }
  };

  return (
    <div className='flex w-full max-w-sm mx-auto mb-6 p-4 border border-gray-300 rounded-lg shadow-sm bg-white'>
      <img
        src={image}
        alt={title}
        className='w-24 h-24 object-cover rounded mr-4'
      />

      <div className='flex flex-col flex-1'>
        <p className='text-lg font-semibold text-gray-800'>{title}</p>
        <p className='text-sm text-gray-600 mb-2'>Quantity: {quantity}</p>

        {orderStatus === "completed" && (
          <>
            <textarea
              placeholder='Write a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='w-full p-2 border border-gray-300 rounded-md text-black mb-2 resize-none'
            />

            <div className='flex items-center mb-2'>
              <label className='mr-2 text-sm font-medium text-gray-700'>
                Rating:
              </label>
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  onClick={() => handleStarClick(value)}
                  className={`w-6 h-6 cursor-pointer transition-colors ${
                    value <= rating ? "text-yellow-500" : "text-gray-300"
                  }`}
                />
              ))}
            </div>

            <Button
              className='self-start mt-2 px-4 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700'
              onClick={handleCommentSubmit}
            >
              Submit Comment
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

CardOrderReview.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  title: PropTypes.string,
  quantity: PropTypes.number,
  orderStatus: PropTypes.any,
};
