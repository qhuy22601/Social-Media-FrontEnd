import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  followingAccounts: null,
  followerAccounts: null,
};

export const getAvata = createAsyncThunk(
  "/api/auth/users/getava",
  async ({avaID},thunkAPI) => {
    const response = await axios({
      method: "post",
      url:"/api/auth/users/getava",
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
      data:{
        ava: avaID,
      },
    });
    return response.data.payload;
  }
)

export const getFollowingAccounts = createAsyncThunk(
  "/api/auth/users/getfollowing",
  async (thunkAPI) => {
    const response = await axios({
      method: "post",
      url: "/api/auth/users/getfollowing",
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
      data: {
        id: localStorage.getItem("UserId"),
      },
    });

    return response.data.payload;
  }
);

export const getFollowerAccounts = createAsyncThunk(
  "/api/auth/users/getfollower",
  async (thunkAPI) => {
    const response = await axios({
      method: "post",
      url: "/api/auth/users/getfollower",
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
      data: {
        id: localStorage.getItem("UserId"),
      }
    });
    return response.data.payload;
  }
);

export const getAllAccounts = createAsyncThunk(
  "/api/auth/users",
  async (thunkAPI) => {
    const response = await axios({
      method: "post",
      url: "/api/auth/users",
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
    });
    return response.data.payload;
  }
);

export const unfollowAccount = createAsyncThunk(
  "/api/auth/users/unfollow",
  async ({followedId, followerId}, thunkAPI) => {
    const response = await axios({
      method: "post",
      url: "/api/auth/users/unfollow",
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
      data: {
        id1: followedId,
        id2: followerId,
      },
    });
    return response.data.payload;
  }
);

export const followAccount = createAsyncThunk(
  "/api/auth/users/follow",
  async ({followedId, followerId}, thunkAPI) => {
    const response = await axios({
      method: "post",
      url: "/api/auth/users/follow",
      headers: {
        Authorization: localStorage.getItem("Token"),
      },
      data: {
        id1: followedId,
        id2: followerId,
      }
    });
    return response.data.payload;
  }
);

export const followingAccountSlice = createSlice({
  name: "getFollowingAccountSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getFollowingAccounts.fulfilled, (state, action) => {
      state.followingAccounts = action.payload;
    });
    builder.addCase(getFollowerAccounts.fulfilled, (state, action) => {
      state.followerAccounts = action.payload;
    });
    builder.addCase(getAvata.fulfilled, (state, action) => {
      state.followingAccounts = action.payload;
    });
    builder.addCase(unfollowAccount.fulfilled, (state, action) => {
      state.followingAccounts = state.followingAccounts.filter((item) => item.id !== action.payload.id);
    });
    builder.addCase(followAccount.fulfilled, (state, action) => {
    });
    builder.addCase(getAllAccounts.fulfilled, (state, action) => {
      state.followerAccounts = action.payload;
    });
  },
});

export default followingAccountSlice.reducer;
