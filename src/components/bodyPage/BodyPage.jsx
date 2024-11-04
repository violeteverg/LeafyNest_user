import PropTypes from "prop-types";
import { PaginationProduct } from "../PaginationProduct/PaginationProduct";
export default function Bodypage({
  image,
  text,
  children,
  pageCount,
  currentPage,
  onPageChange,
  isHasData,
}) {
  return (
    <div className='flex-1 overflow-y-auto'>
      <div className='flex flex-col justify-center items-center'>
        <div
          className='w-full h-[300px] mb-4 bg-cover bg-center -z-10 '
          style={{ backgroundImage: `url(${image})` }}
        >
          <div className='flex items-end justify-start w-full h-full bg-black bg-opacity-20'>
            <div className='bg-black bg-opacity-40 p-[1%] h-full flex items-end w-[60%] lg:w-[40%] rounded-tr-full'>
              <div className='text-[60px] text-white font-[500] m-2 leading-[0.9] drop-shadow-lg '>
                <p>
                  Find your
                  <span className='block font-[800] drop-shadow-xl  text-[#beff7e]'>
                    {text}
                  </span>
                  here
                </p>
              </div>
            </div>
          </div>
        </div>
        {isHasData ? (
          <>
            <div className='rounded-[5px] mb-2 border overflow-hidden'>
              <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 m-2'>
                {children}
              </div>
            </div>
            <div className='my-2 w-full'>
              <PaginationProduct
                pageCount={pageCount}
                currentPage={currentPage}
                onPageChange={onPageChange}
              />
            </div>
          </>
        ) : (
          <div>
            <p>no data</p>
          </div>
        )}
      </div>
    </div>
  );
}

// Define PropTypes for the component
Bodypage.propTypes = {
  image: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  pageCount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  isHasData: PropTypes.bool,
  onPageChange: PropTypes.func.isRequired,
};
