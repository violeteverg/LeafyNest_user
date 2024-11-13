import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000/api/cart";

export const cartApi = createApi({
  reducerPath: "cartApi",
  tagTypes: ["CART_LIST", "CART_ID"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
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
        return response?.cartItems;
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
