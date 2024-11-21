import { getToken } from "@/lib/utils";
import { baseUrl } from "@/utils/constants/constants";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const addressApi = createApi({
  reducerPath: "addressApi",
  tagTypes: ["ADDRESS_LIST"],
  baseQuery: fetchBaseQuery({
    baseUrl: `${baseUrl}/address`,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = getToken();
      if (token) {
        headers.set("token", `${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createAddress: builder.mutation({
      query: (body) => ({
        url: "/create",
        method: "POST",
        body,
      }),
      transformResponse: (response) => {
        console.log(response?.result, "ini responseny");
        return response?.result;
      },
      invalidatesTags: ["ADDRESS_LIST"],
    }),
    getAdress: builder.query({
      query: (body) => ({
        url: "/findAll",
        body,
      }),
      transformResponse: (response) => {
        console.log(response?.result, "ini responseny");
        return response?.result;
      },
      providesTags: ["ADDRESS_LIST"],
    }),
    deleteAddress: builder.mutation({
      query: ({ id }) => ({
        url: `/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ADDRESS_LIST"],
    }),
  }),
});

export const {
  useCreateAddressMutation,
  useGetAdressQuery,
  useDeleteAddressMutation,
} = addressApi;
