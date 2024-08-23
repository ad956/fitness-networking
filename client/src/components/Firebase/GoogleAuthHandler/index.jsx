import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../index";
import { useGoogleAuth } from "@queries/authQueries";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "@features/auth/authSlice";
import toast from "react-hot-toast";

const GoogleAuthHandler = () => {
  const googleAuthMutation = useGoogleAuth();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleAuth = async (userRole) => {
    try {
      const result = await signInWithPopup(auth, provider);

      if (!result) {
        throw new Error("Something went wrong");
      }

      const token = await auth.currentUser.getIdToken(true);

      const res = await googleAuthMutation.mutateAsync({ token, userRole });

      if (res.message) {
        throw new Error(res.message);
      }

      dispatch(loginUser({ role: userRole, isAuthenticated: true }));
      navigate(`/${userRole}`);

      return res;
    } catch (error) {
      toast.error(error.message);
    }
  };

  return handleGoogleAuth;
};

export default GoogleAuthHandler;
