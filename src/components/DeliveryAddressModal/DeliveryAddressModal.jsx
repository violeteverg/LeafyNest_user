/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  useCreateAddressMutation,
  useDeleteAddressMutation,
  useGetAdressQuery,
} from "@/redux/address/api";
import { Input } from "../ui/input";
import { XIcon } from "lucide-react";
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
  const addresses = data?.result || [];
  const [selectedAddressId, setSelectedAddressId] = useState(
    selectedAddress?.id || null
  );
  const [createAddress] = useCreateAddressMutation();
  const [deleteAddress] = useDeleteAddressMutation();
  const { register, handleSubmit, reset } = useForm();

  const handleAddressSelection = (id) => setSelectedAddressId(id);

  const onSubmit = async (formData) => {
    try {
      const createdAddress = await createAddress(formData).unwrap();
      onSelectAddress(createdAddress);
      reset();
      onClose();
    } catch (error) {
      console.error("Failed to create address:", error);
    }
  };

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
      <DialogContent className='lg:min-w-fit lg:h-[90%]'>
        <DialogTitle>Select or Add Address</DialogTitle>
        <DialogDescription>
          Pilih alamat yang sudah ada atau tambahkan alamat baru.
        </DialogDescription>
        {isLoading ? (
          <p>Loading addresses...</p>
        ) : (
          <div className='grid lg:grid-cols-2 gap-4 my-4 lg:w-[50vw]'>
            {addresses.map((addr) => (
              <div
                key={addr.id}
                className='flex items-start justify-between gap-2 border p-2'
                onClick={() => handleAddressSelection(addr.id)}
              >
                <input
                  type='radio'
                  name='address'
                  value={addr.id}
                  checked={selectedAddressId === addr.id}
                  onChange={() => handleAddressSelection(addr.id)}
                />
                <div>
                  <p>{addr.fullAddress}</p>
                  <p>
                    {addr.city}, {addr.state}, {addr.postalCode}
                  </p>
                  <p>{addr.country}</p>
                </div>
                <XIcon
                  className='cursor-pointer'
                  onClick={(event) => handleDelete(addr.id, event)}
                />
              </div>
            ))}
          </div>
        )}

        {addresses?.length < 3 && (
          <div className='my-4 border-t pt-4'>
            <h3 className='text-lg font-semibold'>Add New Address</h3>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Input
                type='text'
                placeholder='Full Address'
                {...register("fullAddress", {
                  required: "Full address is required",
                })}
                className='border p-2 rounded mb-2 w-full'
              />
              <div className='grid grid-cols-2 gap-3'>
                <Input
                  type='text'
                  placeholder='City'
                  {...register("city", { required: "City is required" })}
                  className='border p-2 rounded mb-2 w-full'
                />
                <Input
                  type='text'
                  placeholder='State'
                  {...register("state", { required: "State is required" })}
                  className='border p-2 rounded mb-2 w-full'
                />
              </div>

              <div className='grid grid-cols-2 gap-3'>
                <Input
                  type='text'
                  placeholder='Postal Code'
                  {...register("postalCode", {
                    required: "Postal code is required",
                  })}
                  className='border p-2 rounded mb-2 w-full'
                />
                <Input
                  type='text'
                  placeholder='Country'
                  {...register("country", { required: "Country is required" })}
                  className='border p-2 rounded mb-2 w-full'
                />
              </div>

              <Button type='submit' variant='primary' className='mt-4'>
                Add Address
              </Button>
            </form>
          </div>
        )}

        <div className='flex justify-end mt-4'>
          <Button variant='primary' onClick={handleConfirmSelection}>
            Confirm
          </Button>
          <Button variant='outline' onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
