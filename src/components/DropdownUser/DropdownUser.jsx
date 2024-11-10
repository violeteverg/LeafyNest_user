import { useLogoutMutation } from "@/redux/auth/api";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export default function DropdownUser({ user }) {
  const navigate = useNavigate();
  const [logout] = useLogoutMutation();

  const handleLogout = async () => {
    await logout();
    navigate(0);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <p>{user?.userName}</p>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>
          <Button variant='default' className='w-full' onClick={handleLogout}>
            Logout
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

DropdownUser.propTypes = {
  user: PropTypes.string,
};
