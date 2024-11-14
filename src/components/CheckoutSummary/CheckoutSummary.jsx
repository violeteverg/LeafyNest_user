import { CircleX, CreditCard } from "lucide-react";
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
  const [isSnapVisible, setSnapVisible] = useState(false);

  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const bodyPayment = {
    totalAmount: summary.totalPrice,
    orderItems: paymentDetails,
    addressName: address?.fullAddress,
    isBuyNow,
  };

  const openSnap = (token) => {
    setSnapVisible(true);
    snapEmbed(token, "snap-container", {
      onSuccess: () => setSnapVisible(false),
      onPending: () => setSnapVisible(false),
      onClose: () => setSnapVisible(false),
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
        if (result?.token) {
          openSnap(result.token);
          const newUrl = `${location.pathname}?token=${result.token}`;
          navigate(newUrl, { replace: true });
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <>
      {!isSnapVisible && (
        <div className='w-full border rounded-lg bg-gradient-to-bl from-teal-400 to-teal-700 shadow-lg'>
          <div className='flex flex-col p-6 space-y-6'>
            <h1 className='text-lg font-semibold text-white'>
              Shopping Summary
            </h1>
            <div className='flex w-full justify-between items-center'>
              <p className='text-white font-medium'>Total Items:</p>
              <span className='text-white'>{summary.totalQuantity}</span>
            </div>
            <div className='flex w-full justify-between items-center'>
              <p className='text-white font-medium'>Total Price:</p>
              <p className='text-white font-semibold'>
                {formatPrice(summary?.totalPrice)}
              </p>
            </div>
            {!isPaymentPage ? (
              <Button
                variant='default'
                size='lg'
                className='w-full bg-amber-500 text-white hover:bg-amber-600'
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
                  className='w-full  bg-slate-600 text-white hover:bg-slate-700'
                  onClick={() => navigate(-1)}
                  disabled={isLoading}
                >
                  <CircleX />
                  Cancel
                </Button>
                <Button
                  variant='default'
                  size='lg'
                  className='w-full bg-amber-500 text-white hover:bg-amber-600'
                  onClick={handleBuyButton}
                  disabled={isLoading}
                >
                  <CreditCard />
                  Payment
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
      <div id='snap-container'></div>
    </>
  );
}

CheckoutSummary.propTypes = {
  summary: PropTypes.any,
  isPaymentPage: PropTypes.bool,
  isBuyNow: PropTypes.bool,
  paymentDetails: PropTypes.any,
};
