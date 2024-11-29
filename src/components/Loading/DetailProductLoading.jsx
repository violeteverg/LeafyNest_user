import { Skeleton } from "@/components/ui/skeleton";

export default function DetailProductLoading() {
  return (
    <div className='flex flex-col lg:flex-row w-full justify-center items-start gap-8 mb-8'>
      <Skeleton className='h-[50vh] lg:h-full mb-4 lg:mb-0 lg:w-[45%] w-full rounded-lg' />

      <div className='w-full lg:w-[55%] bg-gradient-to-br from-teal-700 to-teal-900 rounded-lg shadow-2xl flex flex-col justify-between p-6'>
        <div className='space-y-4'>
          <Skeleton className='h-10 w-3/4 rounded-md bg-teal-600/50' />
          <div className='w-full h-[150px] lg:h-[200px] mt-4 lg:mt-6'>
            <Skeleton className='h-full w-full rounded-md bg-teal-600/50' />
          </div>
        </div>

        <div className='mt-8 space-y-6'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-10 w-32 rounded-md bg-teal-600/50' />
            <Skeleton className='h-8 w-20 rounded-md bg-teal-600/50' />
          </div>
          <div className='flex justify-between items-center'>
            <Skeleton className='h-6 w-40 rounded-md bg-teal-600/50' />
            <Skeleton className='h-8 w-24 rounded-md bg-teal-600/50' />
          </div>
          <div className='flex gap-4'>
            <Skeleton className='h-12 w-1/2 rounded-md bg-teal-600/50' />
            <Skeleton className='h-12 w-1/2 rounded-md bg-teal-600/50' />
          </div>
        </div>
      </div>
    </div>
  );
}
