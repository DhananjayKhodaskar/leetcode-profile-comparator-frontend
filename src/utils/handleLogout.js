import { clearUser } from "@/slices/userSlice";
import { persistor } from "@/store/store";
import { useDispatch } from "react-redux";

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(clearUser());
    persistor.purge();
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
