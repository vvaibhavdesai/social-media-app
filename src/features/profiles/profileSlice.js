import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchProfilePosts = createAsyncThunk(
  "profile/profileData",
  async (token) => {
    try {
      const { data } = await axios.get(
        `https://socialMedia.vaibhavdesai888.repl.co/posts/mypost`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      return data.mypost;
    } catch (e) {
      console.log(e.message);
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchProfilePosts.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchProfilePosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        if (state.posts.length === 0) {
          console.log(action.payload, "from profile service");
          state.posts.push(...action.payload);
        } else if (state.posts.length > 0) {
          action.payload.forEach((post) => {
            state.posts.forEach((statePost) =>
              statePost._id === post.id
                ? console.log(statePost._id, "matching")
                : state.posts.concat(post)
            );
          });
        }
      })
      .addCase(fetchProfilePosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});
export const { storeUserPosts } = profileSlice.actions;

export default profileSlice.reducer;
