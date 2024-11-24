import { Link } from "react-router-dom";
import WidthWrapper from "../WidthWrapper";
import { Button, buttonVariants } from "../ui/button";

export default function Hero() {
  return (
    <WidthWrapper className="relative bg-cover bg-fixed bg-center h-screen bg-[url('/bg-hero-1.jpg')]">
      <div className='absolute inset-0 bg-gradient-to-t from-teal-900/70 via-teal-800/30 to-transparent'></div>
      <div className='relative py-72 h-full items-center flex flex-col max-w-3xl lg:items-start lg:ml-20 lg:text-left '>
        <h1 className='text-3xl lg:text-6xl text-center lg:text-left font-bold tracking-tight text-white max-w-3xl'>
          Your marketplace for premium{" "}
          <span className='text-teal-300'>plants</span>
        </h1>
        <p className='mt-6 text-lg text-center lg:text-left text-teal-50 max-w-2xl'>
          Welcome to LeafyNest. Every plant on our platform is carefully curated
          to bring life and freshness to your space.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mt-6'>
          <Link
            to={"/all-product"}
            className={buttonVariants({
              className: "bg-teal-600 hover:bg-teal-700 text-white",
            })}
          >
            Explore Plants
          </Link>
          <Button
            variant='ghost'
            className='text-white border border-teal-900 hover:bg-teal-800/30'
          >
            Our quality guarantee &rarr;
          </Button>
        </div>
      </div>
    </WidthWrapper>
  );
}
