import { baseApi } from "@/redux/api/baseApi";



import {
  TResponseRedux
} from "@/types/global.types";
import { TMessage } from "@/types/message.types";


const messageApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // create a product
    createMessage: builder.mutation({
      query: (data: TMessage) => ({
        url: "/messages/create",
        method: "POST",
        body: data,
      }),
    }),
    // get all products
    getAllMessages: builder.query({
      providesTags: ["PROJECTS", "UPDATE"],
      query: () => {
        return {
          url: "/messages",
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<TMessage[]>) => ({
        data: response?.data,
      }),
    }),
    getSingleMessage: builder.query({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "GET",
      }),
      providesTags: ["UPDATE", "PROJECTS"],
    }),

    updateMessage: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `/messages/${id}`,
        method: "PUT",
        body: JSON.stringify(updatedData),
        headers: {
          "Content-Type": "application/json",
        },
      }),
      invalidatesTags: ["UPDATE", "PROJECT"],
    }),
    deleteMessage: builder.mutation({
      query: (id) => ({
        url: `/messages/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UPDATE", "PROJECT"],
    }),
  }),
});

export const {
useCreateMessageMutation,useGetAllMessagesQuery,useGetSingleMessageQuery
} = messageApi;
