import { Link } from "react-router-dom";
import { NavMenuItem } from "@/lib/mock/NavMentuItems";
import { cn } from "@/lib/utils";
import { buttonVariants } from "../ui/button";
import PropTypes from "prop-types";

export default function MobileNav({ user }) {
  return (
    <div className='lg:hidden bg-white p-4 mt-4 rounded-lg shadow-lg relative'>
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
                  <Link to={item?.path} className='py-2'>
                    {item?.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
          {!user && (
            <>
              <Link
                to='/login'
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                Login
              </Link>
              <Link
                to='/register'
                className={cn(buttonVariants({ variant: "ghost" }))}
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

MobileNav.propTypes = {
  user: PropTypes.string,
};
