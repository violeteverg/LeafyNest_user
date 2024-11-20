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

  const getBadgeColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500 ";
      case "pending":
        return "bg-yellow-500";
      case "expire":
        return "bg-red-500";
      case "cancelled":
        return "bg-blue-400";
      default:
        return "bg-gray-400";
    }
  };

  return (
    <>
      <div className='w-full h-[20vh] my-3 text-white bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg shadow-xl'>
        <div className='w-full h-fit py-1 px-2'>
          <div className='flex flex-col h-full gap-2'>
            <div className='flex justify-between items-center h-[80%] flex-grow py-4'>
              <div className='flex items-center gap-2'>
                <Cuboid />
                <p className='font-semibold italic'>{orderId}</p>
              </div>

              <Badge className={`${getBadgeColor(orderStatus)} px-2 py-1`}>
                {orderStatus}
              </Badge>
            </div>

            <div className='flex justify-between items-center h-[20%] py-2'>
              <p>{formatDate(orderDate)}</p>
              <div>
                {orderStatus === "pending" ? (
                  <div className='flex justify-center gap-2'>
                    <Button
                      className='w-fit bg-white text-teal-700 hover:bg-teal-100'
                      onClick={onStatusClick}
                    >
                      Status
                    </Button>

                    <Button
                      className='w-fit bg-rose-700 text-white hover:bg-rose-800'
                      onClick={handleOpenModal}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Button
                    className='w-fit bg-amber-500 text-white hover:bg-amber-600'
                    onClick={onReviewClick}
                  >
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
