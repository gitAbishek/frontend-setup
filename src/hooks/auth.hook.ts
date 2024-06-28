import { useMutation } from "@tanstack/react-query";
import { post, postUser } from "../api/client";

export const useCreateAccount = () =>
  useMutation({
    mutationFn: (body: object) => post({ url: "api/v1/user/create", body }),
  });

export const useLoginAccount = () =>
  useMutation({
    mutationFn: (body: object) =>
      post({ url: "api/v1/users/staff/login", body }),
  });

export const usePasswordReset = () =>
  useMutation({
    mutationFn: (body: object) =>
      postUser({
        url: "api/v1/users/change-user-password",
        body,
      }),
  });

export const useForgotPassword = () =>
  useMutation({
    mutationFn: (body: object) =>
      postUser({
        url: "api/v1/users/password/reset",
        body,
      }),
  });

export const useForgotPasswordConfirm = () =>
  useMutation({
    mutationFn: (body: object) =>
      postUser({
        url: "api/v1/users/password/reset/conform",
        body,
      }),
  });
