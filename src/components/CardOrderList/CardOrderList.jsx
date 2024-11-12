import { CircleCheckBigIcon, CircleX, Cuboid } from "lucide-react";
import { Button } from "../ui/button";
import PropTypes from "prop-types";
import { cn, formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import ConfirmModal from "../ComfirmModal/ComfirmModal";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCancelOrderMutation } from "@/redux/order/api";

export default function CardOrderList({
  orderId,
  orderDate,
  orderStatus,
  onStatusClick,
  onReviewClick,
}) {
  const { toast } = useToast();
  const [isModalOpen, setModalOpen] = useState(false);
  const [cancelOrder] = useCancelOrderMutation();

  const handleCancelOrder = async () => {
    try {
      await cancelOrder({ body: { orderId } });
      setModalOpen(false);
      toast({
        variant: "success",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleCheckBigIcon className='text-green-600' />
            <p>Order {orderId} has been canceled successfully.</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    } catch (error) {
      console.error("Error canceling order:", error);
      toast({
        variant: "destructive",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleX />
            <p>{error.message || "Failed to cancel order"}</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    }
  };

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  return (
    <>
      <div className='w-full h-full my-3'>
        <div className='w-full h-fit border border-black py-1 px-2'>
          <div className='flex flex-col h-full gap-2'>
            <div className='flex justify-between items-center h-[80%] flex-grow py-4'>
              <div className='flex items-center gap-2'>
                <Cuboid />
                <p className='font-semibold italic'>{orderId}</p>
              </div>
              <Badge>{orderStatus}</Badge>
            </div>

            <div className='flex justify-between items-center h-[20%] py-2'>
              <p>{formatDate(orderDate)}</p>
              <div className='flex justify-center gap-2'>
                <Button className='w-fit' onClick={onStatusClick}>
                  Status
                </Button>
                {orderStatus === "pending" ? (
                  <Button className='w-fit' onClick={handleOpenModal}>
                    Cancel
                  </Button>
                ) : (
                  <Button className='w-fit' onClick={onReviewClick}>
                    Review
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        buttonTitle='Cancel Order'
        buttonDescription='Are you sure you want to cancel the order?'
        onClickConfirm={handleCancelOrder}
      />
    </>
  );
}

CardOrderList.propTypes = {
  orderId: PropTypes.string,
  orderDate: PropTypes.string,
  orderStatus: PropTypes.string,
  onReviewClick: PropTypes.func,
  onStatusClick: PropTypes.func,
};
