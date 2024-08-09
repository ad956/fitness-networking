import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@api";

import googleAuthToken from "./googleAuthToken";
import loginUser from "./loginUser";
import signupUser from "./signupUser";

export const useLogin = () => useMutation({ mutationFn: loginUser });

export const useGoogleAuth = () => useMutation({ mutationFn: googleAuthToken });

export const useSignup = () => useMutation({ mutationFn: signupUser });

export const useLogout = () =>
  useMutation({ mutationFn: () => axios.post("/logout") });

export const useCheckAuth = () =>
  useQuery("auth", () => axios.get("/check-auth"), {
    retry: false,
    refetchOnWindowFocus: false,
  });

export const useCheckVerification = (identifier) =>
  useQuery(
    ["verification", identifier],
    () => axios.get(`user/check-verification/${identifier}`),
    {
      enabled: false,
      retry: false,
    }
  );
