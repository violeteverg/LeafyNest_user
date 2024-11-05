import CartItems from "@/components/CartItems/CartItems";
import CheckoutSummary from "@/components/CheckoutSummary/CheckoutSummary";
import DeliveryAddressCard from "@/components/DeliveryAddressCard/DeliveryAddressCard";
import { Button } from "@/components/ui/button";
import WidthWrapper from "@/components/WidthWrapper";
import { calculateTotalSummary, getSessionStorageItem } from "@/lib/utils";
import { useGetCartQuery } from "@/redux/cart/api";
import { useGetProductIdQuery } from "@/redux/product/api";
import { useMemo } from "react";
import { useSelector } from "react-redux";

export default function PaymentPage() {
  const { count } = useSelector((state) => state.app);
  const getSessionData = getSessionStorageItem("__Ttemp", false);
  const isBuyNow = getSessionData?.isBuyNow || false;

  const { data: cartData, isLoading, isFetching } = useGetCartQuery();
  const { data: productData } = useGetProductIdQuery(
    {
      id: getSessionData?.productId,
    },
    { skip: !isBuyNow }
  );
  const buyNowProduct = getSessionData?.quantity || 1;

  const loading = isLoading || isFetching;

  const updateProductQuantityById = useMemo(() => {
    if (productData) {
      const data = { ...productData, quantity: buyNowProduct };
      return [data];
    }
    return [];
  }, [productData, buyNowProduct]);

  const paymentDetails = () => {
    if (isBuyNow) {
      return [
        {
          productId: updateProductQuantityById?.id,
          productName: updateProductQuantityById?.title,
          quantity: count,
          price: updateProductQuantityById?.price,
        },
      ];
    }

    return (
      cartData?.map((item) => ({
        productId: item.id,
        productName: item.Product.title,
        quantity: item.quantity,
        price: item.Product.price,
      })) || []
    );
  };

  const totalSummary = useMemo(() => {
    if (isBuyNow) {
      return calculateTotalSummary(updateProductQuantityById);
    }
    return cartData
      ? calculateTotalSummary(cartData)
      : { totalQuantity: 0, totalPrice: 0 };
  }, [cartData, updateProductQuantityById, isBuyNow]);

  const renderPaymentItems = () => {
    if (isBuyNow) {
      return updateProductQuantityById?.map((item, i) => (
        <CartItems
          key={i}
          title={item.title}
          quantity={item.quantity}
          image={item.image}
          price={item.price}
        />
      ));
    }

    return cartData?.map((item) => (
      <CartItems
        key={item.id}
        image={item.Product.image}
        quantity={item.quantity}
        title={item.Product.title}
        price={item.Product.price}
        productQuantity={item.Product.quantity}
        isPaymentPage
      />
    ));
  };

  return (
    <>
      <WidthWrapper className='flex justify-center items-center'>
        {cartData || productData ? (
          <div className='flex flex-col lg:flex-row lg:w-[80%] mx-2'>
            <div className='lg:w-[70%] flex flex-col justify-center h-full items-center'>
              <DeliveryAddressCard />
              <div className='w-full flex flex-col p-4 h-[50vh] border border-black rounded-lg items-center overflow-y-auto my-2'>
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      // <LoadingCartItems key={i} />
                      <p key={i}>....Loading</p>
                    ))
                  : renderPaymentItems()}
              </div>
            </div>
            <div className='lg:w-[30%] p-4'>
              <CheckoutSummary
                summary={totalSummary}
                isPayment={true}
                paymentDetails={paymentDetails()}
              />
            </div>
          </div>
        ) : (
          <div>
            <Button>Shop Now</Button>
          </div>
        )}
      </WidthWrapper>
    </>
  );
}
