import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import WidthWrapper from "../WidthWrapper";
import SearchBar from "../seacrhbar/Searchbar";
import NavItem from "../navItems/NavItems";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Style from "./Navbar.module.css";

import { Icons } from "../Icons";
import { Separator } from "../ui/separator";
import Cart from "../cart/Cart";
import { Menu } from "lucide-react";

export default function Navbar() {
  const user = false;
  const [visible, setVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  // when user scrolling down navbar will like hidden
  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      setVisible(currentPosition <= 80);
      setScrollPosition(currentPosition);

      clearTimeout(timeout);
      timeout = setTimeout(() => setVisible(true), 500);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);
  const toggleMobileMenu = () => setMobileMenuOpen((prev) => !prev);
  return (
    <div
      className={`bg-transparent ${
        visible ? Style.fadeIn : Style.fadeOut
      } fixed z-50 top-0 inset-x-0 h-[80px] ${
        scrollPosition > 80 ? Style.blurredBackground : ""
      }`}
    >
      <header className='relative h-full bg-transparent lg:mx-4 mt-2'>
        <WidthWrapper>
          <div className='flex h-16 items-center'>
            {/* <MobileNav /> */}
            {/* Logo */}
            <div className='hidden ml-4 lg:block lg:ml-0'>
              <Link to='/'>
                <Icons.logo />
              </Link>
            </div>

            <div className='mx-auto lg:mx-8 lg:block'>
              <SearchBar />
            </div>

            <div className='hidden lg:ml-8 lg:block lg:self-stretch'>
              <NavItem />
            </div>
            <div className='lg:hidden ml-auto mr-4 space-x-4 flex flex-row items-center justify-center'>
              <div>{user ? null : <Cart />}</div>
              <button onClick={toggleMobileMenu}>
                <Menu />
              </button>
            </div>
            <div className='hidden ml-auto lg:flex items-center'>
              <div className='md:mr-6 flex items-center space-x-6'>
                <div className='ml-4 flow-root lg:ml-6'>
                  {user ? null : <Cart />}
                </div>
                {user ? null : (
                  <Separator
                    className='h-6 w-px bg-gray-200'
                    aria-hidden='true'
                  />
                )}
                {user ? null : (
                  <Link
                    to='/login'
                    className={cn(buttonVariants({ variant: "ghost" }))}
                  >
                    Login
                  </Link>
                )}
                {user ? null : (
                  <Separator
                    className='h-6 w-px bg-gray-200'
                    aria-hidden='true'
                  />
                )}
                {user ? (
                  <p></p>
                ) : (
                  <Link
                    to='/Register'
                    className={cn(buttonVariants({ variant: "ghost" }))}
                  >
                    Register
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className='lg:hidden bg-white p-4 mt-4 rounded-lg shadow-lg'>
              <div className='flex flex-col space-y-4'>
                <div className='flex flex-col items-start space-y-2'>
                  {user ? null : (
                    <Link
                      to='/login'
                      className={cn(buttonVariants({ variant: "ghost" }))}
                    >
                      Login
                    </Link>
                  )}
                  {user ? (
                    <p></p>
                  ) : (
                    <Link
                      to='/Register'
                      className={cn(buttonVariants({ variant: "ghost" }))}
                    >
                      Register
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </WidthWrapper>
      </header>
    </div>
  );
}
