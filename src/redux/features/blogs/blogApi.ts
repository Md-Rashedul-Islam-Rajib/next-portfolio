import { baseApi } from "@/redux/api/baseApi";
import { TBlog } from "@/types/blog.types";


import {
  TResponseRedux
} from "@/types/global.types";


const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create a product
    createBlog: builder.mutation({
      query: (data: TBlog) => ({
        url: "/blogs/create",
        method: "POST",
        body: data,
      }),
    }),
    // get all products
    getAllBlogs: builder.query({
      providesTags: ["PROJECTS", "UPDATE"],
      query: () => {
        return {
          url: "/blogs",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TBlog[]>) => ({
        data: response?.data,
      }),
    }),
    getSingleBlog: builder.query({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "GET",
      }),
      providesTags: ["UPDATE", "PROJECTS"],
    }),

    updateBlog: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["UPDATE", "PROJECT"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UPDATE", "PROJECT"],
    }),
  }),
});

export const {
useCreateBlogMutation,useGetAllBlogsQuery,useGetSingleBlogQuery,useUpdateBlogMutation,useDeleteBlogMutation
} = blogApi;
