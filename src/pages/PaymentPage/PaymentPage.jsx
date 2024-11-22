import CartItem from "@/components/CartItem/CartItem";
import CheckoutSummary from "@/components/CheckoutSummary/CheckoutSummary";
import DeliveryAddress from "@/components/DeliveryAddress/DeliveryAddress";
import CardCartLoading from "@/components/Loading/CardCartLoading";
import { Button } from "@/components/ui/button";
import WidthWrapper from "@/components/WidthWrapper";
import { calculateTotalSummary, getSessionStorageItem } from "@/lib/utils";
import { useGetCartQuery } from "@/redux/cart/api";
import { useGetProductIdQuery } from "@/redux/product/api";
import { useMemo } from "react";

export default function PaymentPage() {
  const getSessionData = getSessionStorageItem("__Ttemp", false);
  const isBuyNow = getSessionData?.isBuyNow || false;
  const productId = getSessionData?.productId;
  const buyNowProductQuantity = getSessionData?.quantity || 1;

  const { data: cartData, isLoading, isFetching } = useGetCartQuery();

  const { data: productData } = useGetProductIdQuery(
    {
      id: productId,
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
          image: productData.image,
        },
      ];
    }

    return (
      cartData?.map((item) => ({
        productId: item?.productId,
        productName: item?.Product?.title,
        quantity: item?.quantity,
        price: item?.Product?.price,
        image: item?.Product.image,
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
    if (loading) {
      return Array.from({ length: 3 }).map((_, i) => (
        <CardCartLoading key={i} />
      ));
    }
    if (isBuyNow && productData) {
      return (
        <CartItem
          title={productData.title}
          quantity={buyNowProductQuantity}
          image={productData.image}
          price={productData.price}
        />
      );
    }

    return cartData?.map((item) => (
      <CartItem
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

  if (loading) {
    return null;
  }

  return (
    <WidthWrapper className='flex justify-center items-center my-10 lg:mt-10 lg:mb-0 '>
      {cartData || productData ? (
        <div className='flex flex-col lg:flex-row lg:w-[80%] lg:gap-3 lg:p-2'>
          <div className='lg:w-[70%] flex flex-col justify-center h-full items-center'>
            <DeliveryAddress />
            <div className='w-full flex flex-col px-3 h-[50vh] border shadow-2xl rounded-lg items-center overflow-y-auto my-2'>
              {renderPaymentItems()}
            </div>
          </div>
          <div className='lg:w-[30%]'>
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
