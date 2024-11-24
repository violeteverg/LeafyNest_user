import LoginGoogleButton from "@/components/LoginGoogleButton/LoginGoogleButton";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useLoginMutation } from "@/redux/auth/api";
import { loginSchema } from "@/schemas/SchemaLoginForm";
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const [login, { isLoading, isError, error }] = useLoginMutation();

  const onSubmit = async (val) => {
    try {
      const body = { input: val.input, password: val.password };
      const response = await login(body).unwrap();

      Cookies.set("_UserTkn", response?.result?.token);
      navigate("/all-product");
    } catch (err) {
      console.error("Error saat login:", err);
    }
  };

  return (
    <div className='mx-auto flex p-8 lg:h-screen lg:p-0 lg:justify-center'>
      <div className='container relative flex pt-20 flex-col items-center justify-center lg:px-0 lg:pt-0'>
        <div className='mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]'>
          <div className='flex flex-col space-y-2 text-center'>
            <h1 className='text-2xl font-bold'>Login</h1>
            <p>Enter your credentials to access your account</p>
          </div>
          <div className='grid gap-6'>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className='grid gap-2'>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='input' className='mb-2'>
                    Username or Email
                  </Label>
                  <Input
                    {...register("input")}
                    placeholder='your username or email'
                    className={cn({
                      "focus-within:ring-red-500": errors.input,
                    })}
                  />
                  {errors.input && (
                    <p className='text-red-500'>{errors.input.message}</p>
                  )}
                </div>
                <div className='grid gap-1 py-2'>
                  <Label htmlFor='password' className='mb-2'>
                    Password
                  </Label>
                  <Input
                    {...register("password")}
                    isPassword
                    placeholder='password'
                    type='password'
                    className={cn({
                      "focus-within:ring-red-500": errors.password,
                    })}
                  />
                  {errors.password && (
                    <p className='text-red-500'>{errors.password.message}</p>
                  )}
                  {isError && error?.data?.message && (
                    <p className='text-red-500'>{error?.data?.message}</p>
                  )}
                </div>
                <Button type='submit' disabled={isLoading}>
                  {isLoading ? "Loading..." : "Sign in"}
                </Button>
                <div className='flex justify-between'>
                  <Link
                    to='/forget-password'
                    className='text-sm  hover:underline mt-2'
                  >
                    Forgot your password?
                  </Link>
                  <Link
                    to='/email-verify'
                    className='text-sm  hover:underline mt-2'
                  >
                    Verify Email?
                  </Link>
                </div>
              </div>
            </form>
          </div>
          <Separator />
          <div className='w-full space-y-2'>
            <LoginGoogleButton />
            <div className='flex justify-between'>
              <Link
                to='/Register'
                className={buttonVariants({
                  variant: "link",
                  className: "gap-1.5 w-[50%]",
                })}
              >
                Don&apos;t have an account? <ArrowRight className='h-4 w-4' />
              </Link>
              <Link
                to='/all-product'
                className={buttonVariants({
                  variant: "link",
                  className: "p-0",
                })}
              >
                <ArrowLeft className='h-4 w-4' /> back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
