import CardOrderList from "@/components/CardOrderList/CardOrderList";
import CardOrderReview from "@/components/CardOrderReview/CardOrderReview";
import NoContent from "@/components/NoContent/NoContent";
import { Button } from "@/components/ui/button";
import WidthWrapper from "@/components/WidthWrapper";
import useSnap from "@/hooks/useSnap";
import {
  // useCancelOrderMutation,
  useGetOrderByIdQuery,
  useGetOrderQuery,
} from "@/redux/order/api";
import { ClipboardList } from "lucide-react";
import { useState } from "react";

export default function OrderListPage() {
  const { snapEmbed } = useSnap();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const { data: orderData, isLoading } = useGetOrderQuery();
  const { data: orderDataId } = useGetOrderByIdQuery(
    { id: selectedOrderId },
    { skip: !selectedOrderId }
  );
  const orderProduct = orderDataId?.products;

  const [isSnapVisible, setIsSnapVisible] = useState(false);

  const handleReviewClick = (orderId, orderStatus) => {
    setSelectedOrderStatus(orderStatus);
    setSelectedOrderId(orderId);
    setIsSnapVisible(true);
  };
  const handleOpenMidtrans = (paymentId) => {
    setIsSnapVisible(false);

    snapEmbed(paymentId, "snap-container", {
      onSuccess: (res) => {
        console.log("Payment successful:", res);
        setIsSnapVisible(false);
      },
      onPending: (res) => {
        console.log("Payment pending:", res);
        setIsSnapVisible(false);
      },
      onClose: () => {
        console.log("Payment closed by user");
        setIsSnapVisible(false);
      },
    });
  };

  const handleCloseButton = () => {
    setIsSnapVisible(false);
  };

  if (isLoading) {
    return null;
  }

  return (
    <WidthWrapper className='flex justify-center lg:h-[88vh] py-6 '>
      {orderData && orderData.length > 0 ? (
        <div className='flex flex-col lg:flex-row lg:w-[80%] w-full border p-2 rounded-lg shadow-xl lg:gap-3 overflow-hidden'>
          <div className='lg:w-[70%] flex flex-col'>
            <h1 className='p-6 text-2xl font-bold text-teal-800 flex items-center'>
              <ClipboardList className='mr-2' />
              My Orders
            </h1>
            <div className='w-full flex flex-col px-1 lg:px-3 h-[calc(100vh-230px)] lg:h-[70vh] overflow-y-auto my-2 space-y-4'>
              {isLoading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <div key={i} className='animate-pulse flex space-x-4'>
                      <div className='rounded-lg bg-teal-200 h-24 w-24'></div>
                      <div className='flex-1 space-y-4 py-1'>
                        <div className='h-4 bg-teal-200 rounded w-3/4'></div>
                        <div className='space-y-2'>
                          <div className='h-4 bg-teal-200 rounded'></div>
                          <div className='h-4 bg-teal-200 rounded w-5/6'></div>
                        </div>
                      </div>
                    </div>
                  ))
                : orderData.map((item) => (
                    <CardOrderList
                      key={item.id}
                      orderId={item?.orderId}
                      orderDate={item?.orderDate}
                      orderStatus={item?.orderStatus}
                      onReviewClick={() =>
                        handleReviewClick(item.id, item.orderStatus)
                      }
                      onStatusClick={() => handleOpenMidtrans(item.paymentId)}
                    />
                  ))}
            </div>
          </div>
          <div className='lg:w-[30%]'>
            {isSnapVisible && orderDataId ? (
              <div className='h-full overflow-auto   rounded-lg p-3 space-y-6'>
                {orderProduct?.map((item) => (
                  <CardOrderReview
                    key={item.id}
                    id={item.id}
                    image={item.image}
                    title={item.title}
                    quantity={item.quantity}
                    orderStatus={selectedOrderStatus}
                  />
                ))}
                <Button
                  onClick={handleCloseButton}
                  className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white'
                >
                  Close
                </Button>
              </div>
            ) : (
              <div className='lg:w-fit border border-black'>
                <div id='snap-container' className='w-full'></div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <NoContent description='There are no orders to display. Please buy products to view your orders.' />
      )}
    </WidthWrapper>
  );
}
