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

export default function DropdownUser({ user }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    Cookies.remove("token");
    navigate(0, { replace: false });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className='flex items-center justify-center w-10 h-10 rounded-full bg-teal-500 text-white text-lg font-bold'>
          {generateAvatar(user?.userName)}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button variant='default' className='w-full' onClick={handleLogout}>
            <LogOut />
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

DropdownUser.propTypes = {
  user: PropTypes.any,
};
