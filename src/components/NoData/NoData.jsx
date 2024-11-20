export default function NoData() {
  return (
    <div className=' w-full flex flex-col justify-center items-center space-y-4'>
      <img src='/no_data.png' alt='nodata' width={150} height={150} />
      <div className='flex flex-col w-[90%] lg:w-[30%] space-y-2'>
        <p className='text-gray-500 text-center'>No Data</p>
      </div>
    </div>
  );
}
