import { useMutation } from "@tanstack/react-query";
import { ApiService } from "../../services";

export function useLoginMutation() {
  return useMutation({
    mutationFn: (payload: { userId: string; password: string }) =>
      ApiService.post("users/login", payload),
  });
}

export function useRegisterMutation() {
  return useMutation({
    mutationFn: (payload: {
      userId: string;
      password: string;
      name: string;
    }) => ApiService.post("users/register", payload),
  });
}