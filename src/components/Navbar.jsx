import { useDispatch, useSelector } from "react-redux";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Link, useNavigate } from "react-router-dom";
import { clearUser } from "@/slices/userSlice";

export function Navbar() {
  const { user } = useSelector((state) => state?.user?.user || {});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser()).then(() => navigate("/auth/login"));
  };

  return (
    <Menubar className="rounded-none border-b border-none p-0 w-full flex justify-end bg-smoky-black">
      <MenubarMenu>
        <MenubarTrigger className="font-bold">
          <>
            <Avatar className="w-6 h-6">
              <AvatarImage
                src={user?.userAvatar}
                alt="User Avatar"
                className="rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <MenubarLabel className="rounded-full text-slate-200 ml-2">
              {user?.realName}
            </MenubarLabel>
          </>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>
            <span className="font-bold text-sm">{user?.realName}</span>
          </MenubarItem>
          <MenubarItem>
            <span className="text-sm">{user?.email}</span>
          </MenubarItem>
          <MenubarItem>
            <span className="text-sm">Leetcode Username: {user?.username}</span>
          </MenubarItem>
          <MenubarItem>
            <Link to="/app/change-password">Change Password</Link>
          </MenubarItem>
          <MenubarItem onClick={handleLogout} className="cursor-pointer">Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
