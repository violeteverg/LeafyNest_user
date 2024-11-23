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
import { yupResolver } from "@hookform/resolvers/yup";
import { addressSchema } from "@/schemas/SchemaCreateAddress";

export default function CreateAddressModal() {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addressSchema),
  });
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
            <div>
              <Input
                type='text'
                placeholder='Full Address'
                {...register("fullAddress")}
                className='border p-2 rounded w-full'
              />
              {errors.fullAddress && (
                <p className='text-red-500 text-sm'>
                  {errors.fullAddress.message}
                </p>
              )}
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <div>
                <Input
                  type='text'
                  placeholder='City'
                  {...register("city")}
                  className='border p-2 rounded w-full'
                />
                {errors.city && (
                  <p className='text-red-500 text-sm'>{errors.city.message}</p>
                )}
              </div>
              <div>
                <Input
                  type='text'
                  placeholder='State'
                  {...register("state")}
                  className='border p-2 rounded w-full'
                />
                {errors.state && (
                  <p className='text-red-500 text-sm'>{errors.state.message}</p>
                )}
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
              <div>
                <Input
                  type='text'
                  placeholder='Postal Code'
                  {...register("postalCode")}
                  className='border p-2 rounded w-full'
                />
                {errors.postalCode && (
                  <p className='text-red-500 text-sm'>
                    {errors.postalCode.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  type='text'
                  placeholder='Country'
                  {...register("country")}
                  className='border p-2 rounded w-full'
                />
                {errors.country && (
                  <p className='text-red-500 text-sm'>
                    {errors.country.message}
                  </p>
                )}
              </div>
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
