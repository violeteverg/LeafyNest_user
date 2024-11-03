import { Button } from "@/components/ui/button";
import WidthWrapper from "@/components/WidthWrapper";
import { formatPrice } from "@/lib/functions/formatPrice";
import { decrement, increment } from "@/redux/app/slice";
import { useGetProductIdQuery } from "@/redux/product/api";
import { Minus, Plus, Star } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

export default function DetailProductPage() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("productId");
  const dispatch = useDispatch();

  const { count } = useSelector((state) => state.app);
  const { data: productDetails } = useGetProductIdQuery({ id: productId });
  console.log(productDetails);
  const handleDecrement = () => {
    if (count > 1) {
      dispatch(decrement());
    }
  };
  const handleIncrement = () => {
    dispatch(increment());
  };

  return (
    <WidthWrapper className='flex justify-center items-center text-white h-full'>
      {productDetails ? (
        <div className='flex flex-col border border-black rounded-lg lg:w-[80%] px-5 py-2 my-6 '>
          <div className='flex flex-col lg:flex-row  w-full justify-center items-center my-6'>
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className='drop-shadow-xl mb-4 lg:mb-0 lg:mr-4 lg:w-[45%] w-[100%]'
              loading='lazy'
            />

            <div className='w-full lg:w-[80%]  bg-teal-800 rounded-md flex flex-col justify-center items-center p-4 lg:p-0'>
              <div className='w-full lg:w-[80%] py-4'>
                <h1 className='text-2xl lg:text-4xl font-semibold'>
                  {productDetails?.title}
                </h1>
                <div className='w-full h-[150px] lg:h-[200px] mt-4 lg:mt-6 overflow-auto'>
                  <p>{productDetails?.description}</p>
                </div>
              </div>

              <div className='flex flex-col w-full lg:w-[80%] py-4 space-y-4'>
                <div className='w-full'>
                  <div className='flex flex-col lg:flex-row gap-2 leading-loose'>
                    <div className='bg-white w-[20%] justify-between flex items-center border border-black rounded-md p-1'>
                      <Button
                        variant='transparant'
                        size='xs'
                        className='flex items-center justify-center h-full text-black'
                        onClick={handleDecrement}
                      >
                        <Minus className='h-[80%] w-[80%]' />
                      </Button>
                      <input
                        type='number'
                        className=' placeholder:leading-loose text-black w-[30%] h-full font-mono mx-2 placeholder:text-center focus:outline-none focus:border-none focus:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none'
                        placeholder='0'
                        value={count}
                        min={1}
                        max={100}
                        readOnly
                      />
                      <Button
                        variant='transparant'
                        size='xs'
                        className='flex items-center justify-center h-full text-black'
                        onClick={handleIncrement}
                        disabled={count >= productDetails.quantity}
                      >
                        <Plus className='h-[80%] w-[80%]' />
                      </Button>
                    </div>
                    <div className='flex justify-between items-center w-full'>
                      <p className='italic font-mono'>
                        Stock: {productDetails?.quantity}
                      </p>
                      <p className='font-mono'>
                        {formatPrice(productDetails?.price)}
                      </p>
                    </div>
                  </div>
                </div>
                <div className='flex flex-col lg:flex-row justify-between gap-3 w-full'>
                  <Button className='font-mono w-full lg:w-[24%]'>
                    <p className='font-bold'>+Cart</p>
                  </Button>
                  <Button className='w-full font-mono text-white font-bold'>
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className='mt-8 border-black border  rounded-md p-4'>
            <h2 className='text-2xl text-black font-semibold mb-4'>Reviews</h2>
            {productDetails?.Reviews.map((review) => (
              <div
                key={review.id}
                className='flex items-start gap-6 mb-4 bg-teal-900 py-4 px-2 '
              >
                <img
                  src={review.User.avatar}
                  alt={`${review.User.fullName}'s avatar`}
                  className='w-10 h-10 rounded-full'
                />
                <div className='flex-1'>
                  <p className='font-semibold'>{review.User.fullName}</p>
                  <div className='flex items-center gap-1'>
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        size={16}
                        className={
                          index < review.rating
                            ? "text-yellow-500"
                            : "text-gray-400"
                        }
                      />
                    ))}
                  </div>
                  {review.comment && (
                    <p className='text-gray-300 mt-1'>{review.comment}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </WidthWrapper>
  );
}
