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
import { setIsOpen } from "@/redux/app/slice";
import { Link } from "react-router-dom";

import { buttonVariants } from "../ui/button";
import { useGetCartQuery } from "@/redux/cart/api";
import CartItem from "../CartItem/CartItem";
import CardCartLoading from "../Loading/CardCartLoading";

export default function Cart() {
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
          <SheetTitle>Cart</SheetTitle>
        </SheetHeader>
        {isCart > 0 ? (
          <>
            <div className='flex w-full flex-col pr-6 space-y-4 overflow-auto'>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <CardCartLoading key={i} />
                  ))
                : data?.map((item) => (
                    <CartItem
                      key={item.id}
                      image={item.Product.image}
                      quantity={item.quantity}
                      title={item.Product.title}
                      price={item.Product.price}
                      productQuantity={item.Product.quantity}
                    />
                  ))}
            </div>

            <Separator />

            <SheetFooter>
              <SheetTrigger asChild>
                <Link
                  to='/cart'
                  className={buttonVariants({
                    className: "w-full bg-amber-500 hover:bg-amber-600",
                  })}
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
                src='/bg-cactus-cart.png'
                alt='tiger with a cart'
                className='h-full w-full object-cover'
              />
            </div>
            <span className='text-gray-700 font-medium text-2xl'>
              This Cart is empty
            </span>
            <SheetTrigger asChild>
              <Link
                to='/all-product'
                className={buttonVariants({ className: "w-full bg-amber-500" })}
              >
                Add items to your cart
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
