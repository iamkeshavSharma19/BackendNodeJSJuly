//?Here we will basically create our Redux Store.
//?Once you have created your Redux Store then you basically have to provide this redux Store to your React Application.
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default appStore;
