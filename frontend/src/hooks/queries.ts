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

export function useShopsQuery() {
    return useQuery({
        queryKey: ["shops"],
        queryFn: async () => {
            return api.getShops();
        },
    });
}

export function useCategoriesQuery() {
    return useQuery({
        queryKey: ["categories"],
        queryFn: async () => {
            return api.getCategories();
        },
    });
}

export function useItemsQuery(shopId: number) {
    return useQuery({
        queryKey: ["items", shopId],
        queryFn: async () => {
            return api.getItems(shopId);
        },
        enabled: !!shopId,
    });
}
