import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000/api/product";

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["PRODUCT_LIST", "PRODUCT_ID"],
  baseQuery: fetchBaseQuery({
    baseUrl,
  }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ page }) => ({
        url: `/findAll?page=${page}&limit=10`,
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: ["PRODUCT_LIST"],
    }),
    getProductId: builder.query({
      query: ({ id }) => ({
        url: `/findId/${id}`,
        method: "GET",
      }),
      transformResponse: (response) => {
        return response.result;
      },
      providesTags: ["PRODUCT_ID"],
    }),
  }),
});

export const { useGetProductQuery, useGetProductIdQuery } = productApi;
