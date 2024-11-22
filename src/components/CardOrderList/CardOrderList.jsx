/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { CircleCheckBigIcon, CircleX, Cuboid, ShoppingBag } from "lucide-react";
import { Button } from "../ui/button";
import PropTypes from "prop-types";
import { cn, formatDate } from "@/lib/utils";
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

  const hasMultipleProducts = orderProduct && orderProduct.length > 1;

  return (
    <>
      <div className='w-full h-fit bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg shadow-xl text-white p-4 space-y-4'>
        <div className='flex flex-col gap-3 text-white relative'>
          <div className='flex items-center gap-2'>
            <ShoppingBag className='h-4 w-4' />
            <p className='text-sm'>{`Belanja: ${formatDate(orderDate)}`}</p>
          </div>

          <p className='text-sm font-medium'>Order ID: {orderId}</p>

          <Badge
            className={`${getBadgeColor(
              orderStatus
            )} px-3 py-1 rounded-md absolute right-0 top-0`}
          >
            {orderStatus}
          </Badge>
        </div>

        {orderProduct && orderProduct.length > 0 ? (
          hasMultipleProducts ? (
            <Accordion type='single' collapsible className='w-full '>
              <AccordionItem value='products'>
                <AccordionTrigger className='text-white text-lg hover:text-white hover:no-underline'>
                  <div className='flex items-center gap-2 w-full'>
                    <img
                      src={orderProduct[0].image}
                      alt={orderProduct[0].productName}
                      className='w-16 h-16 object-cover rounded'
                    />
                    <div className='flex flex-col'>
                      <p className=' line-clamp-1 text-left'>
                        {orderProduct[0].productName}
                      </p>
                      <p className='text-sm'>
                        {orderProduct[0].quantity}x ${orderProduct[0].price}
                      </p>
                    </div>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {orderProduct.slice(1).map((product) => (
                    <div
                      key={product.id}
                      className='flex items-center text-lg gap-2 w-full bg-white/10 rounded  mt-2'
                    >
                      <img
                        src={product.image}
                        alt={product.productName}
                        className='w-16 h-16 object-cover rounded'
                      />
                      <div className='flex flex-col'>
                        <p className=' line-clamp-1'>{product.productName}</p>
                        <p className='text-sm'>
                          {product.quantity}x ${product.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          ) : (
            <div className='flex items-center gap-2 w-full bg-white/10 rounded p-2'>
              <img
                src={orderProduct[0].image}
                alt={orderProduct[0].productName}
                className='w-16 h-16 object-cover rounded'
              />
              <div className='flex flex-col'>
                <p className='font-medium line-clamp-1'>
                  {orderProduct[0].productName}
                </p>
                <p className='text-sm'>
                  {orderProduct[0].quantity}x ${orderProduct[0].price}
                </p>
              </div>
            </div>
          )
        ) : (
          <p>No products</p>
        )}

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
  onReviewClick: PropTypes.func,
  onStatusClick: PropTypes.func,
};
