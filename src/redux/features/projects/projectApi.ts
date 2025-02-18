import { baseApi } from "@/redux/api/baseApi";


import {
  // TQueryParam,
  TResponseRedux
} from "@/types/global.types";
import { TProject } from "@/types/project.types";

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create a product
    createProject: builder.mutation({
      query: (data: TProject) => ({
        url: "/projects/create",
        method: "POST",
        body: data,
      }),
    }),
    // get all products
    getAllProjects: builder.query({
      providesTags: ["PROJECTS", "UPDATE"],
      query: () => {
        

        return {
          url: "/projects",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TProject[]>) => ({
        data: response?.data,
      }),
    }),
    getSingleProject: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      providesTags: ["UPDATE", "PROJECTS"],
    }),

    updateProject: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: ["UPDATE", "PROJECT"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UPDATE", "PROJECT"],
    }),
  }),
});

export const {
 useCreateProjectMutation,useGetAllProjectsQuery,useGetSingleProjectQuery,useDeleteProjectMutation,useLazyGetAllProjectsQuery,useLazyGetSingleProjectQuery
} = projectApi;
