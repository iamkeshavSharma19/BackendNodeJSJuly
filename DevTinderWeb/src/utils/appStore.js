//?Here we will basically create our Redux Store.
//?Once you have created your Redux Store then you basically have to provide this redux Store to your React Application.
import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedSlice";
import userReducer from "./userSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
  },
});

export default appStore;
