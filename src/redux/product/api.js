import { baseUrl } from "@/utils/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

export const productApi = createApi({
  reducerPath: "productApi",
  tagTypes: ["PRODUCT_LIST", "PRODUCT_ID"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/product`,
    prepareHeaders: (headers, { endpoint }) => {
      if (endpoint === "createComment") {
        headers.set("_UserTkn", `${Cookies.get("_UserTkn")}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getProduct: builder.query({
      query: ({ page, review, categoryName, search }) => {
        const params = {
          page,
          ...(review && { review }),
          ...(categoryName && { categoryName }),
          ...(search && { search }),
        };
        const queryString = new URLSearchParams(params).toString();

        return { url: `/findAll?${queryString}` };
      },
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
    createComment: builder.mutation({
      query: ({ id, body }) => {
        return {
          url: `/review/${id}`,
          method: "POST",
          body,
          credentials: "include",
        };
      },
      invalidatesTags: ["PRODUCT_ID"],
    }),
  }),
});

export const {
  useGetProductQuery,
  useGetProductIdQuery,
  useCreateCommentMutation,
} = productApi;
