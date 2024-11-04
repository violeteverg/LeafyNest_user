/* eslint-disable no-unused-vars */
import { CreditCard } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
// import { formatPrice } from "@/lib/functions/formatPrice";

export default function CheckoutSummary({
  summary,
  isPaymentPage,
  paymentDetails,
}) {
  const navigate = useNavigate();
  const [isSnapVisible, setSnapVisible] = useState(false);
  const handleBuyButton = () => {
    navigate("/payment");
  };

  return (
    <>
      {!isSnapVisible && (
        <div className='w-full h-[45%] border border-black rounded-lg'>
          <div className='flex flex-col justify-center items-start p-6 space-y-8'>
            <h1 className='font-bold text-lg left-0'>Shopping Summary</h1>
            <div className='flex w-full justify-between'>
              <p>Total</p>
              <span>{isPaymentPage ? ":" : 30}</span>
              {/* <p>{formatPrice(summary?.totalPrice)}</p> */}
              <p>12000000</p>
            </div>
            {!isPaymentPage ? (
              <Button
                variant='default'
                size='lg'
                className='w-full'
                onClick={handleBuyButton}
              >
                Buy
              </Button>
            ) : (
              <Button>
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
  paymentDetails: PropTypes.any,
};
