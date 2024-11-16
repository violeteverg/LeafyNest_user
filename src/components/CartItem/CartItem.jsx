import { Button } from "../ui/button";
import { checkQuantity } from "@/lib/functions/checkQuantity";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { formatPrice } from "@/lib/functions/formatPrice";
import { useRemoveCartMutation, useUpdateCartMutation } from "@/redux/cart/api";

export default function CartItem({
  id,
  image,
  quantity,
  title,
  productQuantity,
  price,
  isCartPage,
  isPaymentPage,
}) {
  const [newQuantity, setNewQuantity] = useState(quantity);

  const [updateCart] = useUpdateCartMutation();
  const [removeCart] = useRemoveCartMutation();

  const handleUpdateQuantity = async (newQty) => {
    if (newQty > 0) {
      setNewQuantity(newQty);
      await updateCart({ id, quantity: newQty });
    }
  };
  const handleRemoveCart = (id) => {
    removeCart({ id });
  };
  if (!isCartPage || isPaymentPage) {
    return (
      <div className='w-full my-3'>
        <div className='w-full flex items-center bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg p-4  transition-all duration-200 hover:shadow-md'>
          <img
            src={image}
            alt={title}
            className='w-24 h-24 object-cover rounded-md mr-3'
          />
          <div className='flex justify-between w-full items-center gap-2'>
            <h2 className='text-lg font-semibold text-white'>{title}</h2>
            <div className='flex items-center space-x-2 text-white'>
              <span>{quantity}</span>
              <span>x</span>
              <span className='font-bold'>{formatPrice(price)}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full my-4'>
      <div className='w-full flex items-center bg-gradient-to-br from-teal-600 to-teal-800 rounded-lg p-2 transition-all duration-200 hover:shadow-xl'>
        <img
          src={image}
          alt={title}
          className='w-24 h-24 object-cover rounded-md mr-4'
        />
        <div className='flex justify-between w-full gap-1 items-center'>
          <div className='flex flex-col'>
            <h2 className='text-lg font-semibold text-white'>
              {title.length > 7 ? `${title.substring(0, 6)}...` : title}
            </h2>
            <span className='text-sm text-white'>{formatPrice(price)}</span>
          </div>
          <div className='flex items-center  lg:space-x-2'>
            <div className='bg-white w-fit flex items-center  rounded-md'>
              <Button
                variant='transparant'
                size='icon'
                className='text-teal-600 '
                onClick={() => handleUpdateQuantity(newQuantity - 1)}
                disabled={newQuantity <= 1}
              >
                <Minus className='h-4 w-4' />
              </Button>
              <input
                type='number'
                className=' placeholder:leading-loose text-black w-[40%] h-full font-mono  placeholder:text-center focus:outline-none focus:border-none focus:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none'
                value={newQuantity}
                readOnly
                min={1}
                max={100}
              />
              <Button
                variant='transparant'
                size='icon'
                className='text-teal-600'
                onClick={() => handleUpdateQuantity(newQuantity + 1)}
                disabled={!!checkQuantity(productQuantity, newQuantity + 1)}
              >
                <Plus className='h-4 w-4' />
              </Button>
            </div>
            <Button
              variant='transparent'
              size='icon'
              className='text-red-400 hover:text-red-700'
              onClick={() => handleRemoveCart(id)}
            >
              <Trash2 className='h-7 w-7' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
CartItem.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  quantity: PropTypes.number,
  title: PropTypes.string,
  productQuantity: PropTypes.number,
  price: PropTypes.number,
  isCartPage: PropTypes.bool,
  isPaymentPage: PropTypes.bool,
};
