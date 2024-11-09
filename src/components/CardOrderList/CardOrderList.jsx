import { Cuboid } from "lucide-react";
import { Button } from "../ui/button";
import PropTypes from "prop-types";
import { formatDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

export default function CardOrderList({
  orderId,
  orderDate,
  orderStatus,
  onStatusClick,
  onReviewClick,
}) {
  return (
    <div className='w-full h-full my-3'>
      <div className='w-full h-fit border border-black py-1 px-2'>
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
            <div className='flex justify-center gap-2'>
              <Button className='w-fit' onClick={onStatusClick}>
                Status
              </Button>
              <Button className='w-fit' onClick={onReviewClick}>
                Review
              </Button>
            </div>
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
  onReviewClick: PropTypes.func,
  onStatusClick: PropTypes.func,
};
