import { Button } from "../ui/button";
import { MapPinned } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAddress } from "@/redux/app/slice";
import DeliveryAddressModal from "../DeliveryAddressModal/DeliveryAddressModal";

export default function DeliveryAddress() {
  const dispatch = useDispatch();
  const { address } = useSelector((state) => state.app);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => setModalOpen(true);
  const handleCloseModal = () => setModalOpen(false);

  const handleAddressSelect = (selectedAddress) => {
    dispatch(setAddress(selectedAddress));
    setModalOpen(false);
  };

  return (
    <div className='w-full  p-4 border border-gray-200 shadow-lg rounded-lg bg-white flex flex-col items-start space-y-4'>
      <h1 className='text-2xl font-semibold text-gray-800'>Delivery Address</h1>
      <div className='flex items-start space-x-2 w-full'>
        <MapPinned className='text-teal-500' size={24} />
        <div className='flex flex-col space-y-1'>
          <h2 className='text-lg font-medium text-gray-700'>
            {address ? "Your Address:" : "Kost:"}
          </h2>
          <p className='text-gray-600'>
            {address
              ? `${address.fullAddress}, ${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`
              : "Pilih atau tambahkan alamat pengiriman Anda."}
          </p>
        </div>
      </div>
      <Button
        variant='outline'
        size='lg'
        className=' bg-teal-500 text-white hover:bg-teal-600 hover:text-white transition-colors'
        onClick={handleOpenModal}
      >
        Change Address
      </Button>

      <DeliveryAddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectAddress={handleAddressSelect}
        selectedAddress={address}
      />
    </div>
  );
}
