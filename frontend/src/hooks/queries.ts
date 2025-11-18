import { useQuery } from "@tanstack/react-query";
import api from "../api";
import type { UserSearchParams } from "../api";

export function useUsersQuery(
    searchParams?: UserSearchParams,
    enabled: boolean = true
) {
    return useQuery({
        queryKey: ["users", searchParams],
        queryFn: async () => {
            return api.getUsers(searchParams);
        },      
        enabled,
    });
}
