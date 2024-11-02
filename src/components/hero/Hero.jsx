import { Link } from "react-router-dom";
import WidthWrapper from "../WidthWrapper";
import { Button, buttonVariants } from "../ui/button";

export default function Hero() {
  return (
    <WidthWrapper className="relative bg-cover bg-fixed bg-center h-screen bg-[url('/test_5.jpg')]">
      <div className='absolute inset-0 bg-gradient-to-t from-white/60 to-transparent'></div>
      <div className='relative py-72 h-full items-center flex flex-col max-w-3xl lg:items-start lg:ml-20 lg:text-left '>
        <h1 className='text-3xl lg:text-6xl lg:text-left text-center font-bold tracking-tight text-gray-900 '>
          Your marketplace for premium{" "}
          <span className='text-[#f4a261]'>plants</span>
        </h1>
        <p className='mt-6 text-lg text-center lg:text-start'>
          Welcome to LeafyNest. Every plant on our platform is carefully curated
          to bring life and freshness to your space.
        </p>
        <div className='flex flex-col sm:flex-row gap-4 mt-6'>
          <Link
            href={"/products"}
            className={buttonVariants({ className: "!bg-olive" })}
          >
            Explore Plants
          </Link>
          <Button variant='ghost' className='text-olive border border-olive'>
            Our quality guarantee &rarr;
          </Button>
        </div>
      </div>
    </WidthWrapper>
  );
}
