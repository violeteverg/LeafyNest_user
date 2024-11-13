import { Button } from "../ui/button";
import { checkQuantity } from "@/lib/functions/checkQuantity";
import { Minus, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import PropTypes from "prop-types";
import { formatPrice } from "@/lib/functions/formatPrice";
import { useRemoveCartMutation, useUpdateCartMutation } from "@/redux/cart/api";

export default function CartItems({
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
      <div className='w-full h-fit my-4'>
        <div className='w-full flex rounded-xl border border-black p-2'>
          <img src={image} alt='product' width={100} height={100} />
          <div className='flex justify-between w-full items-center p-2'>
            <div className='flex flex-col size-[80%] items-start justify-center gap-y-2'>
              <h1 className='text-4xl'>{title}</h1>
            </div>
            <div className='flex w-[20vh]'>
              <div className='bg-white w-full justify-center gap-3 flex items-center p-1'>
                <p>{quantity}</p>
                <p>x</p>
                <p>{formatPrice(price)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full h-fit my-4'>
      <div className='w-full flex rounded-xl border border-black p-2'>
        <img src={image} alt='product' width={90} height={90} />
        <div className='flex justify-between w-full items-center p-2'>
          <div className='flex flex-col size-[80%] items-start justify-center gap-y-2'>
            <h1 className='text-4xl'>{title}</h1>
          </div>
          <div className='flex justify-center items-center gap-1'>
            <div className='bg-white justify-between flex items-center border border-black rounded-md p-1'>
              <Button
                variant='transparant'
                size='xs'
                className='flex items-center justify-center h-full text-black'
                onClick={() => handleUpdateQuantity(newQuantity - 1)}
                disabled={newQuantity <= 1}
              >
                <Minus className='h-[80%] w-[80%]' />
              </Button>
              <input
                type='number'
                className=' placeholder:leading-loose text-black w-[30%] h-full font-mono  placeholder:text-center focus:outline-none focus:border-none focus:ring-0 text-center [&::-webkit-inner-spin-button]:appearance-none'
                placeholder='0'
                value={newQuantity}
                min={1}
                max={100}
              />
              <Button
                variant='transparant'
                size='xs'
                className='flex items-center justify-center h-full text-black'
                onClick={() => handleUpdateQuantity(newQuantity + 1)}
                disabled={!!checkQuantity(productQuantity, newQuantity + 1)}
              >
                <Plus className='h-[80%] w-[80%]' />
              </Button>
            </div>
            <Button
              variant='transparant'
              size='xs'
              className='flex items-center justify-center h-full text-black'
              onClick={() => handleRemoveCart(id)}
            >
              <Trash2 className='h-[80%] w-[80%] hover:text-red-500' />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
CartItems.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string,
  quantity: PropTypes.number,
  title: PropTypes.string,
  productQuantity: PropTypes.number,
  price: PropTypes.number,
  isCartPage: PropTypes.bool,
  isPaymentPage: PropTypes.bool,
};
