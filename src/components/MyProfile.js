import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getProfileInfo,
  getProfilePosts,
} from "../feature/checkProfile/checkProfileSlice";
import PostItem from "./PostItem";
function MyProfile() {
  const [address, setAddress] = useState(localStorage.getItem("UserAddress"));
  const [phoneNumber, setPhoneNumber] = useState(
    localStorage.getItem("UserPhoneNumber")
  );
  const [email, setEmail] = useState(localStorage.getItem("UserEmail"));
  const [birthDate, setBirthDate] = useState(
    localStorage.getItem("UserBirthDate")
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const postList = useSelector((state) => state.checkProfileReducer.postList);
  const userInfo = useSelector(
    (state) => state.checkProfileReducer.profileInfo
  );
  const [firstName, setFirstName] = useState(
    localStorage.getItem("UserFirstName")
  );
  const [lastName, setLastName] = useState(
    localStorage.getItem("UserLastName")
  );
  const [full, setFull] = useState(localStorage.getItem("UserName"));
  const [fullname, setFullname] = useState(firstName + " " + lastName);
  const [url, setUrl] = useState("");
  const uploader = (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => {
      localStorage.setItem("UserAvata", reader.result);
    });
    reader.readAsDataURL(file);
  };
  useEffect(() => {
    setUrl(localStorage.getItem("UserAvata"));
  }, []);

  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/unauthorized");
    }

    if (localStorage.getItem("UserId") !== null) {
      dispatch(getProfilePosts(localStorage.getItem("UserId")));
      dispatch(getProfileInfo(localStorage.getItem("UserId")));
    }
  }, []);

  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };
  const styles = {
    circleImageLayout: {
      marginTop: 20,
      marginRight: 20,
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      marginBottom: 20,
    },

    container: {
      width: 700,
      display: "flex",
    },
    h: {
      textTransform: "capitalize",
      color: "black",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },
    edit: {
      textDecoration: "none",
    },
    display: {
      color: "#AEDBCE",
      display: "flex",
      alignItems: "center",
    },

    im: {
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },

    icon: {
      color: "#47B5FF",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
    },

    h1: {
      color: "#AEDBCE",
      padding: "1px",
      marginLeft: "20px",
    },
  };

  return (
    <div>
      <div>
        <div style={styles.container}>
          <div style={styles.im}>
            <img src={url} style={styles.circleImageLayout} />
            <h2 style={styles.h}>{full}</h2>
          </div>
          <div style={styles.display}>
            <AllInclusiveIcon
              style={styles.icon}
              onMouseOver={handleMouseOver}
              onMouseOut={handleMouseOut}
            ></AllInclusiveIcon>
            <div style={styles.hide}>
              {isHovering && <h5 style={styles.h1}>Email: {email}</h5>}
              {isHovering && (
                <h5 style={styles.h1}>
                  Tên: {firstName} {lastName}
                </h5>
              )}
              {isHovering && <h5 style={styles.h1}>Địa chỉ: {address}</h5>}
              {isHovering && <h5 style={styles.h1}>SĐT: {phoneNumber}</h5>}
              {isHovering && <h5 style={styles.h1}>Ngày Sinh: {birthDate}</h5>}
            </div>
          </div>
        </div>
      </div>
      <h1 style={{ color: "black" }}>Bài viết</h1>

      {postList !== null ? (
        postList.map((postItem) => {
          return (
            <PostItem
              key={postItem.id}
              postId={postItem.id}
              userId={postItem.userId}
              username={full}
              firstName={firstName}
              lastName={lastName}
              content={postItem.content}
              image={postItem.image}
              ava={url}
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
