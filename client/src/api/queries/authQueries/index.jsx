import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "@api";
import loginUser from "./loginUser";
import googleAuthToken from "./googleAuthToken";
import signupUser from "./signupUser";

export const useLogin = () =>
  useMutation({
    mutationFn: loginUser,
    onError: (error) => {
      throw error;
    },
  });

export const useLogout = (userRole) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => axios.post(`/${userRole}/logout`),
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["user"] });
    },
  });
};

export const useGoogleAuth = () =>
  useMutation({
    mutationFn: googleAuthToken,
  });

export const useSignup = () =>
  useMutation({
    mutationFn: signupUser,
  });

export const useCheckAuth = () =>
  useQuery({
    queryKey: ["auth"],
    queryFn: () => axios.get("/check-auth"),
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useCheckVerification = (identifier) =>
  useQuery({
    queryKey: ["verification", identifier],
    queryFn: async () => {
      const response = await axios.get(
        `/user/check-verification/${identifier}`
      );
      return response.data;
    },
    enabled: !!identifier,
    refetchInterval: 5000,
  });
