import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  toasts: [],
};

const toastSlice = createSlice({
  name: "toast",
  initialState,
  reducers: {
    show(state, action) {
      const { message, duration = 3000, isError } = action.payload;
      if (!message) return;
      state.toasts.push({
        id: nanoid(),
        message,
        duration,
        isError: isError ?? false,
      });
    },
    hide(state, action) {
      state.toasts = state.toasts.filter((t) => t.id !== action.payload);
    },
  },
});

export const { show, hide } = toastSlice.actions;

export default toastSlice.reducer;
