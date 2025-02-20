import { TMessage } from "@/types/message.types";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TMessage[] = [];

const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    createMessage: (state, action) => {
      const { messageInfo } = action.payload;
      state.push(messageInfo);
    },
  },
});

export const { createMessage } = messageSlice.actions;

export default messageSlice.reducer;
