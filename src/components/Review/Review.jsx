import PropTypes from "prop-types";
import { Star } from "lucide-react";

export default function Review({ productDetails }) {
  return (
    <div className='mt-8 border-black border  rounded-md p-4'>
      <h2 className='text-2xl text-black font-semibold mb-4'>Reviews</h2>
      {productDetails?.Reviews?.map((review) => (
        <div
          key={review?.id}
          className='flex items-start gap-6 mb-4 bg-teal-900 py-4 px-6 space-y-2 '
        >
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
    </div>
  );
}

Review.propTypes = {
  productDetails: PropTypes.any,
  isUser: PropTypes.bool,
  productId: PropTypes.number,
};
