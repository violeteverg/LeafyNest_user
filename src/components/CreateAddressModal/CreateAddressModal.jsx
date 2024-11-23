import { useForm } from "react-hook-form";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { Input } from "../ui/input";
import { useCreateAddressMutation } from "@/redux/address/api";
import { Button } from "../ui/button";
import { setIsAddrOpen } from "@/redux/app/slice";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { CircleX } from "lucide-react";
import { cn } from "@/lib/utils";

export default function CreateAddressModal() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { register, handleSubmit, reset } = useForm();
  const [createAddress] = useCreateAddressMutation();
  const { isAddrOpen } = useSelector((state) => state.app);

  const onSubmit = async (formData) => {
    try {
      await createAddress(formData).unwrap();
      reset();
      dispatch(setIsAddrOpen(false));
    } catch (error) {
      console.error("Failed to create address:", error);
      dispatch(setIsAddrOpen(false));
      toast({
        variant: "destructive",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleX className='w-12 h-12' />
            <p className='text-sm'>
              You can only create up to 3 addresses. Please delete an existing
              one to add a new address.
            </p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    }
  };

  const handleDialogChange = (isOpen) => {
    dispatch(setIsAddrOpen(isOpen));
  };
  return (
    <Dialog open={isAddrOpen} onOpenChange={handleDialogChange}>
      <DialogContent>
        <DialogTitle className='text-lg font-semibold text-center'>
          Add Address
        </DialogTitle>

        <div className='border shadow-xl p-2 space-y-1 rounded-md'>
          <h3 className='text-lg font-semibold'>Add New Address</h3>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-2'>
            <Input
              type='text'
              placeholder='Full Address'
              {...register("fullAddress", {
                required: "Full address is required",
              })}
              className='border p-2 rounded w-full'
            />
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <Input
                type='text'
                placeholder='City'
                {...register("city", { required: "City is required" })}
                className='border p-2 rounded w-full'
              />
              <Input
                type='text'
                placeholder='State'
                {...register("state", { required: "State is required" })}
                className='border p-2 rounded w-full'
              />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <Input
                type='text'
                placeholder='Postal Code'
                {...register("postalCode", {
                  required: "Postal code is required",
                })}
                className='border p-2 rounded w-full'
              />
              <Input
                type='text'
                placeholder='Country'
                {...register("country", { required: "Country is required" })}
                className='border p-2 rounded w-full'
              />
            </div>

            <Button type='submit' className='mt-4 w-full'>
              Add Address
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
