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
import { useNavigate } from "react-router-dom";
import { clearUser } from "@/slices/userSlice";

export function Navbar() {
  const { user } = useSelector((state) => (state?.user?.user)||{});
  const dipatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dipatch(clearUser()).then(() => navigate("/auth/login"));
  };
  return (
    <Menubar className="rounded-none border-b border-none p-0 w-full flex justify-end">
      <MenubarMenu>
        <MenubarTrigger className="font-bold">
          <>
            <Avatar className="w-4 h-4">
              <AvatarImage
                src={user?.userAvatar}
                alt="@shadcn"
                className="rounded-full"
              />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <MenubarLabel className="rounded-full">
              {user?.realName}
            </MenubarLabel>
          </>
        </MenubarTrigger>
        <MenubarContent>
          <MenubarItem>View Profile</MenubarItem>
          <MenubarItem onClick={handleLogout}>Logout</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
}
