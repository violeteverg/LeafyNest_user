import CartItems from "@/components/cartItems/CartItems";
import WidthWrapper from "@/components/WidthWrapper";
import { mockCartData } from "@/lib/mock/DummyCartItems";

export default function CartPage() {
  const isLoading = false;
  return (
    <WidthWrapper className='flex justify-center items-center h-screen '>
      <div className='flex w-[80%] border rounded-lg border-black'>
        <div className='w-[70%] flex flex-col justify-center h-full items-start'>
          <h1 className='p-2 text-lg'>My Cart</h1>
          <div className='w-full flex flex-col px-2 h-[70vh] items-center overflow-y-auto my-2'>
            {isLoading
              ? Array.from({ length: 3 }).map((_, i) => (
                  // <LoadingCartItems key={i} />
                  <p key={i}>....Loading</p>
                ))
              : mockCartData?.map((item) => (
                  <CartItems
                    key={item.id}
                    image={item.Product.image}
                    quantity={item.quantity}
                    title={item.Product.title}
                    productQuantity={item.Product.quantity}
                    page={true}
                  />
                ))}
          </div>
        </div>
        <div className='w-[30%] p-4'>
          {/* <TotalProducts totalSummary={totalSummary} /> */}
        </div>
      </div>
    </WidthWrapper>
  );
}
