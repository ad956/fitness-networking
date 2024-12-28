import axios from "@api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { auth, provider } from "@utils";
import { signInWithPopup } from "firebase/auth";

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
          validateStatus: (status) => status < 500,
        }
      );

      if (response.message) {
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

    if (!response.data.success) {
      throw new Error("Signup failed");
    }

    return response.data;
  },

  logout: async (userRole) => {
    return axios.post(`auth/logout`);
  },

  checkVerification: async (user) => {
    const response = await axios.post("auth/validate-login", user, {
      headers: {
        "Content-Type": "application/json",
      },
    });
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
      queryClient.removeQueries({ queryKey: ["auth"] });

      // Clear sessionStorage
      sessionStorage.removeItem("userRole");
      sessionStorage.removeItem("accessToken");

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
  const queryClient = useQueryClient();

  return useQuery({
    queryKey: ["auth"],
    queryFn: () => {
      const accessToken = sessionStorage.getItem("accessToken");
      const userRole = sessionStorage.getItem("userRole");

      if (accessToken && userRole) {
        return { isAuthenticated: true, role: userRole };
      }

      return { isAuthenticated: false, role: null };
    },
    retry: false, // No need to retry for auth check
    refetchOnWindowFocus: false, // No need to refetch on window focus
    staleTime: Infinity, // No need to refetch until logout
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

export function useAuthState() {
  const login = useLogin();
  const googleAuth = useGoogleAuth();
  const signup = useSignup();
  const { data: authData, isLoading: isCheckingAuth } = useCheckAuth();
  const queryClient = useQueryClient();

  const storeAccessToken = (accessToken) => {
    // Store the access token in sessionStorage
    sessionStorage.setItem("accessToken", accessToken);
  };

  const storeUserRole = (userRole) => {
    // Store the user role in react-query
    sessionStorage.setItem("userRole", userRole);
  };

  const removeAuthData = () => {
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userRole");
  };

  return {
    login,
    googleAuth,
    signup,
    authData,
    isCheckingAuth,
    storeAccessToken,
    storeUserRole,
    removeAuthData,
  };
}
