import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jwt: "",
  user: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateState: (state, action) => {
      state.jwt = action.payload;
    },
    updateUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateState, updateUser } = userSlice.actions;

export default userSlice.reducer;
