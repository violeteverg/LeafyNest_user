/* eslint-disable no-unused-vars */
import { CreditCard } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "@/lib/functions/formatPrice";
import useSnap from "@/hooks/useSnap";
import { useCreateOrderMutation } from "@/redux/order/api";

export default function CheckoutSummary({
  summary,
  isPaymentPage,
  isBuyNow,
  paymentDetails,
}) {
  const navigate = useNavigate();
  const [isSnapVisible, setSnapVisible] = useState(false);

  const [createOrder, { isLoading, isSuccess, isError, data }] =
    useCreateOrderMutation();

  const bodyPayment = {
    totalAmount: summary.totalPrice,
    orderItems: paymentDetails,
    addressName: "jl bahagia",
    isBuyNow,
  };

  const handleBuyButton = async () => {
    if (!isPaymentPage) {
      navigate("/payment");
    } else {
      try {
        const result = await createOrder({ body: bodyPayment }).unwrap();
        console.log("Order created:", result);

        if (result?.token) {
          setSnapVisible(true);
          snapEmbed(result.token, "snap-container", {
            onSuccess: (res) => {
              console.log("Payment success:", res);
              setSnapVisible(false);
            },
            onPending: (res) => {
              console.log("Payment pending:", res);
              setSnapVisible(false);
            },
            onClose: () => {
              console.log("Payment closed");
              setSnapVisible(false);
            },
          });
        } else {
          console.error("No token found in response");
        }
      } catch (error) {
        console.error("Error in handleBuyButton:", error);
      }
    }
  };

  const { snapEmbed } = useSnap();

  return (
    <>
      {!isSnapVisible && (
        <div className='w-full h-[45%] border border-black rounded-lg'>
          <div className='flex flex-col justify-center items-start p-6 space-y-8'>
            <h1 className='font-bold text-lg left-0'>Shopping Summary</h1>
            <div className='flex w-full justify-between'>
              <p>Total</p>
              <span>{isPaymentPage ? ":" : summary.totalQuantity}</span>
              <p>{formatPrice(summary?.totalPrice)}</p>
            </div>
            {!isPaymentPage ? (
              <Button
                variant='default'
                size='lg'
                className='w-full'
                onClick={handleBuyButton}
                disabled={isLoading}
              >
                Buy
              </Button>
            ) : (
              <Button
                variant='default'
                size='lg'
                className='w-full'
                onClick={handleBuyButton}
                disabled={isLoading}
              >
                <CreditCard className='mr-2' />
                <p>Payment</p>
              </Button>
            )}
          </div>
        </div>
      )}
      <div>
        <div id='snap-container'></div>
      </div>
    </>
  );
}

CheckoutSummary.propTypes = {
  summary: PropTypes.any,
  isPaymentPage: PropTypes.bool,
  isBuyNow: PropTypes.bool,
  paymentDetails: PropTypes.any,
};
