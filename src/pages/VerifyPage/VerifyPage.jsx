import { Button } from "@/components/ui/button";
import WidthWrapper from "@/components/WidthWrapper";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const isVerifySuccess = location.pathname === "/verify-success";
  console.log(isVerifySuccess);
  console.log(location.pathname, "pathname");
  const handleDirectButton = () => {
    if (isVerifySuccess) {
      return navigate("/login");
    }
    return navigate("/email-verify");
  };
  return (
    <WidthWrapper className='relative min-h-screen text-white flex items-center bg-background'>
      <div
        className='absolute inset-0 z-0 bg-cover bg-center'
        style={{
          backgroundImage: `url('${
            isVerifySuccess ? "/bg-verify-succes.jpg" : "/bg-verify-failed.jpg"
          }')`,
        }}
        role='img'
        aria-label='Background image for verification page'
      />
      <div
        className={`relative z-10 w-full lg:max-w-lg p-8 
        ${isVerifySuccess ? "lg:ml-auto lg:mr-12" : "lg:ml-12 "}`}
      >
        <h1 className='text-2xl lg:text-4xl font-bold mb-4'>
          {isVerifySuccess ? "Verification Successful!" : "Verification Failed"}
        </h1>
        <p className='mb-6 '>
          {isVerifySuccess
            ? "Your account has been successfully verified. You can now log in to access your account."
            : "We couldn't verify your account. Please try again or contact support for assistance."}
        </p>
        <Button
          className='w-full bg-yellow-500 hover:bg-yellow-600  '
          onClick={handleDirectButton}
        >
          {isVerifySuccess ? "Login to Your Account" : "Try Again"}
        </Button>
      </div>
    </WidthWrapper>
  );
}
