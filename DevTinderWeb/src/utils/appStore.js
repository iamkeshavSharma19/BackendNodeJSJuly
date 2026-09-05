//?Here we will basically create our Redux Store.
//?Once you have created your Redux Store then you basically have to provide this redux Store to your React Application.
import { configureStore } from "@reduxjs/toolkit";
import feedReducer from "./feedSlice";
import userReducer from "./userSlice";
import connectionsReducer from "./connectionSlice";
import requestsReducer from "./requestSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    feed: feedReducer,
    connections: connectionsReducer,
    requests: requestsReducer,
  },
});

export default appStore;
