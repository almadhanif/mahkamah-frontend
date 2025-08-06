"use client";

import {
  QueryKey,
  useMutation,
  useQuery,
  useQueryClient,
  useInfiniteQuery,
  InfiniteData,
  UseInfiniteQueryOptions,
  UseQueryOptions,
  UseMutationOptions,
} from "@tanstack/react-query";
import axiosClient from "./client";
import { BASE_PROXY } from "./endpoint";
import { notifications } from "@mantine/notifications";
import { AxiosRequestConfig, AxiosResponse } from "axios";

// Helper untuk membuat URL dengan base proxy
const getBaseUrl = (proxy: keyof typeof BASE_PROXY) =>
  BASE_PROXY[proxy];

type MutationParams<T = unknown> = {
  endpoint: string;
  data?: T;
  params?: Record<string, unknown>;
  headers?: Record<string, string>;
  axiosConfigs?: AxiosRequestConfig;
};

export const Networks = (proxy: keyof typeof BASE_PROXY) => {
  const baseUrl = getBaseUrl(proxy);
  const queryClient = useQueryClient();

  return {
    // Query (GET)
    useQuery: <TData = unknown, TError = Error>(
      endpoint: string,
      queryKey: QueryKey,
      options?: Omit<
        UseQueryOptions<TData, TError>,
        "queryKey" | "queryFn"
      >,
      axiosConfigs?: AxiosRequestConfig,
    ) => {
      return useQuery<TData, TError>({
        queryKey,
        queryFn: async () => {
          try {
            const response: AxiosResponse = await axiosClient.get(
              `${baseUrl}${endpoint}`,
              {
                ...axiosConfigs,
              },
            );
            return response.data?.data || response.data;
          } catch (error: unknown) {
            const errorResponse = error as {
              response?: { data?: { message?: string } };
            };
            notifications.show({
              title: "Error",
              message:
                errorResponse.response?.data?.message ||
                "Something went wrong",
              color: "red",
            });
            throw error;
          }
        },
        ...options,
      });
    },

    // Infinite Query (Pagination)
    useInfiniteQuery: <
      TData extends { currentPage?: number; totalPages?: number } = {
        currentPage?: number;
        totalPages?: number;
      },
      TError = Error,
    >(
      endpoint: string,
      queryKey: QueryKey,
      options?: Partial<
        UseInfiniteQueryOptions<
          TData,
          TError,
          InfiniteData<TData>,
          QueryKey,
          number
        >
      >,
      axiosConfigs?: AxiosRequestConfig,
    ) => {
      return useInfiniteQuery<
        TData,
        TError,
        InfiniteData<TData>,
        QueryKey,
        number
      >({
        queryKey,
        queryFn: async ({ pageParam = 1 }) => {
          try {
            const response: AxiosResponse = await axiosClient.get(
              `${baseUrl}${endpoint}`,
              {
                ...axiosConfigs,
                params: {
                  page: pageParam,
                  ...(axiosConfigs?.params ?? {}),
                },
              },
            );
            return response.data?.data || response.data;
          } catch (error: unknown) {
            notifications.show({
              title: "Error",
              message:
                (
                  error as {
                    response?: { data?: { message?: string } };
                  }
                ).response?.data?.message || "Something went wrong",
              color: "red",
            });
            throw error;
          }
        },
        getNextPageParam: (lastPage: TData, allPages: TData[]) => {
          // Update logic sesuai struktur paginasi API kamu
          const currentPage =
            lastPage?.currentPage ?? allPages.length;
          const totalPages = lastPage?.totalPages ?? currentPage;
          return currentPage < totalPages
            ? currentPage + 1
            : undefined;
        },
        initialPageParam: 1,
        ...options,
      });
    },

    // Mutation (POST, PUT, DELETE)
    useMutation: <
      TData = unknown,
      TError = Error,
      TVariables extends MutationParams = MutationParams,
    >(
      method: "post" | "put" | "delete",
      options?: UseMutationOptions<TData, TError, TVariables>,
    ) => {
      return useMutation<TData, TError, TVariables>({
        mutationFn: async (variables: TVariables) => {
          const {
            endpoint,
            data,
            params,
            headers,
            axiosConfigs = {},
          } = variables;
          try {
            const response: AxiosResponse = await axiosClient.request(
              {
                method,
                url: `${baseUrl}${endpoint}`,
                data,
                params,
                headers,
                ...axiosConfigs,
              },
            );
            return response.data?.data || response.data;
          } catch (error: unknown) {
            const errorResponse = error as {
              response?: { data?: { message?: string } };
            };
            notifications.show({
              title: "Error",
              message:
                errorResponse.response?.data?.message ||
                "Something went wrong",
              color: "red",
            });
            throw error;
          }
        },
        ...options,
      });
    },

    // Invalidate Query
    invalidate: (queryKey: QueryKey) => {
      return queryClient.invalidateQueries({ queryKey });
    },
  };
};

export default Networks;
