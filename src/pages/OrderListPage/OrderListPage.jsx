import CardOrderList from "@/components/CardOrderList/CardOrderList";
import WidthWrapper from "@/components/WidthWrapper";
import useSnap from "@/hooks/useSnap";
import { useGetOrderQuery } from "@/redux/order/api";

export default function OrderListPage() {
  const { data: orderData } = useGetOrderQuery();
  const { snapEmbed } = useSnap();

  return (
    <WidthWrapper className='flex justify-center items-center'>
      <div className='flex flex-col lg:flex-row w-full lg:w-[90%] mx-2'>
        <div className='lg:w-[70%] w-full flex flex-col justify-center h-full items-center'>
          <div className='w-full flex flex-col px-2 lg:h-[80vh] h-[70vh] border border-black rounded-lg items-center overflow-y-auto my-2'>
            {orderData?.map((item) => (
              <CardOrderList
                key={item.id}
                orderId={item?.orderId}
                orderDate={item?.orderDate}
                orderStatus={item?.orderStatus}
                paymentId={item?.paymentId}
                snapEmbed={snapEmbed}
              />
            ))}
          </div>
        </div>
        <div className='lg:w-[30%] h-fit p-4 border border-black'>
          <div id='snap-container'></div>
        </div>
      </div>
    </WidthWrapper>
  );
}
