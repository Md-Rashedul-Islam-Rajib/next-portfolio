
import { TProject } from "@/types/project.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TProject[] = [];

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    createProject: (state, action) => {
      const { productInfo } = action.payload;
      state.push(productInfo);
    },
  },
});

export const { createProject } = projectSlice.actions;

export default projectSlice.reducer;
