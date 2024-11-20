import { Skeleton } from "../ui/skeleton";
import PropTypes from "prop-types";

export default function CardCartLoading({ isCartPage }) {
  if (!isCartPage) {
    return (
      <div className='w-full my-3'>
        <div className='w-full flex items-center bg-slate-400  rounded-lg p-4 transition-all duration-200 hover:shadow-md'>
          <Skeleton className='w-24 h-24 rounded-md mr-3' />
          <div className='flex justify-between w-full items-center gap-2'>
            <Skeleton className='h-6 w-1/3' />
            <div className='flex items-center space-x-2'>
              <Skeleton className='h-4 w-8' />
              <Skeleton className='h-4 w-4' />
              <Skeleton className='h-4 w-16' />
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className='w-full my-4'>
      <div className='w-full flex items-center bg-slate-400 rounded-lg p-2 transition-all duration-200 hover:shadow-xl'>
        <Skeleton className='w-24 h-24 rounded-md mr-4' />
        <div className='flex justify-between w-full gap-1 items-center'>
          <div className='flex flex-col'>
            <Skeleton className='h-6 w-24 mb-2' />
            <Skeleton className='h-4 w-16' />
          </div>
          <div className='flex items-center lg:space-x-2'>
            <Skeleton className='h-6 w-24 mb-2' />
            <Skeleton className='h-4 w-16' />
          </div>
        </div>
      </div>
    </div>
  );
}

CardCartLoading.propTypes = {
  isCartPage: PropTypes.bool,
};
