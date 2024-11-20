import { Skeleton } from "../ui/skeleton";

export default function CardLoading() {
  return (
    <div className='w-[16vw] h-fit text-black justify-center items-center'>
      <div className='bg-[#ffffff] border border-[#f1eded] p-3 flex flex-col items-center cursor-pointer shadow-lg border-opacity-20'>
        <div className='flex items-center justify-between w-full mb-3'>
          <Skeleton className='w-20 h-6 rounded-md' />
          <Skeleton className='bg-slate-500 w-4 h-4 rounded-full opacity-10' />
        </div>
        <div className='flex flex-col justify-center items-center w-full'>
          <Skeleton className='w-[200px] h-[200px]' />
          <hr className='w-6/12 my-2 transition-all duration-300 border border-y-1 border-[#e7e7e7]' />
        </div>
        <div className='flex flex-col justify-start items-start w-full bg-[#ffffff] px-3 py-1 rounded-xl shadow-md'>
          <Skeleton className='w-40 h-6' />
          <Skeleton className='w-32 h-8 mt-2' />
        </div>
      </div>
    </div>
  );
}
