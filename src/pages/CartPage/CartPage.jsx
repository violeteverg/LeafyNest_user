import CartItems from "@/components/CartItems/CartItems";
import CheckoutSummary from "@/components/CheckoutSummary/CheckoutSummary";
import NoContent from "@/components/NoContent/NoContent";
import WidthWrapper from "@/components/WidthWrapper";
import { calculateTotalSummary } from "@/lib/utils";
import { useGetCartQuery } from "@/redux/cart/api";
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
  return (
    <WidthWrapper className='flex justify-center'>
      {cartData && cartData.length > 0 ? (
        <div className='flex flex-col lg:flex-row lg:w-[80%] w-full mx-4 border rounded-lg border-black h-full'>
          <div className='lg:w-[70%] flex flex-col justify-center h-full items-start'>
            <h1 className='p-2 text-lg'>My Cart</h1>
            <div className='w-full flex flex-col px-2 h-[70vh] items-center overflow-y-auto my-2'>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <p key={i}>....Loading</p>
                  ))
                : cartData?.map((item) => (
                    <CartItems
                      key={item.id}
                      id={item.id}
                      image={item.Product.image}
                      quantity={item.quantity}
                      title={item.Product.title}
                      productQuantity={item.Product.quantity}
                      isCartPage
                    />
                  ))}
            </div>
          </div>
          <div className='lg:w-[30%] p-4'>
            <CheckoutSummary summary={totalSummary} />
          </div>
        </div>
      ) : (
        <NoContent description='Your cart is empty. Start shopping to add products to your cart.' />
      )}
    </WidthWrapper>
  );
}
