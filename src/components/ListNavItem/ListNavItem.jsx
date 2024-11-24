import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Style from "./ListNavItem.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ListNavItem({
  category,
  openhandler,
  isAnyOpen,
  isOpen,
}) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className='flex'>
      <div className={`relative flex items-center text-white`}>
        <Button
          className={`gap-1.5 text-[1.1rem]  ${
            scrollY > 10 ? "text-black" : "text-white"
          } `}
          onClick={openhandler}
          variant={"ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-all",
              scrollY > 10 ? "text-black" : "text-white",
              { "-rotate-180": isOpen }
            )}
          />
        </Button>
      </div>

      {isOpen ? (
        <div
          className={cn(
            "absolute inset-x-0 top-full text-sm text-muted-foreground",
            {
              "animate-in fade-in-10 slide-in-from-top-5": !isAnyOpen,
            }
          )}
        >
          <div className='absolute inset-0 top-1/2 shadow' aria-hidden='true' />

          <div className={`relative ${Style.blurredBackground}`}>
            <div className='mx-auto max-w-7xl px-8'>
              <div className='grid grid-cols-4 gap-x-8 gap-y-10 py-16'>
                <div className='col-span-4 col-start-1 grid grid-cols-3 gap-x-8'>
                  {category.featured.map((item) => (
                    <div
                      key={item.name}
                      className='group relative text-base sm:text-sm'
                    >
                      <div className='relative aspect-video overflow-hidden rounded-lg bg-gray-100'>
                        <img
                          src={item.imageSrc}
                          alt='product category image'
                          className='object-cover object-center w-full h-full'
                        />
                        <div className='absolute bottom-0 left-0 right-0 overflow-hidden w-full h-0 transition-all duration-500 ease-in-out group-hover:h-full'>
                          <div className='absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80'></div>

                          <div className='text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center w-full'>
                            <p className='text-3xl font-semibold tracking-wide'>
                              {item.name}
                            </p>
                            <div className='flex justify-center items-center gap-3 mt-2'>
                              <Link
                                to={item.href}
                                className='mt-1'
                                aria-hidden='true'
                                onClick={openhandler}
                              >
                                Shop now
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

ListNavItem.propTypes = {
  category: PropTypes.shape({
    label: PropTypes.string,
    featured: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        imageSrc: PropTypes.string,
        href: PropTypes.string,
      })
    ),
  }),
  openhandler: PropTypes.func,
  isAnyOpen: PropTypes.bool,
  isOpen: PropTypes.bool,
};
