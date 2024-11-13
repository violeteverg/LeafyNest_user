import { useDispatch, useSelector } from "react-redux";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetHeader,
  SheetFooter,
} from "../ui/sheet";

import { Separator } from "../ui/separator";

// import LoadingCartItems from "../Loading/LoadingCartItems";
import { setIsOpen } from "@/redux/app/slice";
import { Link } from "react-router-dom";
import CartItems from "../CartItems/CartItems";
import { buttonVariants } from "../ui/button";
import { useGetCartQuery } from "@/redux/cart/api";

export default function Cart() {
  //   const fee = 2;
  const dispatch = useDispatch();
  const { isOpen } = useSelector((state) => state.app);
  const { data, isLoading, isFetching } = useGetCartQuery(
    {},
    { skip: !isOpen }
  );

  const isCart = data?.length || 0;
  const loading = isLoading || isFetching;
  const handleClose = () => {
    dispatch(setIsOpen(false));
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent className='flex w-full flex-col pr-2 sm:max-w-lg'>
        <SheetHeader className='space-y-2.5 pr-6'>
          <SheetTitle>{`Cart ${isCart}`}</SheetTitle>
        </SheetHeader>
        {isCart > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6 space-y-4 overflow-auto'>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    // <LoadingCartItems key={i} />
                    <p key={i}>....Loading</p>
                  ))
                : data?.map((item) => (
                    <CartItems
                      key={item.id}
                      image={item.Product.image}
                      quantity={item.quantity}
                      title={item.Product.title}
                      price={item.Product.price}
                      productQuantity={item.Product.quantity}
                    />
                  ))}
            </div>
            <div className='space-y-4 text-sm'>
              <Separator />
              <div className='space-y-1.5 pr-6'>
                <div className='flex'>
                  <span className='flex-1'>Shipping</span>
                  <span>Free</span>
                </div>
                <div className='flex'>
                  <span className='flex-1'>Transaction Fee</span>
                  {/* <span>{formatPrice(fee)}</span> */}
                </div>
                <div className='flex'>
                  <span className='flex-1'>Total</span>
                  <span>{}</span>
                </div>
              </div>
            </div>
            <SheetFooter>
              <SheetTrigger asChild>
                <Link
                  to='/cart'
                  className={buttonVariants({ className: "w-full" })}
                >
                  see cart
                </Link>
              </SheetTrigger>
            </SheetFooter>
          </>
        ) : (
          <div className='flex h-full flex-col items-center justify-center space-y-1'>
            <div className='relative mb-4 h-96 w-96 text-muted-foreground'>
              <img
                src='/Tiger-Cart.png'
                alt='tiger with a cart'
                className='h-full w-full object-cover'
              />
            </div>
            <span className='text-gray-700 font-medium text-2xl'>
              This Cart is empty
            </span>
            <SheetTrigger asChild>
              <Link to='/product' className='text-sm text-muted-foreground'>
                Add items to your cart
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
