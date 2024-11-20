export default function NoData() {
  return (
    <div className=' w-full flex flex-col justify-center items-center'>
      <img src='/bg-nodata.png' alt='nodata' width={100} height={150} />
      <div className='flex flex-col w-[90%] lg:w-[30%] space-y-2'>
        <p className='text-gray-500 text-center'>No Data</p>
      </div>
    </div>
  );
}
