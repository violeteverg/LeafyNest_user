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
    <div className='flex flex-col w-full max-w-full p-2  border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out'>
      <div className='flex items-start gap-4 mb-4'>
        <img
          src={image}
          alt={title}
          className='w-20 h-20 object-cover rounded-lg'
        />
        <div>
          <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
          <p className='text-sm text-gray-500'>Quantity: {quantity}</p>
        </div>
      </div>

      {orderStatus === "completed" && (
        <div className='w-full space-y-4'>
          <div className='w-full'>
            <textarea
              placeholder='Write a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='w-full min-h-[100px] p-3 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-1 focus:ring-teal-500'
            />
          </div>

          <div className='flex items-center gap-2'>
            <span className='text-sm text-gray-600'>Rating:</span>
            <div className='flex gap-1'>
              {[1, 2, 3, 4, 5].map((value) => (
                <Star
                  key={value}
                  onClick={() => handleStarClick(value)}
                  className={`w-5 h-5 cursor-pointer ${
                    value <= rating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <Button
            onClick={handleCommentSubmit}
            className='w-full bg-teal-600 hover:bg-teal-700 text-white'
          >
            Submit Comment
          </Button>
        </div>
      )}
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
