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
    return true;
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
  const { removeAuthData } = useAuthState();

  const mutation = useMutation({
    mutationFn: (userRole) => authApi.logout(userRole),
    onSuccess: () => {
      throw new Error("VHH");

      // Clear React Query cache
      queryClient.removeQueries({ queryKey: ["auth"] });

      // Clear localStorage
      removeAuthData();

      window.location.reload();
    },
  });

  return {
    logout: mutation.mutate,
    isLoading: mutation.isLoading,
    logoutError: mutation.error,
  };
}

export function useGoogleAuth() {
  const { storeAccessToken, storeUserRole } = useAuthState();

  return useMutation({
    mutationFn: (data) => authApi.googleAuth(data.userRole),
    onSuccess: (data, variables) => {
      storeAccessToken(data.accessToken);
      storeUserRole(variables.userRole);

      window.location.reload();
    },
  });
}

export function useSignup() {
  return useMutation({
    mutationFn: authApi.signup,
  });
}

export function useCheckAuth() {
  return useQuery({
    queryKey: ["auth"],
    queryFn: () => {
      const accessToken = localStorage.getItem("accessToken");
      const userRole = localStorage.getItem("userRole");

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
  const storeAccessToken = (accessToken) => {
    // Store the access token in localStorage
    localStorage.setItem("accessToken", accessToken);
  };

  const storeUserRole = (userRole) => {
    // Store the user role in localStorage
    localStorage.setItem("userRole", userRole);
  };

  const removeAuthData = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
  };

  return {
    storeAccessToken,
    storeUserRole,
    removeAuthData,
  };
}
