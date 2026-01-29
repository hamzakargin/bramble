import { useApi } from "@/lib/axios";
import type { Chat } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-expo";

export const useChats = () => {
  const { apiWithAuth } = useApi();
  const { userId, isLoaded } = useAuth();
  return useQuery({
    queryKey: ["chats", userId],
    enabled: isLoaded && !!userId,
    queryFn: async () => {
      const { data } = await apiWithAuth<Chat[]>({
        method: "GET",
        url: "/chats",
      });
      return data;
    },
  });
};
