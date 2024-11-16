import CartItem from "@/components/CartItem/CartItem";
import CheckoutSummary from "@/components/CheckoutSummary/CheckoutSummary";
import NoContent from "@/components/NoContent/NoContent";
import WidthWrapper from "@/components/WidthWrapper";
import { calculateTotalSummary } from "@/lib/utils";
import { useGetCartQuery } from "@/redux/cart/api";
import { ShoppingCart } from "lucide-react";
import { useMemo } from "react";

export default function CartPage() {
  const { data: cartData, isLoading, isFetching } = useGetCartQuery();
  const loading = isLoading || isFetching;
  const totalSummary = useMemo(() => {
    return cartData
      ? calculateTotalSummary(cartData)
      : { totalQuantity: 0, totalPrice: 0 };
  }, [cartData]);
  console.log(totalSummary, "ini total summary");
  if (isLoading) {
    return null;
  }
  return (
    <WidthWrapper className='flex justify-center lg:h-[88vh] py-6'>
      {cartData && cartData.length > 0 ? (
        <div className='flex flex-col lg:flex-row w-full max-w-6xl border p-2  rounded-lg shadow-xl overflow-hidden'>
          <div className='lg:w-[70%] flex flex-col'>
            <h1 className='p-6 text-2xl font-bold text-teal-800 flex items-center'>
              <ShoppingCart className='mr-2' />
              My Cart
            </h1>
            <div className='w-full flex flex-col px-1 lg:px-3 h-[calc(100vh-230px)] lg:h-[70vh] overflow-y-auto my-2 space-y-4'>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className='animate-pulse flex space-x-4'>
                      <div className='rounded-lg bg-teal-200 h-24 w-24'></div>
                      <div className='flex-1 space-y-4 py-1'>
                        <div className='h-4 bg-teal-200 rounded w-3/4'></div>
                        <div className='space-y-2'>
                          <div className='h-4 bg-teal-200 rounded'></div>
                          <div className='h-4 bg-teal-200 rounded w-5/6'></div>
                        </div>
                      </div>
                    </div>
                  ))
                : cartData?.map((item) => (
                    <CartItem
                      key={item.id}
                      id={item.id}
                      image={item.Product.image}
                      quantity={item.quantity}
                      title={item.Product.title}
                      productQuantity={item.Product.quantity}
                      price={item.Product.price}
                      isCartPage
                    />
                  ))}
            </div>
          </div>
          <div className='lg:w-[30%]'>
            <CheckoutSummary summary={totalSummary} />
          </div>
        </div>
      ) : (
        <NoContent description='Your cart is empty. Start shopping to add products to your cart.' />
      )}
    </WidthWrapper>
  );
}
