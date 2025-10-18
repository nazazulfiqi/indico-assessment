import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userApi } from "../api/userApi";
import type { User } from "../types/user";

export const useUsers = () => {
  const queryClient = useQueryClient();

  const usersQuery = useQuery<User[]>({
    queryKey: ["users"],
    queryFn: userApi.getAll,
  });

  const createUser = useMutation({
    mutationFn: userApi.create,
    onSuccess: (newUserData) => {
      queryClient.setQueryData<User[]>(["users"], (old = []) => {
        const tempId = Math.max(...old.map((u) => u.id), 0) + 1;
        return [...old, { ...newUserData, id: tempId }];
      });
    },
  });

  const updateUser = useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<User> }) =>
      userApi.update(id, data),
    onSuccess: (_, { id, data }) => {
      queryClient.setQueryData<User[]>(["users"], (old = []) =>
        old.map((u) => (u.id === id ? { ...u, ...data } : u))
      );
    },
  });

  const deleteUser = useMutation({
    mutationFn: userApi.delete,
    onSuccess: (_res, id: number) => {
      queryClient.setQueryData<User[]>(["users"], (old = []) =>
        old.filter((u) => u.id !== id)
      );
    },
  });

  return { usersQuery, createUser, updateUser, deleteUser };
};
