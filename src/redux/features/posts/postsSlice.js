import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { sub } from "date-fns";
import axios from "axios";

const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";

const initialState = {
  posts: [],
  status: "idle", // "idle" | "loading" | "success" | "failed"
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(POSTS_URL);
  return response.data;
});

export const addNewPost = createAsyncThunk(
  "posts/addNewPost",
  async (initialPost) => {
    try {
      const res = await axios.post(POSTS_URL, initialPost);
      // console.log("newposts=>", res.data);
      return res.data;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reactionsAdded: (state, action) => {
      const { postId, reaction } = action.payload;
      const existingPost = state.posts.find((post) => post.id === postId);
      if (existingPost) {
        existingPost.reactions[reaction]++;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state, action) => {
        state.status = "loading";
        // console.log("pending");
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "success";
        // Adding date and reactions
        let min = 1;
        const loadPosts = action.payload.map((post) => {
          post.date = sub(new Date(), { minutes: min++ }).toISOString();
          post.reactions = {
            thumbsUp: 0,
            wow: 0,
            love: 0,
            dislike: 0,
            sad: 0,
            hot: 0,
          };
          return post;
        });
        // Add any fetched posts to the array
        state.posts = state.posts.concat(loadPosts);
        // console.log("fulfilled");
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        // console.log("failed");
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        action.payload.userId = Number(action.payload.userId);
        action.payload.data = new Date().toISOString();
        action.payload.reactions = {
          thumbsUp: 0,
          wow: 0,
          love: 0,
          dislike: 0,
          sad: 0,
          hot: 0,
        };
        // console.log("action payload", action.payload);
        state.posts.push(action.payload);
      });
  },
});

export const { addPost, reactionsAdded } = postsSlice.actions;
export default postsSlice.reducer;
