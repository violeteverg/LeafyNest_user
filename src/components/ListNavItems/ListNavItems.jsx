import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Style from "./ListNavItems.module.css";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export default function ListNavItems({
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
      <div
        className={`relative flex items-center ${
          scrollY > 80 ? "text-black" : "text-gray-900"
        }`}
      >
        <Button
          className='gap-1.5'
          onClick={openhandler}
          variant={isOpen ? "secondary" : "ghost"}
        >
          {category.label}
          <ChevronDown
            className={cn("h-4 w-4 transition-all text-muted-foreground", {
              "-rotate-180": isOpen,
            })}
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
                      <div className='relative aspect-video overflow-hidden rounded-lg bg-gray-100 group-hover:opacity-75'>
                        <img
                          src={item.imageSrc}
                          alt='product category image'
                          className='object-cover object-center w-full h-full'
                        />
                      </div>

                      <p className='mt-6 block font-medium text-gray-900'>
                        {item.name}
                      </p>
                      <Link
                        to={item.href}
                        className='mt-1'
                        aria-hidden='true'
                        onClick={openhandler}
                      >
                        Shop now
                      </Link>
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

ListNavItems.propTypes = {
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
