import Review from "@/components/Review/Review";
import { Button } from "@/components/ui/button";
import WidthWrapper from "@/components/WidthWrapper";
import { useToast } from "@/hooks/use-toast";
import { formatPrice } from "@/lib/functions/formatPrice";
import { cn, setSessionStorage } from "@/lib/utils";
import { decrement, increment, resetCount } from "@/redux/app/slice";
import { useAddCartMutation } from "@/redux/cart/api";
import { useGetProductIdQuery } from "@/redux/product/api";
import {
  CircleCheckBigIcon,
  CircleX,
  Minus,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

export default function DetailProductPage() {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const dispatch = useDispatch();
  const { toast } = useToast();
  const user = useSelector((state) => state.app.user);

  const { count } = useSelector((state) => state.app);
  const { data: productDetails } = useGetProductIdQuery({ id: productId });
  const [addCart] = useAddCartMutation();

  useEffect(() => {
    dispatch(resetCount());
  }, [dispatch]);

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
            <p>Success add to Cart</p>
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
        <div className='flex flex-col w-full max-w-6xl rounded-lg px-5 py-8 my-6'>
          <div className='flex flex-col lg:flex-row w-full justify-center items-start gap-8 mb-8'>
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              className='drop-shadow-xl mb-4 lg:mb-0 lg:w-[45%] w-full object-cover rounded-lg'
              loading='lazy'
            />

            <div className='w-full lg:w-[55%] bg-gradient-to-br from-teal-700 to-teal-900 rounded-lg shadow-2xl flex flex-col justify-between p-6'>
              <div className='space-y-4'>
                <h1 className='text-3xl lg:text-4xl font-bold text-white'>
                  {productDetails?.title}
                </h1>
                <div className='w-full h-[150px] lg:h-[200px] mt-4 lg:mt-6 overflow-auto'>
                  <p className='text-teal-100 text-lg leading-relaxed'>
                    {productDetails?.description}
                  </p>
                </div>
              </div>

              <div className='mt-8 space-y-6'>
                <div className='flex items-center justify-between'>
                  <div className='bg-white rounded-md flex items-center'>
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-teal-800'
                      onClick={handleDecrement}
                    >
                      <Minus className='h-4 w-4' />
                    </Button>
                    <input
                      type='number'
                      className='w-16 text-center text-teal-800 font-semibold bg-transparent focus:outline-none'
                      value={count}
                      min={1}
                      max={100}
                      readOnly
                    />
                    <Button
                      variant='ghost'
                      size='icon'
                      className='text-teal-800'
                      onClick={handleIncrement}
                      disabled={count >= productDetails.quantity}
                    >
                      <Plus className='h-4 w-4' />
                    </Button>
                  </div>
                  <p className='text-2xl font-bold text-white'>
                    {formatPrice(productDetails?.price)}
                  </p>
                </div>
                <p className='text-teal-200 text-sm'>
                  Stock: {productDetails?.quantity} available
                </p>
                <div className='flex gap-4'>
                  <Button
                    className='flex-1 bg-white text-teal-800 hover:bg-teal-100 transition-colors'
                    onClick={buttoAddCartHandler}
                  >
                    <ShoppingCart className='mr-2 h-5 w-5' />
                    Add to Cart
                  </Button>
                  <Button
                    className='flex-1 bg-teal-600 text-white hover:bg-teal-700 transition-colors'
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Review
            productDetails={productDetails}
            isUser={user}
            productId={productId}
          />
        </div>
      ) : null}
    </WidthWrapper>
  );
}
