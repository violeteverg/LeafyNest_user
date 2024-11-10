import CartItems from "@/components/CartItems/CartItems";
import CheckoutSummary from "@/components/CheckoutSummary/CheckoutSummary";
import DeliveryAddress from "@/components/DeliveryAddress/DeliveryAddress";
import { Button } from "@/components/ui/button";
import WidthWrapper from "@/components/WidthWrapper";
import { calculateTotalSummary, getSessionStorageItem } from "@/lib/utils";
import { useGetCartQuery } from "@/redux/cart/api";
import { useGetProductIdQuery } from "@/redux/product/api";
import { useMemo } from "react";

export default function PaymentPage() {
  const getSessionData = getSessionStorageItem("__Ttemp", false);
  const isBuyNow = getSessionData?.isBuyNow || false;
  const buyNowProductQuantity = getSessionData?.quantity || 1;

  const { data: cartData, isLoading, isFetching } = useGetCartQuery();

  const { data: productData } = useGetProductIdQuery(
    {
      id: getSessionData?.productId,
    },
    { skip: !isBuyNow }
  );
  const loading = isLoading || isFetching;

  const paymentDetails = useMemo(() => {
    if (isBuyNow && productData) {
      return [
        {
          productId: productData.id,
          productName: productData.title,
          quantity: buyNowProductQuantity,
          price: productData.price,
        },
      ];
    }

    return (
      cartData?.map((item) => ({
        productId: item.productId,
        productName: item.Product.title,
        quantity: item.quantity,
        price: item.Product.price,
      })) || []
    );
  }, [cartData, productData, isBuyNow, buyNowProductQuantity]);

  const totalSummary = useMemo(() => {
    if (isBuyNow && productData) {
      return calculateTotalSummary([
        { ...productData, quantity: buyNowProductQuantity },
      ]);
    }
    return cartData
      ? calculateTotalSummary(cartData)
      : { totalQuantity: 0, totalPrice: 0 };
  }, [cartData, productData, isBuyNow, buyNowProductQuantity]);

  const renderPaymentItems = () => {
    if (isBuyNow && productData) {
      return (
        <CartItems
          title={productData.title}
          quantity={buyNowProductQuantity}
          image={productData.image}
          price={productData.price}
        />
      );
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
    <WidthWrapper className='flex justify-center items-center'>
      {cartData || productData ? (
        <div className='flex flex-col lg:flex-row lg:w-[80%] mx-2'>
          <div className='lg:w-[70%] flex flex-col justify-center h-full items-center'>
            <DeliveryAddress />
            <div className='w-full flex flex-col p-4 h-[50vh] border border-black rounded-lg items-center overflow-y-auto my-2'>
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <p key={i}>....Loading</p>
                  ))
                : renderPaymentItems()}
            </div>
          </div>
          <div className='lg:w-[30%] p-4'>
            <CheckoutSummary
              summary={totalSummary}
              isPaymentPage
              isBuyNow={isBuyNow}
              paymentDetails={paymentDetails}
            />
          </div>
        </div>
      ) : (
        <div>
          <Button>Shop Now</Button>
        </div>
      )}
    </WidthWrapper>
  );
}
