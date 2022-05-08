
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { getProfilePosts } from "../feature/checkProfile/checkProfileSlice";
import { getProfileInfo } from "../feature/checkProfile/checkProfileSlice";
import PostItem from "./PostItem";

function MyProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.checkProfileReducer.postList);
  const userInfo = useSelector((state) => state.checkProfileReducer.profileInfo);
  const [firstName, setFirstName] = useState(localStorage.getItem("UserFirstName"))
  const [lastName, setLastName] = useState(localStorage.getItem("UserLastName"))
  const [url, setUrl] =useState('');
  const uploader = (file) =>{
  const reader = new FileReader();
  reader.addEventListener('load', ()=>{
      localStorage.setItem('UserAvata',reader.result)
  })
  reader.readAsDataURL(file);
  }
  useEffect(() => {
    setUrl(localStorage.getItem('UserAvata'));
  }, [])

  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/unauthorized");
    }

    if (localStorage.getItem("UserId") !== null) {
      dispatch(getProfilePosts(localStorage.getItem("UserId")));
      dispatch(getProfileInfo(localStorage.getItem("UserId")));
    }
  }, []);
  const styles = ({
    circleImageLayout: {
      marginTop:20,
      marginRight:20,
      width: 100,
      height: 100,
      borderRadius: 100/2,
      marginBottom: 20
    },
    h:{
      textTransform: 'capitalize'
    },
    edit:{
      textDecoration: 'none',
    }
  });


  return (
    <div>
      <div>
      <div className="header_info">
          <img src ={url} style = {styles.circleImageLayout}/>   
            <h2 style = {styles.h}>{firstName} {lastName}</h2>
            <Link to="editform" style={{ textDecoration: 'none', color:'black', marginTop:10, marginLeft:600}}><Button>Chỉnh sửa trang cá nhân</Button></Link>
          </div>
      </div>
      <h1>Bài viết</h1>
      {postList !== null ? (
        postList.map((postItem) => {
          return (
            <PostItem
              key={postItem.id}
              postId={postItem.id}
              userId={postItem.userId}
              firstName={firstName}
              lastName={lastName}
              content={postItem.content}
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

export default MyProfile;
