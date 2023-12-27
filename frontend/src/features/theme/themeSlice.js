import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkTheme: !!localStorage.getItem("darkTheme"),
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
  },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
