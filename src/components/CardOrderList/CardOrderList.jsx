/* eslint-disable react/prop-types */
import { CircleCheckBigIcon, CircleX, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import PropTypes from "prop-types";
import { cn, formatDate, formatPrice } from "@/lib/utils";
import { Badge } from "../ui/badge";
import ConfirmModal from "../ComfirmModal/ComfirmModal";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useCancelOrderMutation } from "@/redux/order/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function CardOrderList({
  orderId,
  orderDate,
  orderStatus,
  orderProduct,
  totalAmount,
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
          "top-0 right-0 border bg-white border-green-500  flex fixed !z-[99999] bg-white md:max-w-[420px] md:top-4 md:right-4"
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

  const renderProductItem = (product) => (
    <div
      key={product.id}
      className='flex items-center text-lg gap-2 w-full bg-white/10 rounded mt-2 p-2'
    >
      <img
        src={product.image}
        alt={product.productName}
        className='w-16 h-16 object-cover rounded'
      />
      <div className='flex flex-col'>
        <p className='line-clamp-1'>{product.productName}</p>
        <p className='text-sm'>
          {product.quantity}x ${product.price}
        </p>
      </div>
    </div>
  );

  const renderProducts = () => {
    if (!orderProduct || orderProduct.length === 0) {
      return <p>No products</p>;
    }

    if (orderProduct.length === 1) {
      return renderProductItem(orderProduct[0]);
    }

    return (
      <Accordion type='single' collapsible className='w-full'>
        <AccordionItem value='products'>
          <AccordionTrigger className='text-white text-lg hover:text-white hover:no-underline'>
            {renderProductItem(orderProduct[0])}
          </AccordionTrigger>
          <AccordionContent>
            {orderProduct.slice(1).map(renderProductItem)}
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    );
  };

  return (
    <>
      <div className='w-full h-fit bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg shadow-xl text-white p-4 space-y-4'>
        <div className='w-full p-4 rounded-lg shadow-lg text-white'>
          <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3'>
            <div className='flex flex-col gap-2 w-full sm:w-auto'>
              <div className='flex items-center gap-2'>
                <ShoppingBag className='h-4 w-4' />
                <p className='text-sm font-medium'>{`Belanja: ${formatDate(
                  orderDate
                )}`}</p>
              </div>
              <p className='text-sm'>Order ID: {orderId}</p>
            </div>

            <div className='flex flex-col sm:flex-row sm:items-center gap-2 w-full sm:w-auto sm:justify-end'>
              <Badge
                className={cn(
                  getBadgeColor(orderStatus),
                  "px-3 py-1 text-xs font-semibold rounded-full"
                )}
              >
                {orderStatus}
              </Badge>
              <p className='font-medium text-sm sm:text-base'>{`Total: ${formatPrice(
                totalAmount
              )}`}</p>
            </div>
          </div>
        </div>

        {renderProducts()}

        <div className='flex flex-wrap justify-end items-center gap-2'>
          <div className='flex gap-2'>
            {orderStatus === "pending" ? (
              <>
                <Button variant='secondary' size='sm' onClick={onStatusClick}>
                  Status
                </Button>
                <Button
                  variant='destructive'
                  size='sm'
                  onClick={handleOpenModal}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant='secondary' size='sm' onClick={onReviewClick}>
                Review
              </Button>
            )}
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
  addressName: PropTypes.string,
  totalAmount: PropTypes.number,
  onReviewClick: PropTypes.func,
  onStatusClick: PropTypes.func,
};
