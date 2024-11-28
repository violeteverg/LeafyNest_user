import { ArrowRight, CircleCheckBigIcon, CircleX } from "lucide-react";
import { Button, buttonVariants } from "../ui/button";
import { Controller, useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useRegisterMutation } from "@/redux/auth/api";
import { Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerSchema } from "@/schemas/SchemasRegisterForm";
import { useToast } from "@/hooks/use-toast";

export default function RegisterForm() {
  const {
    handleSubmit,
    control,
    watch,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(registerSchema) });
  const { toast } = useToast();

  const [focused, setFocused] = useState(false);
  const passwordValue = watch("password");
  const emailValue = watch("email");

  const [register, { isLoading }] = useRegisterMutation();

  const onSubmit = async (val) => {
    try {
      const body = {
        fullName: val.fullName,
        userName: val.userName,
        email: val.email,
        password: val.password,
      };
      await register(body);

      reset({
        fullName: "",
        userName: "",
        email: "",
        password: "",
      });

      toast({
        variant: "success",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleCheckBigIcon className='text-green-600' />
            <p>email verification already send</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 border border-green-500 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    } catch (err) {
      console.error("Error saat login:", err);
      toast({
        variant: "destructive",
        description: (
          <div className='flex gap-2 font-bold'>
            <CircleX />
            <p>error when send email verify</p>
          </div>
        ),
        className: cn(
          "top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4"
        ),
      });
    }
  };

  return (
    <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0 lg:pt-0'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]'>
        <div className='flex flex-col items-center space-y-2 text-center'>
          <h1 className='text-2xl font-bold'>Create an account</h1>
          <p>Enter your information to create your account</p>
        </div>
        <div className='grid gap-6'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='grid gap-2'>
              <div className='grid gap-1 py-2'>
                <Label className='mb-2'>Full Name</Label>
                <Controller
                  control={control}
                  name='fullName'
                  render={({ field: { onChange, value } }) => (
                    <Input
                      onChange={onChange}
                      value={value}
                      placeholder='Full Name'
                      className={cn({
                        "focus-visible:ring-red-500": errors.fullName,
                      })}
                    />
                  )}
                />
                {errors?.fullName && (
                  <span className='text-xs text-red-400'>
                    {errors?.fullName?.message}
                  </span>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label className='mb-2'>Username</Label>
                <Controller
                  control={control}
                  name='userName'
                  render={({ field: { onChange, value } }) => (
                    <Input
                      onChange={onChange}
                      value={value}
                      placeholder='Username'
                      className={cn({
                        "focus-within:ring-red-500": errors.userName,
                      })}
                    />
                  )}
                />
                {errors?.userName && (
                  <span className='text-xs text-red-400'>
                    {errors?.userName?.message}
                  </span>
                )}
              </div>
              <div className='grid gap-1 py-2'>
                <Label htmlFor='email' className='mb-2'>
                  Email
                </Label>
                <Controller
                  control={control}
                  name='email'
                  render={({ field: { onChange, value } }) => (
                    <Input
                      onChange={onChange}
                      value={value}
                      placeholder='your@email.com'
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      className={cn({
                        "focus-visible:ring-red-500":
                          focused && emailValue && emailValue.length < 5,
                      })}
                    />
                  )}
                />
                {focused && emailValue && emailValue.length < 5 && (
                  <span className='text-xs'>
                    Please enter a valid email address; it will be used for
                    verification.
                  </span>
                )}
                {errors.email && (
                  <span className='text-xs text-red-400'>
                    {errors.email.message}
                  </span>
                )}
              </div>

              <div className='grid gap-1 py-2 relative'>
                <Label htmlFor='password' className='mb-2'>
                  Password
                </Label>
                <Controller
                  control={control}
                  name='password'
                  render={({ field: { onChange, value } }) => (
                    <Input
                      isPassword
                      type='password'
                      onChange={onChange}
                      value={value}
                      placeholder='Password'
                      onFocus={() => setFocused(true)}
                      onBlur={() => setFocused(false)}
                      className={cn({
                        "focus-visible:ring-red-500":
                          focused && passwordValue && passwordValue.length < 8,
                      })}
                    />
                  )}
                />

                {focused && passwordValue && passwordValue.length < 8 && (
                  <span className='text-xs'>
                    Password must be at least 8 characters long and include
                    uppercase, lowercase, number, and special character.
                  </span>
                )}
                {errors.password && (
                  <span className='text-xs text-red-400'>
                    {errors.password.message}
                  </span>
                )}
              </div>
              <Button type='submit' disabled={isLoading}>
                {isLoading ? "Loading..." : "Sign up"}
              </Button>
            </div>
          </form>
          <Link
            to='/login'
            className={buttonVariants({
              variant: "link",
              className: "gap-1.5",
            })}
          >
            Already have an account? sign-in
            <ArrowRight className='h-4 w-4' />
          </Link>
        </div>
      </div>
    </div>
  );
}
