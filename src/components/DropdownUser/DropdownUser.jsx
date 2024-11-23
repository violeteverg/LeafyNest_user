import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { generateAvatar } from "@/lib/utils";
import { LogOut } from "lucide-react";
import Cookies from "js-cookie";
import CreateAddressModal from "../CreateAddressModal/CreateAddressModal";
import { useDispatch, useSelector } from "react-redux";
import { setIsAddrOpen } from "@/redux/app/slice";
import { Separator } from "../ui/separator";

export default function DropdownUser({ user }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAddrOpen } = useSelector((state) => state.app);

  const handleLogout = async () => {
    Cookies.remove("_UserTkn");
    navigate(0, { replace: false });
  };

  const handleaddaddress = () => {
    dispatch(setIsAddrOpen(true));
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className='flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white text-lg font-bold'>
            {generateAvatar(user?.userName)}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className='bg-white z-50'>
          <DropdownMenuItem>
            <Button
              variant='link'
              className='w-full'
              onClick={handleaddaddress}
            >
              +Address
            </Button>
          </DropdownMenuItem>
          <Separator className='mb-1 bg-black w-24 justify-center mx-auto' />
          <DropdownMenuItem>
            <Button variant='default' className='w-full' onClick={handleLogout}>
              <LogOut />
              Logout
            </Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isAddrOpen && <CreateAddressModal />}
    </>
  );
}

DropdownUser.propTypes = {
  user: PropTypes.any,
};
