import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000/api/order";

export const orderApi = createApi({
  reducerPath: "orderApi",
  tagTypes: ["ORDER_LIST", "ORDER_ID"],
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: ({ body }) => ({
        url: `/transactions`,
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        return response.result;
      },
      invalidatesTags: ["ORDER_LIST"],
    }),
    getOrder: builder.query({
      query: () => ({
        url: "/findAll",
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["ORDER_LIST"],
    }),
    getOrderById: builder.query({
      query: ({ id }) => ({
        url: `/findId/${id}`,
      }),
      transformResponse: (response) => {
        return response.data;
      },
      providesTags: ["ORDER_LIST", "ORDER_ID"],
    }),
    cancelOrder: builder.mutation({
      query: ({ body }) => ({
        url: "/cancel",
        method: "POST",
        body,
      }),
      invalidatesTags: ["ORDER_LIST", "ORDER_ID"],
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrderQuery,
  useGetOrderByIdQuery,
  useCancelOrderMutation,
} = orderApi;
