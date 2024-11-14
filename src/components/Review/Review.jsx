import PropTypes from "prop-types";
import { Star } from "lucide-react";

export default function Review({ productDetails }) {
  return (
    <div className='mt-8 border  rounded-lg shadow-2xl p-6'>
      <h2 className='text-2xl text-teal-700 font-bold mb-6'>
        Customer Reviews
      </h2>
      {productDetails?.Reviews?.length > 0 ? (
        productDetails.Reviews.map((review) => (
          <div
            key={review?.id}
            className='mb-6 bg-gradient-to-bl from-teal-700 to-teal-900 bg-opacity-40 rounded-lg p-4 space-y-2'
          >
            <div className='flex items-center justify-between'>
              <p className='font-semibold text-white'>
                {review?.User?.fullName}
              </p>
              <div className='flex items-center gap-1'>
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    size={16}
                    className={
                      index < review?.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-400"
                    }
                  />
                ))}
              </div>
            </div>
            {review?.comment && (
              <p className='text-teal-50 mt-2 italic'>
                &quot;{review?.comment}&quot;
              </p>
            )}
          </div>
        ))
      ) : (
        <p className='text-teal-700 italic'>
          No reviews yet. Be the first to review this product!
        </p>
      )}
    </div>
  );
}

Review.propTypes = {
  productDetails: PropTypes.any,
  isUser: PropTypes.bool,
  productId: PropTypes.number,
};
