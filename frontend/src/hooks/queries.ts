import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../api";
import type { CreateBanInput, CreateItemInput, UpdateItemInput } from "../api";
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

export function useCreateItemMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateItemInput) => {
            return api.createItem(data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["items", variables.shop_id] });
        },
    });
}

export function useUpdateItemMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, data }: { id: number; data: UpdateItemInput }) => {
            return api.updateItem(id, data);
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["items", data.shop_id] });
        },
    });
}

export function useDeleteItemMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({ id, shopId }: { id: number; shopId: number }) => {
            await api.deleteItem(id);
            return shopId;
        },
        onSuccess: (shopId) => {
            queryClient.invalidateQueries({ queryKey: ["items", shopId] });
        },
    });
}

export function useDailyActiveUsersQuery(params: { interval: number; start_date: string }) {
    return useQuery({
        queryKey: ["dailyActiveUsers", params],
        queryFn: async () => {
            return api.getDailyActiveUsers(params);
        },
    });
}

export function useMonthlyActiveUsersQuery(params: { interval: number; start_date: string }) {
    return useQuery({
        queryKey: ["monthlyActiveUsers", params],
        queryFn: async () => {
            return api.getMonthlyActiveUsers(params);
        },
    });
}

export function useDailyMatchesStatsQuery(params: { interval: number; start_date: string }) {
    return useQuery({
        queryKey: ["dailyMatchesStats", params],
        queryFn: async () => {
            return api.getDailyMatchesStats(params);
        },
    });
}

export function useDailySalesStatsQuery(params: { interval: number; start_date: string }) {
    return useQuery({
        queryKey: ["dailySalesStats", params],
        queryFn: async () => {
            return api.getDailySalesStats(params);
        },
    });
}

export function useMatchesQuery() {
    return useQuery({
        queryKey: ["matches"],
        queryFn: async () => {
            return api.getAllMatches();
        },
    });
}

export function useBansQuery(userId: number) {
    return useQuery({
        queryKey: ["bans", userId],
        queryFn: async () => {
            return api.getBans(userId);
        },
        enabled: !!userId,
    });
}

export function useBanUserMutation() {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async (data: CreateBanInput) => {
            return api.banUser(data);
        },
        onSuccess: (_, variables) => {
            queryClient.invalidateQueries({ queryKey: ["bans", variables.player_id] });
        },
    });
}
