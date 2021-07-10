import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  posts: [],
  error: null,
  status: "idle",
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (token) => {
    console.log(token, "from thunk");
    const { data } = await axios.get(
      "https://socialMedia.vaibhavdesai888.repl.co/posts/feed",
      {
        headers: {
          Authorization: token,
        },
      }
    );
    return data.post;
    // })
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    likeToggled: (state, action) => {
      console.log(action.payload.newData, "yeh hai payload");

      return {...state, posts:state.posts.map((post) => {
        if (post._id === action.payload.newData.data._id) {
          return post.likes.find((ids) => ids === action.payload.newData.id)
            ? {
                ...post,
                likes: post.likes.filter(
                  (ids) => ids !== action.payload.newData.id
                ),
              }
            : { ...post, likes: post.likes.concat(action.payload.newData.id) };
        } else {
          return post;
        }
      })}

    },
  },
  extraReducers: {
    [fetchPosts.pending]: (state, action) => {
      state.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.status = "fulfilled";
      state.posts = state.posts.concat(action.payload);
    },
    [fetchPosts.error]: (state, action) => {
      state.status = "error";
      state.error = action.error.message;
    },
  },
});

export const { likeToggled } = postsSlice.actions;

export default postsSlice.reducer;
