import { Button } from "@/components/ui/button";
import WidthWrapper from "@/components/WidthWrapper";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/functions/formatPrice";
import { cn, setSessionStorage } from "@/lib/utils";
import { decrement, increment } from "@/redux/app/slice";
import { useAddCartMutation } from "@/redux/cart/api";
import {
  useCreateCommentMutation,
  useGetProductIdQuery,
} from "@/redux/product/api";
import { CircleCheckBigIcon, CircleX, Minus, Plus, Star } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailProductPage() {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const { toast } = useToast();
  const user = useSelector((state) => state.app.user);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const { count } = useSelector((state) => state.app);
  const { data: productDetails } = useGetProductIdQuery({ id: productId });
  const [addCart] = useAddCartMutation();
  const [createComment] = useCreateCommentMutation();
  const handleDecrement = () => {
    if (count > 1) {
      dispatch(decrement());
    }
  };
  const handleIncrement = () => {
    dispatch(increment());
  };
  const buttoAddCartHandler = async () => {
    try {
      await addCart({
        productId: productDetails?.id,
        quantity: count,
      }).unwrap();
      toast({
        variant: "success",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleCheckBigIcon className='text-green-600' />
            <p>Succes add to Cart</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed !z-[99999] bg-white md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    } catch (error) {
      console.log(error, "ini error");
      toast({
        variant: "destructive",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleX />
            <p>{error.data?.message || "Failed to add product to cart"}</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    }
  };

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
  const handleBuyNow = async () => {
    setSessionStorage("__Ttemp", {
      index: productId,
      isBuyNow: true,
      quantity: count,
    });
    navigate("/payment");
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
                  <Button
                    className='font-mono w-full lg:w-[24%]'
                    onClick={buttoAddCartHandler}
                  >
                    <p className='font-bold'>+Cart</p>
                  </Button>
                  <Button
                    className='w-full font-mono text-white font-bold'
                    onClick={handleBuyNow}
                  >
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
            {user && (
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
        </div>
      ) : null}
    </WidthWrapper>
  );
}
