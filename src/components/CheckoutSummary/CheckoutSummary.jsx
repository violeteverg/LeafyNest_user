/* eslint-disable no-unused-vars */
import { CreditCard } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../ui/button";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { formatPrice } from "@/lib/functions/formatPrice";
import useSnap from "@/hooks/useSnap";
import { useCreateOrderMutation } from "@/redux/order/api";
import { useSelector } from "react-redux";

export default function CheckoutSummary({
  summary,
  isPaymentPage,
  isBuyNow,
  paymentDetails,
}) {
  const { address } = useSelector((state) => state.app);

  const { snapEmbed } = useSnap();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const paramsToken = searchParams.get("token");
  console.log(paramsToken, "ini params token");
  const [isSnapVisible, setSnapVisible] = useState(false);

  const [createOrder, { isLoading, isSuccess, isError, data }] =
    useCreateOrderMutation();

  const bodyPayment = {
    totalAmount: summary.totalPrice,
    orderItems: paymentDetails,
    addressName: address?.fullAddress,
    isBuyNow,
  };

  console.log(isSnapVisible, "ini snpa visible");
  const openSnap = (token) => {
    setSnapVisible(true);
    snapEmbed(token, "snap-container", {
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
  };

  const handleBuyButton = async () => {
    if (!isPaymentPage) {
      navigate("/payment");
      return;
    }

    if (paramsToken) {
      openSnap(paramsToken);
    } else {
      try {
        const result = await createOrder({ body: bodyPayment }).unwrap();
        console.log("Order created:", result);

        if (result?.token) {
          openSnap(result.token);
          const newUrl = `${location.pathname}?token=${result.token}`;
          navigate(newUrl, { replace: true });
        } else {
          console.error("No token found in response");
        }
      } catch (error) {
        console.error("Error in handleBuyButton:", error);
      }
    }
  };

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
              <div className='space-y-4'>
                <Button
                  variant='default'
                  size='lg'
                  className='w-full'
                  onClick={() => {
                    navigate(-1);
                  }}
                  disabled={isLoading}
                >
                  <CreditCard className='mr-2' />
                  <p>Cancel</p>
                </Button>
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
              </div>
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
