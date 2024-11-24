import CardOrderList from "@/components/CardOrderList/CardOrderList";
import CardOrderReview from "@/components/CardOrderReview/CardOrderReview";
import CardOrderLoading from "@/components/Loading/CardOrderLoading";
import { CardOrderReviewLoading } from "@/components/Loading/CardOrderReviewLoading";
import NoContent from "@/components/NoContent/NoContent";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import WidthWrapper from "@/components/WidthWrapper";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useSnap from "@/hooks/useSnap";
import { useGetOrderByIdQuery, useGetOrderQuery } from "@/redux/order/api";
import { ClipboardList } from "lucide-react";
import { useMemo, useState } from "react";

export default function OrderListPage() {
  const { snapEmbed } = useSnap();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const [orderName, setOrderName] = useState(null);
  const { data: orderData, isLoading, isFetching } = useGetOrderQuery();

  const {
    data: orderDataId,
    isLoading: isOrderLoading,
    isFetching: isOrderFetching,
  } = useGetOrderByIdQuery({ id: selectedOrderId }, { skip: !selectedOrderId });
  const loading = isLoading || isFetching;
  const orderLoading = isOrderLoading || isOrderFetching;
  const orderProduct = orderDataId?.products;

  const [isSnapVisible, setIsSnapVisible] = useState(false);

  const handleReviewClick = (orderId, orderStatus, orderName) => {
    setOrderName(orderName);
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
    setSelectedOrderId(null);
    setOrderName(null);
  };

  const renderOrderReview = useMemo(() => {
    return (
      <div className='h-full overflow-auto rounded-lg p-2 space-y-4'>
        {orderLoading ? (
          <CardOrderReviewLoading />
        ) : (
          <>
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
          </>
        )}
      </div>
    );
  }, [orderProduct, selectedOrderStatus, orderLoading]);

  const renderSnapContainer = useMemo(() => {
    return (
      <div className='lg:w-fit'>
        <div id='snap-container' className='w-full'></div>
      </div>
    );
  }, []);

  return (
    <WidthWrapper className='flex justify-center lg:h-full py-6'>
      <div className='flex flex-col lg:flex-row lg:w-[90%] w-full border p-2 rounded-lg shadow-xl lg:gap-3'>
        <div className='lg:w-[70%] flex flex-col overflow-y-auto'>
          <div className='flex justify-between items-center'>
            <h1 className='p-6 text-2xl font-bold text-teal-800 flex items-center'>
              <ClipboardList className='mr-2' />
              My Orders
            </h1>
            {orderName && (
              <p
                className='p-6 hidden lg:flex text-lg font-semibold text-teal-800 uppercase'
                style={{ letterSpacing: "0.1rem" }}
              >
                {`:${orderName}`}
              </p>
            )}
          </div>

          <div className='w-full flex flex-col px-1 lg:px-3 my-2 space-y-4'>
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <CardOrderLoading key={i} />
              ))
            ) : orderData && orderData.length > 0 ? (
              orderData.map((item) => (
                <CardOrderList
                  key={item?.id}
                  orderId={item?.orderId}
                  orderDate={item?.orderDate}
                  orderStatus={item?.orderStatus}
                  addressName={item?.addressName}
                  orderProduct={item?.orderProduct}
                  totalAmount={item?.totalAmount}
                  vaNumber={item?.vaNumber}
                  onReviewClick={() =>
                    handleReviewClick(
                      item?.id,
                      item?.orderStatus,
                      item?.orderId
                    )
                  }
                  onStatusClick={() => handleOpenMidtrans(item?.paymentId)}
                />
              ))
            ) : (
              <NoContent description='There are no orders to display. Please buy products to view your orders.' />
            )}
          </div>
        </div>

        <div className='lg:w-[30%] sticky '>
          {isDesktop ? (
            isSnapVisible && orderDataId ? (
              <div className='fixed right-[7%] inset-y-[7rem] my-2 h-[80%] w-[24%] border rounded-lg shadow-md p-4'>
                {renderOrderReview}
              </div>
            ) : (
              <div className='fixed right-[10%] top-[80px] w-[24%]'>
                {renderSnapContainer}
              </div>
            )
          ) : (
            <Drawer open={isSnapVisible} onOpenChange={setIsSnapVisible}>
              <DrawerContent>
                <DrawerHeader>
                  <DrawerTitle className='p-6 text-lg font-semibold text-teal-800 uppercase'>{`order: ${orderName}`}</DrawerTitle>
                </DrawerHeader>
                <div className='h-[calc(100vh-230px)]'>
                  {orderDataId ? renderOrderReview : null}
                </div>
              </DrawerContent>
            </Drawer>
          )}
        </div>

        {!isDesktop && renderSnapContainer}
      </div>
    </WidthWrapper>
  );
}
