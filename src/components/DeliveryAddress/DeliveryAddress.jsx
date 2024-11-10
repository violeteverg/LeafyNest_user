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
    <div className='w-full flex flex-col p-2 h-fit border border-black rounded-lg items-center overflow-y-auto my-2'>
      <div className='flex justify-between w-full items-center p-2'>
        <div className='flex flex-col items-start justify-center gap-y-4'>
          <h1 className='text-4xl'>Delivery Address</h1>
          <div className='flex gap-2 items-center'>
            <MapPinned />
            <h2>Kost:</h2>
            <h2>{address ? address.fullAddress : "Pilih alamat"}</h2>
          </div>
          <p>
            {address
              ? `${address.city}, ${address.state}, ${address.postalCode}, ${address.country}`
              : "Pilih atau tambahkan alamat pengiriman Anda."}
          </p>
          <Button variant='outline' size='default' onClick={handleOpenModal}>
            <p>Change Address</p>
          </Button>
        </div>
      </div>

      <DeliveryAddressModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSelectAddress={handleAddressSelect}
        selectedAddress={address}
      />
    </div>
  );
}
