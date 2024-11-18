import { cn, getUser } from "@/lib/utils";
import { Button, buttonVariants } from "@/components/ui/button";
import WidthWrapper from "../WidthWrapper";

import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Style from "./Navbar.module.css";
import { Icons } from "../Icons";
import { Separator } from "../ui/separator";

import { Menu, ShoppingCart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setIsOpen, setUser } from "@/redux/app/slice";
import DropdownUser from "../DropdownUser/DropdownUser";
import { useCountCartQuery } from "@/redux/cart/api";
import Searchbar from "../Searchbar/Searchbar";
import NavItems from "../NavItems/NavItems";
import MobileNav from "../MobileNav/MobileNav";
import Cart from "../Cart/Cart";
import Cookies from "js-cookie";

export default function Navbar() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.app);
  const location = useLocation();
  const [visible, setVisible] = useState(true);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { data } = useCountCartQuery();
  console.log(data, "ini cart data");

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      console.log("data dari cookie : ", userData);
      dispatch(setUser(userData));
    };

    fetchUser();
  }, [dispatch]);

  useEffect(() => {
    console.log("token dari js cookie", Cookies);
  }, []);

  useEffect(() => {
    let timeout;
    const handleScroll = () => {
      const currentPosition = window.pageYOffset;

      setVisible(currentPosition <= 10);
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
  const isRootPath = location.pathname === "/";

  const handleOpenSheet = () => {
    dispatch(setIsOpen(true));
  };

  return (
    <div
      className={`bg-transparent ${visible ? Style.fadeIn : Style.fadeOut} ${
        isRootPath ? "fixed" : "sticky top-0 shadow-xl"
      } z-50 inset-x-0 h-[80px] ${
        scrollPosition > 10 ? Style.blurredBackground : ""
      }`}
    >
      <header className='relative h-full bg-transparent lg:mx-4 mt-2'>
        <WidthWrapper>
          <div className='flex h-16 items-center'>
            <div className='hidden ml-4 lg:block lg:ml-0'>
              <Link to='/'>
                <Icons.logo />
              </Link>
            </div>

            <div className='mx-auto lg:mx-8 lg:block'>
              <Searchbar />
            </div>

            <div className='hidden lg:ml-8 lg:block lg:self-stretch'>
              <NavItems />
            </div>

            <div className='lg:hidden ml-auto mr-4 space-x-4 flex flex-row items-center justify-center'>
              <div>
                <Button
                  size='icon'
                  variant='tranparant'
                  onClick={handleOpenSheet}
                >
                  <ShoppingCart
                    className={`h-6 w-6 flex-shrink-0 text-black`}
                  />
                  <span className='ml-2 text-sm font-medium text-white'>
                    {data?.totalQuantity}
                  </span>
                </Button>
              </div>
              <button onClick={toggleMobileMenu}>
                <Menu />
              </button>
            </div>

            <div className='hidden ml-auto lg:flex items-center'>
              <div className='md:mr-6 flex items-center space-x-6'>
                <div className='ml-4 flow-root lg:ml-6'>
                  <Button
                    variant='tranparant'
                    // size='icon'
                    onClick={handleOpenSheet}
                  >
                    <ShoppingCart
                      className={`h-6 w-6 flex-shrink-0 text-black`}
                    />
                    <span className='ml-2 text-sm font-medium text-black '>
                      {data?.totalQuantity}
                    </span>
                  </Button>
                </div>
                {user && (
                  <>
                    <Separator
                      className='h-6 w-px bg-gray-200'
                      aria-hidden='true'
                    />
                    <Link
                      to='/my-orders'
                      className={cn(buttonVariants({ variant: "ghost" }))}
                    >
                      My Orders
                    </Link>
                  </>
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
                  <DropdownUser user={user} />
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
          {isMobileMenuOpen && <MobileNav user={user} />}
        </WidthWrapper>
      </header>
      <Cart />
    </div>
  );
}
