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
import { useNavigate } from "react-router-dom";

export default function PaymentPage() {
  const navigate = useNavigate();
  const getSessionData = getSessionStorageItem("__Ttemp", false);
  const buyAgainData = getSessionStorageItem("_buyagain");
  const isBuyNow = getSessionData?.isBuyNow || false;
  const isBuyAgain = buyAgainData?.buyagain || false;
  const productId = getSessionData?.productId;
  const buyNowProductQuantity = getSessionData?.quantity || 1;

  if (isBuyAgain) {
    sessionStorage.removeItem("__Ttemp");
  }

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

    if (isBuyAgain && buyAgainData?.result) {
      return buyAgainData.result;
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
  }, [
    cartData,
    productData,
    isBuyNow,
    isBuyAgain,
    buyNowProductQuantity,
    buyAgainData,
  ]);

  const totalSummary = useMemo(() => {
    if (isBuyNow && productData) {
      return calculateTotalSummary([
        { ...productData, quantity: buyNowProductQuantity },
      ]);
    }

    if (isBuyAgain && buyAgainData?.result) {
      return calculateTotalSummary(buyAgainData.result);
    }

    return cartData
      ? calculateTotalSummary(cartData)
      : { totalQuantity: 0, totalPrice: 0 };
  }, [
    cartData,
    productData,
    isBuyNow,
    isBuyAgain,
    buyNowProductQuantity,
    buyAgainData,
  ]);

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

    if (isBuyAgain && buyAgainData?.result) {
      return buyAgainData.result.map((item, index) => (
        <CartItem
          key={`buyagain-${index}`}
          title={item.productName || `Product ${item.productId}`}
          quantity={item.quantity}
          image={item.image}
          price={item.price}
        />
      ));
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
    <WidthWrapper className='flex justify-center items-center my-10 lg:mt-10 lg:mb-0'>
      {cartData || productData || (isBuyAgain && buyAgainData?.result) ? (
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
              isBuyAgain={isBuyAgain}
              paymentDetails={paymentDetails}
            />
          </div>
        </div>
      ) : (
        <div>
          <Button onClick={() => navigate("/products")}>Shop Now</Button>
        </div>
      )}
    </WidthWrapper>
  );
}
