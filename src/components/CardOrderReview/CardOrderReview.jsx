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
    <div className='flex mb-8 p-6 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out'>
      <img
        src={image}
        alt={title}
        className='w-24 h-24 object-cover rounded-lg mr-6 shadow-md'
      />

      <div className='flex flex-col '>
        <p className='text-xl font-semibold text-gray-800'>{title}</p>
        <p className='text-sm text-gray-500 mb-3'>Quantity: {quantity}</p>

        {orderStatus === "completed" && (
          <div>
            <textarea
              placeholder='Write a comment...'
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className='w-full p-3 border border-gray-300 rounded-lg text-black mb-4 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500'
            />

            <div className='flex items-center mb-4'>
              <label className='mr-3 text-sm font-medium text-gray-700'>
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
              className='self-start px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors duration-300'
              onClick={handleCommentSubmit}
            >
              Submit Comment
            </Button>
          </div>
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
