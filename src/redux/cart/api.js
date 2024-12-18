import { getToken } from "@/lib/utils";
import { baseUrl } from "@/utils/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
  tagTypes: ["CART_LIST", "CART_ID"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/cart`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("_UserTkn", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    addCart: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["CART_ID", "CART_LIST"],
    }),
    getCart: builder.query({
      query: () => ({
        url: `/findAll`,
      }),
      transformResponse: (response) => {
        return response?.result;
      },
      providesTags: ["CART_LIST"],
    }),
    countCart: builder.query({
      query: () => ({
        url: "/count",
      }),
      providesTags: ["CART_LIST"],
    }),
    updateCart: builder.mutation({
      query: ({ id, quantity }) => ({
        url: `/update/${id}`,
        method: "POST",
        body: { quantity },
      }),
      invalidatesTags: ["CART_ID", "CART_LIST"],
    }),
    removeCart: builder.mutation({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["CART_LIST"],
    }),
  }),
});

export const {
  useAddCartMutation,
  useGetCartQuery,
  useCountCartQuery,
  useUpdateCartMutation,
  useRemoveCartMutation,
} = cartApi;
