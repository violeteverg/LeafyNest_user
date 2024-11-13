import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseUrl = "http://localhost:3000/api/auth/";
export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
    loginGoogle: builder.mutation({
      query: (idToken) => {
        console.log(idToken, "ini id token");
        return {
          url: "/login-google",
          method: "POST",
          body: { idToken },
        };
      },
    }),
    register: builder.mutation({
      query: (body) => ({
        url: "/register",
        method: "POST",
        body,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    forgetPassword: builder.mutation({
      query: (body) => ({
        url: "/forget-password",
        method: "POST",
        body,
      }),
    }),
    resetPassword: builder.mutation({
      query: ({ body, token }) => ({
        url: `/forgetreset-password?token=${token}`,
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLoginGoogleMutation,
  useRegisterMutation,
  useLogoutMutation,
  useForgetPasswordMutation,
  useResetPasswordMutation,
} = authApi;
