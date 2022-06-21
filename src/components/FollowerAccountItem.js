import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { RiCheckFill, RiUserFollowFill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProfileId } from "../feature/checkProfile/checkProfileSlice";
import { followAccount } from "../feature/followingAccounts/followingAccountSlice";

function FollowerAccountItem(props) {
  const dispatch = useDispatch();
  const selectedProfileId = useSelector(
    (state) => state.checkProfileReducer.profileId
  );
  const storeFollowingAccounts = useSelector(
    (state) => state.followingAccountReducer.followingAccounts
  );

  const [followButtonTitle, setFollowButtonTitle] = useState("Theo dõi");
  const [tickIconStatus, setTickIconStatus] = useState(false);

  function handleFollowButtonClick(e) {
    dispatch(
      followAccount({
        followedId: props.id,
        followerId: localStorage.getItem("UserId"),
      })
    );
    setFollowButtonTitle("Theo dõi");
    setTickIconStatus(true);
  }

  function handleClick(e) {
    dispatch(getProfileId(props.id));
  }

  const [url, setUrl] = useState("");
  const uploader = (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem("UserAvata", reader.result);
    });
    reader.readAsDataURL(file);
  };

  const styles = {
    circleImageLayout: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
    },

    name: {
      color: "#000",
      textTransform: "capitalize",
    },
    btnn: {
      color: "#7eb4e9",
      border: "1px solid #7eb4e9",
    },
  };

  useEffect(() => {
    if (storeFollowingAccounts !== null) {
      for (let i = 0; i < storeFollowingAccounts.length; i++) {
        if (storeFollowingAccounts[i].id === props.id) {
          setTickIconStatus(true);
          setFollowButtonTitle("Theo dõi");
        }
      }
    }
  }, []);

  // let a = props.

  return (
    <div className="d-flex align-items-center my-5">
      <div>
        <img src={props.ava} style={styles.circleImageLayout} />
      </div>
      <div className="mx-3 fw-bold">
        <Link
          to="/newsfeed/profile"
          className="text-decoration-none text-dark"
          onClick={handleClick}
        >
          <h5 className="name" style={styles.name}>
            {props.firstName + " " + props.lastName}{" "}
          </h5>
        </Link>
      </div>
      <div>
        <Button
          style={styles.btnn}
          variant={tickIconStatus ? "primary" : "thanh cong"}
          onClick={handleFollowButtonClick}
          disabled={tickIconStatus}
        >
          {followButtonTitle}{" "}
          {tickIconStatus ? <RiCheckFill /> : <RiUserFollowFill />}
        </Button>
      </div>
    </div>
  );
}

export default FollowerAccountItem;
