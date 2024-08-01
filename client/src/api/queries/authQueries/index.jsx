import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "@api";

import googleAuthToken from "./googleAuthToken";
import loginUser from "./loginUser";
import signupUser from "./signupUser";

export { googleAuthToken, loginUser, signupUser };

export const useLogin = () => useMutation(loginUser);

export const useGoogleAuth = () => useMutation(googleAuthToken);

export const useSignup = () => useMutation(signupUser);

export const useLogout = () => useMutation(() => axios.post("/logout"));

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
