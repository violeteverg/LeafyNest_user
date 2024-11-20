export default function NotFoundPage() {
  return (
    <div className='h-[100vh] w-full flex flex-col lg:flex-row justify-center items-center space-y-4'>
      <img src='/bg-404.png' alt='nodata' width={250} height={250} />
      <div className='flex flex-col items-center justify-center w-[90%] lg:w-[35%] space-y-2'>
        <h1 className='text-3xl lg:text-5xl'>404 - Page Not Found</h1>
        <p className='text-center'>
          Sorry, the page you are looking for could not be found.
        </p>
      </div>
    </div>
  );
}
