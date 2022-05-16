import React, { useState, useEffect } from "react";

import { Hashicon } from "@emeraldpay/hashicon-react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProfileId } from "../feature/checkProfile/checkProfileSlice";
import { unfollowAccount } from "../feature/followingAccounts/followingAccountSlice";


import { Button } from "react-bootstrap";
import { RiCheckFill, RiDeleteBin6Line } from "react-icons/ri";

function FollowingAccountItem(props) {
  const dispatch = useDispatch();
  const selectedProfileId = useSelector(
    (state) => state.checkProfileReducer.profileId
  );

  const [followButtonTitle, setFollowButtonTitle] = useState("Unfollow");
  const [tickIconStatus, setTickIconStatus] = useState(false);
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
  const styles = ({
    circleImageLayout: {
      width: 50,
      height: 50,
      borderRadius: 50   / 2
    }
  });


  function handleFollowButtonClick(e) {
    dispatch(
      unfollowAccount({
        followedId: props.id,
        followerId: localStorage.getItem("UserId"),
      })
    );
    setFollowButtonTitle("Unfollowed");
    setTickIconStatus(true);
  }

  function handleClick(e) {
    dispatch(getProfileId(props.id));
  }


  return (
    <div className="d-flex align-items-center my-5">
      <div>

        <img src={props.ava}  style = {styles.circleImageLayout}></img>
      </div>
      <div className="mx-3 fw-bold">
        <Link
          to="/newsfeed/profile"
          className="text-decoration-none text-dark"
          onClick={handleClick}
        >
          {props.firstName + " " + props.lastName}
        </Link>
      </div>
      <div>
        <Button
          variant={tickIconStatus ? "danger" : "thanh cong"}
          onClick={handleFollowButtonClick}
        >
          {followButtonTitle}{" "}
          {tickIconStatus ? <RiCheckFill /> : <RiDeleteBin6Line />}
        </Button>
      </div>
    </div>
  );
}

export default FollowingAccountItem;
