import axios from "@api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "@utils";
import { signInWithPopup } from "firebase/auth";
import { useUserStore } from "@store";

const authApi = {
  login: async (user) => {
    const response = await axios.post(`auth/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.message) throw new Error(response.data.message);
    return response.data;
  },

  demoLogin: async (userRole) => {
    const response = await axios.post(
      `auth/demo-login?role=${userRole}`,
      null,
      {
        withCredentials: true,
      }
    );

    if (response.data.message) throw new Error(response.data.message);
    return response.data;
  },

  googleAuth: async (userRole) => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result) {
        throw new Error("Firebase authentication failed");
      }

      const firebaseToken = await auth.currentUser.getIdToken(true);
      const response = await axios.post(
        `auth/google-auth?role=${userRole}`,
        null,
        {
          headers: {
            Authorization: `Bearer ${firebaseToken}`,
          },
          withCredentials: true,
        }
      );

      if (response.data.message) {
        throw new Error(response.message);
      }
      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  signup: async (user) => {
    const response = await axios.post(`auth/signup`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.data.message) throw new Error(response.data.message);
    return response.data;
  },

  logout: async () => {
    const response = await axios.post(`auth/logout`, null, {
      withCredentials: true,
    });

    if (response.data.message) throw new Error(response.data.message);
    return response.data;
  },

  // for login verification
  checkVerification: async (user) => {
    const response = await axios.post("auth/validate-login", user, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });

    if (response.data.message) throw new Error(response.data.message);
    return response.data;
  },
};

export function useLogin() {
  return useMutation({
    mutationFn: authApi.login,
    onError: (error) => {
      throw new Error(
        error.response?.status === 401
          ? "Invalid email/mobile or password"
          : "Login failed. Please try again later."
      );
    },
  });
}

export function useDemoLogin() {
  const { setUser } = useUserStore();
  return useMutation({
    mutationFn: ({ userRole }) => authApi.demoLogin(userRole),
    onSuccess: (data) => {
      setUser({ ...data.user });
      window.location.reload();
    },
    onError: () => {
      throw new Error("Unable to login as demo user. Please try again later.");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const { logoutUser } = useUserStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth"] });
      logoutUser();
      navigate("/login");
    },
    onError: (error) => {
      throw new Error(error.message);
    },
  });
}

export function useGoogleAuth() {
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: (data) => authApi.googleAuth(data.userRole),
    onSuccess: (data) => {
      setUser({ ...data.user });
      window.location.reload();
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: authApi.signup,
  });
}

export function useCheckVerification(user) {
  return useQuery({
    queryKey: ["verification", user],
    queryFn: () => authApi.checkVerification(user),
    enabled: !!user,
    refetchInterval: 5000,
  });
}
