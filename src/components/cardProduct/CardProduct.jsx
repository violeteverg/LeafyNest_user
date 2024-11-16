import { formatPrice } from "@/lib/functions/formatPrice";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function CardProduct({
  id,
  title,
  price,
  image,
  discount,
  additional,
}) {
  const navigate = useNavigate();

  const priceNumber = typeof price === "string" ? parseFloat(price) : price;
  const totalDiskon =
    discount && additional ? (priceNumber * additional) / 100 : 0;
  const finalPrice = priceNumber - totalDiskon;
  const HargaFixBanget = parseFloat(finalPrice.toFixed(3));

  const cardClickHandler = (id) => {
    // setProductId(id);
    navigate(`/detail/${id}`);
  };

  return (
    <div className='lg:w-[16vw] h-fit text-black justify-center items-center'>
      <div
        className='bg-[#ffffff] hover:bg-[#faf9f9] border border-[#f1eded] hover:scale-[105%] duration-300 p-3 flex flex-col items-center cursor-pointer hover:shadow-lg hover:border-[#000000] hover:border-opacity-20 group'
        onClick={() => cardClickHandler(id)}
      >
        <div className='flex flex-col justify-center items-center w-full duration-10'>
          <img src={image} alt='product' className='lg:w-30 lg:h-48' />
          <hr className='w-6/12 my-2 transition-all duration-300 border border-y-1 border-[#e7e7e7]  ease-in-out group-hover:w-full group-hover:border-[#aeaeae]' />
        </div>
        {discount ? (
          <div className='flex flex-col justify-start items-start w-full group-hover:bg-[#ffffff] px-3 py-1 rounded-xl group-hover:shadow-md'>
            <h1 className='text-[16px] font-[400] text-[#454545]'>{title}</h1>
            <div className='flex gap-3 justify-between'>
              <p className='text-xl font-[800] font-serif '>
                {formatPrice(HargaFixBanget)}
              </p>
              <p className='text-sm font-[800] opacity-50 font-serif line-through pt-1'>
                {formatPrice(price)}
              </p>
            </div>
          </div>
        ) : (
          <div className='flex flex-col justify-start items-start w-full group-hover:bg-[#ffffff] px-3 py-1 rounded-xl group-hover:shadow-md'>
            <h1 className='text-[16px] font-[400] text-[#454545]'>{title}</h1>
            <p className='text-xl font-[800] font-serif'>
              {formatPrice(price)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

// Define PropTypes for the component
CardProduct.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  image: PropTypes.string,
  additional: PropTypes.number,
  discount: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])]),
};
