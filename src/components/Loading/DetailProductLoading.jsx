import { Skeleton } from "../ui/skeleton";

export default function DetailProductLoading() {
  return (
    <div className='flex flex-col lg:flex-row w-full justify-center items-start gap-8 mb-8'>
      <Skeleton className='w-full lg:w-[45%] h-64 lg:h-auto rounded-lg' />

      <div className='w-full lg:w-[55%] bg-slate-400 shadow-2xl flex flex-col justify-between p-6'>
        <div className='space-y-4'>
          <Skeleton className='h-10 w-3/4 rounded-md' />
          <Skeleton className='h-32 w-full rounded-md mt-4' />
        </div>

        <div className='mt-8 space-y-6'>
          <div className='flex items-center justify-between'>
            <Skeleton className='h-10 w-24 rounded-md' />
            <Skeleton className='h-8 w-20 rounded-md' />
          </div>
          <Skeleton className='h-6 w-40 rounded-md' />
          <div className='flex gap-4'>
            <Skeleton className='h-12 w-1/2 rounded-md' />
            <Skeleton className='h-12 w-1/2 rounded-md' />
          </div>
        </div>
      </div>
    </div>
  );
}
