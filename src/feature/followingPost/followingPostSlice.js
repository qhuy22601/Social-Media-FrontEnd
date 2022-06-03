import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  followingPosts: null,
};

export const getFollowingPosts = createAsyncThunk(
  "/api/posts/followingposts",
  async (thunkAPI) => {
    const response = await axios({
      method: "post",
      url: "/api/posts/followingposts",
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

async function delPost(postId){
  const response = await axios({
    method:"delete",
    url: "/api/posts/del/"+postId,
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
    data: {
      id: postId
    },
  });
  return response.data.payload;
};

async function insertComment(postId, commentContent) {
  const response = await axios({
    method: "post",
    url: "/api/posts/insertcomment",
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
    data: {
      commentEntity: {
        userId: localStorage.getItem("UserId"),
        userFullname: localStorage.getItem("UserFirstName") + " " + localStorage.getItem("UserLastName"),
        content: commentContent, 
      },
      postId: {
        id: postId,
      },
    },
  });
}

async function updateLike(postId, currentUserId) {
    const response = await axios({
        method: "post",
        url: "/api/posts/likepost",
        headers: {
         Authorization: localStorage.getItem("Token"),
        },
        data: {
            id1: postId,
            id2: currentUserId,
        }
    });
    
    return response.data;
}

async function updateShare(postId, currentUserId) {
    const response = await axios({
        method: "post",
        url: "/api/posts/sharepost",
        headers: {
         Authorization: localStorage.getItem("Token"),
        },
        data: {
            id1: postId,
            id2: currentUserId,
        }
    });
    
    return response.data;
}

export const followingPostSlice = createSlice({
  name: "followingPostSlice",
  initialState,
  reducers: {
      addLike: (state, action) => {
        if (state.followingPosts !== null) {
            for (let i = 0; i < state.followingPosts.length; i++) {
                if (state.followingPosts[i].post.id === action.payload.postId) {
                    if (!state.followingPosts[i].post.like.includes(action.payload.userId)) {
                        state.followingPosts[i].post.like.push(action.payload.userId);
                        updateLike(action.payload.postId, action.payload.userId);
                    } else {
                        state.followingPosts[i].post.like = state.followingPosts[i].post.like.filter(item => item !== action.payload.userId);
                        updateLike(action.payload.postId, action.payload.userId);
                    }
                }
            }
        }
      },

      del:(state, action)=>{
        if (state.followingPosts != null) {
          delPost(action.payload.postId)
        }
      },

      addShare: (state, action) => {
          if (state.followingPosts !== null) {
              for (let i = 0; i < state.followingPosts.length; i++) {
                  if (state.followingPosts[i].post.id === action.payload.postId) {
                      state.followingPosts[i].post.share.push(action.payload.userId);
                      updateShare(action.payload.postId, action.payload.userId);
                  }
              }
          }
      },

      addComment: (state, action) => {
        if (state.followingPosts !== null) {
          for (let i = 0; i < state.followingPosts.length; i++) {
            if (state.followingPosts[i].post.id === action.payload.postId) {
              state.followingPosts[i].post.comment.push(action.payload.newComment);
              insertComment(action.payload.postId, action.payload.newComment.content);
            }
          }
        }
      }
  },
  extraReducers: (builder) => {
    builder.addCase(getFollowingPosts.fulfilled, (state, action) => {
      state.followingPosts = action.payload;
    });
  },
});

export const {addLike, addShare, addComment, del} = followingPostSlice.actions;
export default followingPostSlice.reducer;
