import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useLogout } from "@queries/authQueries";
import { clearUser } from "@features/auth/authSlice";

export const useLogoutUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userRole = useSelector((state) => state.auth.user?.role);

  const { mutate: logoutMutate, isLoading } = useLogout(userRole);

  const logout = () => {
    logoutMutate(undefined, {
      onSuccess: () => {
        // Clear Redux state
        dispatch(clearUser());

        // Clear localStorage
        localStorage.removeItem("userRole");
        localStorage.removeItem("isAuthenticated");

        toast.success("Logged out successfully");
        navigate("/login");
      },
      onError: (error) => {
        toast.error("Logout failed: " + error.message);
      },
    });
  };

  return { logout, isLoading };
};
