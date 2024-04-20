import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../index";
import { googleAuthToken } from "@api";

const GoogleAuthHandler = async (userRole) => {
  try {
    const result = await signInWithPopup(auth, provider);

    if (!result) {
      throw new Error("Something went wrong");
    }

    const token = await auth.currentUser.getIdToken(true);

    const res = await googleAuthToken(token, userRole);

    if (res.message) {
      throw new Error(res.message);
    }

    return res;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default GoogleAuthHandler;
