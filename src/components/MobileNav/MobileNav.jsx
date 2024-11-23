import { Link, useNavigate } from "react-router-dom";
import { NavMenuItem } from "@/lib/mock/NavMentuItems";
import { cn } from "@/lib/utils";
import { Button, buttonVariants } from "../ui/button";
import PropTypes from "prop-types";
import { useRef, useState, useEffect } from "react";
import { useOnClickOutside } from "@/hooks/useClickOutside";
import { Separator } from "../ui/separator";
import { useLogoutMutation } from "@/redux/auth/api";
import { FileStack, LogIn, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import { setIsAddrOpen } from "@/redux/app/slice";

export default function MobileNav({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();
  const [isOpen, setIsOpen] = useState(true);
  const ref = useRef();
  useOnClickOutside(ref, () => setIsOpen(false));

  const handleLogout = async () => {
    await logout();
    navigate(0);
  };

  const handleaddaddress = () => {
    dispatch(setIsAddrOpen(true));
  };
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      setIsOpen(false);
    };

    document.addEventListener("keydown", handleKeyDown);
    window.addEventListener("scroll", handleScroll);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className='relative z-50'>
      <div
        ref={ref}
        className='relative lg:hidden bg-white p-4 mt-4 rounded-lg shadow-lg z-50'
      >
        <div className='flex flex-col space-y-4'>
          <div className='flex flex-col items-start space-y-1'>
            <div className='flex flex-col my-4 gap-2'>
              {NavMenuItem.map((item, index) => (
                <div key={index} className='flex flex-col'>
                  {item?.displayChildren ? (
                    <div className='flex justify-between items-center cursor-pointer py-2 font-semibold'>
                      <p className='font-thin'>{item?.name}</p>
                    </div>
                  ) : (
                    <Link
                      to={item?.path}
                      className='py-2'
                      onClick={() => setIsOpen(false)}
                    >
                      {item?.name}
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <Separator />

            {!user ? (
              <>
                <Link
                  to='/login'
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  <LogIn />
                  Login
                </Link>
                <Link
                  to='/register'
                  className={cn(buttonVariants({ variant: "ghost" }))}
                >
                  <FileStack />
                  Register
                </Link>
              </>
            ) : (
              <div className='flex flex-col space-y-2'>
                <Button
                  className='bg-white border  border-black text-black text-start hover:bg-white  justify-start'
                  onClick={handleaddaddress}
                >
                  +Address
                </Button>
                <Button onClick={handleLogout}>
                  <LogOut />
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

MobileNav.propTypes = {
  user: PropTypes.string,
};
