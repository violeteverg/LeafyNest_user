import CardOrderList from "@/components/CardOrderList/CardOrderList";
import CardOrderReview from "@/components/CardOrderReview/CardOrderReview";
import { Button } from "@/components/ui/button";
import WidthWrapper from "@/components/WidthWrapper";
import useSnap from "@/hooks/useSnap";
import { useGetOrderByIdQuery, useGetOrderQuery } from "@/redux/order/api";
import { useState } from "react";

export default function OrderListPage() {
  const { data: orderData } = useGetOrderQuery();
  const { snapEmbed } = useSnap();
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
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
    console.log(paymentId, "ini payment id");
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

  return (
    <WidthWrapper className='flex justify-center items-center'>
      <div className='flex flex-col lg:flex-row w-full lg:w-[90%] mx-2 lg:gap-5'>
        <div className='lg:w-[70%] w-full flex flex-col justify-center h-full items-center'>
          <div className='w-full flex flex-col px-2 lg:h-[80vh] h-[70vh] border border-black rounded-lg items-center overflow-y-auto my-2'>
            {orderData?.map((item) => (
              <CardOrderList
                key={item.id}
                orderId={item?.orderId}
                orderDate={item?.orderDate}
                orderStatus={item?.orderStatus}
                onReviewClick={() =>
                  handleReviewClick(item?.id, item?.orderStatus)
                }
                onStatusClick={() => handleOpenMidtrans(item?.paymentId)}
              />
            ))}
          </div>
        </div>
        <div className='lg:w-fit  p-4 '>
          {isSnapVisible && orderDataId && (
            <div className='h-full overflow-auto border border-black p-2'>
              {orderProduct.map((item) => (
                <CardOrderReview
                  key={item?.id}
                  id={item?.id}
                  image={item?.image}
                  title={item?.title}
                  quantity={item?.quantity}
                  orderStatus={selectedOrderStatus}
                />
              ))}
              <Button onClick={handleCloseButton}>close</Button>
            </div>
          )}
          <div className='lg:w-fit border border-black'>
            <div id='snap-container'></div>
          </div>
        </div>
      </div>
    </WidthWrapper>
  );
}
