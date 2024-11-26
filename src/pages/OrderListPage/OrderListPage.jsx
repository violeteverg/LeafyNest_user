import { useMemo, useState } from "react";
import { ClipboardList } from "lucide-react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import useSnap from "@/hooks/useSnap";
import { useGetOrderByIdQuery, useGetOrderQuery } from "@/redux/order/api";
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

export default function OrderListPage() {
  const { snapEmbed } = useSnap();
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [selectedOrderStatus, setSelectedOrderStatus] = useState(null);
  const [orderName, setOrderName] = useState(null);
  const [isSnapVisible, setIsSnapVisible] = useState(false);
  const [isMidtransOpen, setIsMidtransOpen] = useState(false);

  const { data: orderData, isLoading, isFetching } = useGetOrderQuery();
  const {
    data: orderDataId,
    isLoading: isOrderLoading,
    isFetching: isOrderFetching,
  } = useGetOrderByIdQuery({ id: selectedOrderId }, { skip: !selectedOrderId });

  const loading = isLoading || isFetching;
  const orderLoading = isOrderLoading || isOrderFetching;
  const orderProduct = orderDataId?.products;

  const handleReviewClick = (orderId, orderStatus, orderName) => {
    setOrderName(orderName);
    setSelectedOrderStatus(orderStatus);
    setSelectedOrderId(orderId);
    setIsSnapVisible(true);
    setIsMidtransOpen(false);
  };

  const handleOpenMidtrans = (paymentId) => {
    setSelectedOrderId(null);
    setIsSnapVisible(false);
    setOrderName(null);
    setIsMidtransOpen(true);

    setTimeout(() => {
      snapEmbed(paymentId, "snap-container", {
        onSuccess: (res) => {
          console.log("Payment successful:", res);
          setIsMidtransOpen(false);
        },
        onPending: (res) => {
          console.log("Payment pending:", res);
          setIsMidtransOpen(false);
        },
        onError: (err) => {
          console.error("Payment error:", err);
          setIsMidtransOpen(false);
        },
        onClose: () => {
          console.log("Payment closed by user");
          setIsMidtransOpen(false);
        },
      });
    }, 0);
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
      <div className='lg:w-full '>
        <div id='snap-container' className='w-full'></div>
      </div>
    );
  }, []);

  return (
    <WidthWrapper className='flex justify-center space-x-2 lg:w-[85%] mx-auto lg:h-full py-6'>
      <div className='flex flex-col justify-between lg:flex-row w-full border p-2 rounded-lg shadow-xl lg:gap-3'>
        <div className='lg:w-[100%] flex flex-col overflow-y-auto'>
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

        {!isDesktop && isMidtransOpen && renderSnapContainer}
      </div>
      <div className='lg:w-[30%] overflow-auto sticky '>
        {isDesktop ? (
          isSnapVisible && orderDataId ? (
            <div className='fixed  inset-y-[7rem] my-2 h-[80%] w-[24%] border rounded-lg shadow-md p-4'>
              {renderOrderReview}
            </div>
          ) : isMidtransOpen ? (
            <div className='fixed lg:w-[25%]'>{renderSnapContainer}</div>
          ) : null
        ) : (
          <Drawer open={isSnapVisible}>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle className='p-6 text-lg font-semibold text-teal-800 uppercase'>
                  {isSnapVisible ? `Order: ${orderName}` : "Payment"}
                </DrawerTitle>
              </DrawerHeader>
              <div className='h-[calc(100vh-230px)]'>
                {isSnapVisible && renderOrderReview}
              </div>
            </DrawerContent>
          </Drawer>
        )}
      </div>
    </WidthWrapper>
  );
}
