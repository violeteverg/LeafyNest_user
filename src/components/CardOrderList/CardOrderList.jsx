import { Cuboid } from "lucide-react";
import { Button } from "../ui/button";
import PropTypes from "prop-types";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function CardOrderList({
  orderId,
  orderDate,
  orderStatus,
  paymentId,
  snapEmbed,
}) {
  const handleOpenMidtrans = () => {
    console.log(paymentId, "ini payment id yang jalan");
    snapEmbed(paymentId, "snap-container", {
      onSuccess: (res) => {
        console.log("Payment successful:", res);
      },
      onPending: (res) => {
        console.log("Payment pending:", res);
      },
      onClose: () => {
        console.log("Payment closed by user");
      },
    });
  };

  return (
    <div className='w-full h-full my-3' onClick={handleOpenMidtrans}>
      <div className='w-full h-fit border border-black py-1 px-2 cursor-pointer'>
        <div className='flex flex-col h-full gap-2'>
          <div className='flex justify-between items-center h-[80%] flex-grow py-4'>
            <div className='flex items-center'>
              <Cuboid />
              <p>{orderId}</p>
            </div>
            <Badge>{orderStatus}</Badge>
          </div>

          <div className='flex justify-between items-center h-[20%] py-2'>
            <p>{formatDate(orderDate)}</p>
            <Button className='w-[25%] lg:w-[15%]'>Review</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

CardOrderList.propTypes = {
  orderId: PropTypes.string,
  orderDate: PropTypes.string,
  orderStatus: PropTypes.string,
  paymentId: PropTypes.string,
  snapEmbed: PropTypes.func.isRequired,
};
