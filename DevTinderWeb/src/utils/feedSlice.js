import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => {
      return action.payload;
    },

    clearFeed: (state, action) => {
      return null;
    },

    removeUserFeed: (state, action) => {
      console.log(action.payload);
      const newFeed = state.filter((user) => user._id !== action.payload);
      console.log(newFeed);
      return newFeed;
    },
  },
});

export const { addFeed, removeUserFeed, clearFeed } = feedSlice.actions;
export default feedSlice.reducer;
