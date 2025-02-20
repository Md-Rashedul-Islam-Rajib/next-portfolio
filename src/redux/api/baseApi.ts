import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { RootState } from "../store";

const baseQuery = fetchBaseQuery({
  // baseUrl: "http://localhost:5000",
  baseUrl: "https://nextport-server.vercel.app",

  credentials: "include",
//   prepareHeaders: (headers, { getState }) => {
//     const token = (getState() as RootState).auth.token;
//     if (token) {
//       headers.set("authorization", `${token}`);
//     }
//     return headers;
//   },
});

export const baseApi = createApi({
  tagTypes: ["BLOG", "BLOGS", "PROJECT", "PROJECTS", "UPDATE"],
  reducerPath: "baseApi",
  baseQuery: baseQuery,
  endpoints: () => ({}),
});
