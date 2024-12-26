import axios from "@api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "@utils";
import { signInWithPopup } from "firebase/auth";

const authApi = {
  login: async (user) => {
    const path = user.role === "user" ? "user" : "partner";
    const response = await axios.post(`${path}/login`, user, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.message) {
      throw new Error("Login failed");
    }

    return response.data;
  },

  googleAuth: async (userRole) => {
    try {
      const result = await signInWithPopup(auth, provider);
      if (!result) {
        throw new Error("Firebase authentication failed");
      }

      const firebaseToken = await auth.currentUser.getIdToken(true);
      const response = await axios.post(`${userRole}/google-auth`, null, {
        headers: {
          Authorization: `Bearer ${firebaseToken}`,
        },
        validateStatus: (status) => status < 500,
      });

      if (response.message) {
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      throw new Error(error.message);
    }
  },

  signup: async ({ email, password, role }) => {
    const response = await axios.post(`/api/${role}/signup`, {
      email,
      password,
      role,
    });

    if (!response.data.success) {
      throw new Error("Signup failed");
    }

    return response.data;
  },

  logout: async (userRole) => {
    return axios.post(`/${userRole}/logout`);
  },

  checkAuth: async () => {
    return axios.get("/check-auth");
  },

  checkVerification: async (identifier) => {
    const response = await axios.get(`/user/check-verification/${identifier}`);
    return response.data;
  },
};

export function useLogin() {
  return useMutation({
    mutationFn: authApi.login,
    onError: (error) => {
      if (error.response?.status === 401) {
        throw new Error("Invalid email/mobile or password");
      }
      throw new Error("Login failed. Please try again later.");
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (userRole) => authApi.logout(userRole),
    onSuccess: () => {
      // Clear React Query cache
      queryClient.removeQueries({ queryKey: ["user"] });

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
}

export function useGoogleAuth() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data) => authApi.googleAuth(data.userRole),
    onSuccess: (data, variables) => {
      navigate(`/${variables.userRole}`);
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: authApi.signup,
  });
}

export function useCheckAuth() {
  // return useQuery({
  //   queryKey: ["auth"],
  //   queryFn: authApi.checkAuth,
  //   retry: false,
  //   refetchOnWindowFocus: false,
  // });

  return true;
}

export function useCheckVerification(identifier) {
  return useQuery({
    queryKey: ["verification", identifier],
    queryFn: () => authApi.checkVerification(identifier),
    enabled: !!identifier,
    refetchInterval: 5000,
  });
}

export function useAuthState() {
  const login = useLogin();
  const googleAuth = useGoogleAuth();
  const signup = useSignup();
  const { data: authData, isLoading: isCheckingAuth } = useCheckAuth();

  return {
    login,
    googleAuth,
    signup,
    authData,
    isCheckingAuth,
    isAuthenticated: !!authData?.user,
  };
}
