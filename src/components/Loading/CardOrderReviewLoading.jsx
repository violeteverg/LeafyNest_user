import { Skeleton } from "../ui/skeleton";

export function CardOrderReviewLoading() {
  return (
    <div className='w-full max-w-full p-4 space-y-4 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 ease-in-out'>
      <div className='flex items-start gap-4'>
        <Skeleton className='w-20 h-20 rounded-lg' />
        <div className='space-y-2'>
          <Skeleton className='h-5 w-32' />
          <Skeleton className='h-4 w-24' />
        </div>
      </div>

      <div className='space-y-4'>
        <Skeleton className='w-full h-[100px]' />

        <div className='flex items-center gap-2'>
          <Skeleton className='h-4 w-12' />
          <div className='flex gap-1'>
            {[1, 2, 3, 4, 5].map((value) => (
              <Skeleton key={value} className='w-5 h-5 rounded-full' />
            ))}
          </div>
        </div>

        <Skeleton className='w-full h-10' />
      </div>
    </div>
  );
}
