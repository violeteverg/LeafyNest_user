import { Skeleton } from "../ui/skeleton";

export default function CardOrderLoading() {
  return (
    <div className='w-full h-[20vh] my-3 bg-slate-400 rounded-lg shadow-xl'>
      <div className='w-full h-fit py-1 px-2'>
        <div className='flex flex-col h-full gap-2'>
          <div className='flex justify-between items-center h-[80%] flex-grow py-4'>
            <div className='flex items-center gap-2'></div>
            <Skeleton className='h-6 w-20 px-2 py-1 rounded' />
          </div>

          <div className='flex justify-between items-center h-[20%] py-2'>
            <Skeleton className='h-4 w-1/4' />
            <div className='flex justify-center gap-2'>
              <Skeleton className='h-8 w-20 rounded-md' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
