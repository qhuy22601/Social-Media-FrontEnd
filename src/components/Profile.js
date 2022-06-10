import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfilePosts } from "../feature/checkProfile/checkProfileSlice";
import PostItem from "./PostItem";

function Profile() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.checkProfileReducer.profileId);
  const postList = useSelector((state) => state.checkProfileReducer.postList);
  const [firstName, setFirstName] = useState(
    localStorage.getItem("UserFirstName")
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("UserLastName")
  );
  const userInfo = useSelector(
    (state) => state.checkProfileReducer.profileInfo
  );
  // const [ava, setAva] = useState(localStorage.getItem("UserAvata"));

  const getProfileInfo = createAsyncThunk(
    "/api/auth/users/profile",
    async (userId, thunkAPI) => {
      const response = await axios({
        method: "post",
        url: "/api/auth/users/profile",
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
        data: {
          id: userId,
        },
      });
      return response.data.payload;
    }
  );

  useEffect(() => {
    if (userId !== null) {
      dispatch(getProfilePosts(userId));
      dispatch(getProfileInfo(userId));
    }
  }, []);

  return (
    <div>
      {postList !== null ? (
        postList.map((postItem) => {
          return (
            <PostItem
              key={postItem.id}
              postId={postItem.id}
              userId={postItem.userId}
              firstName={userInfo.firstName}
              lastName={userInfo.lastName}
              content={postItem.content}
              ava={userInfo.avata}
              image={postItem.image}
              likeList={postItem.like}
              shareList={postItem.share}
              commentList={postItem.comment}
              postDate={postItem.createdAt}
            />
          );
        })
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default Profile;
