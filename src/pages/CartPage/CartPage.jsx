import CartItem from "@/components/CartItem/CartItem";
import CheckoutSummary from "@/components/CheckoutSummary/CheckoutSummary";
import CardCartLoading from "@/components/Loading/CardCartLoading";
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
                    <CardCartLoading key={i} isCartPage />
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
