import CartItems from "@/components/CartItems/CartItems";
import CheckoutSummary from "@/components/CheckoutSummary/CheckoutSummary";
import WidthWrapper from "@/components/WidthWrapper";
import { useGetCartQuery } from "@/redux/cart/api";

export default function CartPage() {
  const { data, isLoading, isFetching } = useGetCartQuery();
  const loading = isLoading || isFetching;
  // const [updateCart] = useUpdateCartMutation();
  return (
    <WidthWrapper className='flex justify-center'>
      <div className='flex flex-col lg:flex-row lg:w-[80%] w-full mx-4 border rounded-lg border-black h-full'>
        <div className='lg:w-[70%] flex flex-col justify-center h-full items-start'>
          <h1 className='p-2 text-lg'>My Cart</h1>
          <div className='w-full flex flex-col px-2 h-[70vh] items-center overflow-y-auto my-2'>
            {loading
              ? Array.from({ length: 3 }).map((_, i) => (
                  // <LoadingCartItems key={i} />
                  <p key={i}>....Loading</p>
                ))
              : data?.map((item) => (
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
          <CheckoutSummary />
        </div>
      </div>
    </WidthWrapper>
  );
}
