import CartItems from "@/components/CartItems/CartItems";
import CheckoutSummary from "@/components/CheckoutSummary/CheckoutSummary";
import DeliveryAddressCard from "@/components/DeliveryAddressCard/DeliveryAddressCard";
import WidthWrapper from "@/components/WidthWrapper";
import { mockCartData } from "@/lib/mock/DummyCartItems";

export default function PaymentPage() {
  const isLoading = false;
  return (
    <>
      <WidthWrapper className='flex justify-center items-center'>
        <div className='flex flex-col lg:flex-row lg:w-[80%] mx-2'>
          <div className='lg:w-[70%] flex flex-col justify-center h-full items-center'>
            <DeliveryAddressCard />
            <div className='w-full flex flex-col p-4 h-[50vh] border border-black rounded-lg items-center overflow-y-auto my-2'>
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
                      price={item.Product.price}
                      productQuantity={item.Product.quantity}
                      isPaymentPage
                    />
                  ))}
            </div>
          </div>
          <div className='lg:w-[30%] p-4'>
            <CheckoutSummary
              //   totalSummary={totalSummary}
              isPayment={true}
              //   sendBodyPayment={sendBodyPayment() || []}
            />
          </div>
        </div>
      </WidthWrapper>
    </>
  );
}
