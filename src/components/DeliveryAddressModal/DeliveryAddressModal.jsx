/* eslint-disable react/prop-types */
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import {
  useDeleteAddressMutation,
  useGetAdressQuery,
} from "@/redux/address/api";
import { Bookmark, XIcon } from "lucide-react";
import { useDispatch } from "react-redux";
import { setAddress } from "@/redux/app/slice";

export default function DeliveryAddressModal({
  isOpen,
  onClose,
  onSelectAddress,
  selectedAddress,
}) {
  const dispatch = useDispatch();
  const { data, isLoading } = useGetAdressQuery();
  const addresses = data || [];
  const [selectedAddressId, setSelectedAddressId] = useState(
    selectedAddress?.id || null
  );
  const [deleteAddress] = useDeleteAddressMutation();

  const handleAddressSelection = (id) => setSelectedAddressId(id);

  const handleDelete = async (id) => {
    try {
      await deleteAddress({ id: id }).unwrap();
      dispatch(setAddress(null));
    } catch (error) {
      console.error("Failed to delete address:", error);
    }
  };

  const handleConfirmSelection = () => {
    const selected = addresses.find((addr) => addr.id === selectedAddressId);
    if (selected) {
      onSelectAddress(selected);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className='rounded-lg shadow-lg'>
        <DialogTitle className='text-lg font-semibold text-center'>
          Select or Add Address
        </DialogTitle>
        {isLoading ? (
          <p>Loading addresses...</p>
        ) : (
          <div className='space-y-4 lg:h-full '>
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`flex items-center justify-between p-2 border rounded-lg hover:shadow-xl ${
                  addr.isPrimary ? "border-blue-500" : "border-gray-300"
                }`}
                onClick={() => handleAddressSelection(addr.id)}
              >
                <input
                  type='radio'
                  name='address'
                  value={addr.id}
                  checked={selectedAddressId === addr.id}
                  onChange={() => handleAddressSelection(addr.id)}
                />
                <div className='flex-1 ml-2'>
                  <div className='flex items-center'>
                    <p className='font-semibold'>{addr.fullAddress}</p>
                  </div>
                  <p>
                    {addr.city}, {addr.state}, {addr.postalCode}
                  </p>
                  <p>{addr.country}</p>
                  <div className='flex'>
                    {addr.isPrimary && <Bookmark className='text-blue-500' />}
                  </div>
                </div>
                <XIcon
                  className='cursor-pointer text-gray-500'
                  onClick={(event) => {
                    event.stopPropagation();
                    handleDelete(addr.id);
                  }}
                />
              </div>
            ))}
          </div>
        )}

        {addresses?.length < 1 && <p>create address</p>}
        <div className='flex gap-2 justify-end'>
          <Button
            variant='outline'
            onClick={onClose}
            className='w-full  sm:w-auto'
          >
            Close
          </Button>
          <Button
            variant='primary'
            onClick={handleConfirmSelection}
            className='w-full bg-teal-500 text-white hover:bg-teal-600 sm:w-auto'
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
