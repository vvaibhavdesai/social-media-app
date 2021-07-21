import React from "react"
import { configureStore } from '@reduxjs/toolkit';
import postsSliceReducer from "../features/posts/postsSlice";
import usersSliceReducer from "../features/loginpage/LoginPageSlice";
import exploreSliceReducer from "../features/posts/exploreSlice"
export const store = configureStore({
  reducer: { 
    posts:postsSliceReducer,
    users:usersSliceReducer,
    explore:exploreSliceReducer
  },
});
