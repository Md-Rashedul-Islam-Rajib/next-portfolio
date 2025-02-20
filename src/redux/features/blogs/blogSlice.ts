import { TBlog } from "@/types/blog.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TBlog[] = [];

const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    createBlog: (state, action) => {
      const { blogInfo } = action.payload;
      state.push(blogInfo);
    },
  },
});

export const { createBlog } = blogSlice.actions;

export default blogSlice.reducer;
