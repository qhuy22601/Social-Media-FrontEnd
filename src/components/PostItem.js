import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

import React, { useState } from "react";
import { Button, Form, Row } from "react-bootstrap";
import {
  RiHeartFill,
  RiHeartLine,
  RiMessage2Fill,
  RiSendPlane2Fill,
  RiShareForwardFill,
} from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  addComment,
  addLike,
  addShare,
  del,
  getFollowingPosts,
} from "../feature/followingPost/followingPostSlice";

function PostItem(props) {
  const dispatch = useDispatch();

  const [likeStatus, setLikeStatus] = useState(false);
  const [commentStatus, setCommentStatus] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [sendButtonDisable, setSendButtonDisable] = useState(true);
  const [currentUserId, setCurrentUserId] = useState(
    localStorage.getItem("UserId")
  );
  const [showSuggestor, setShowSuggestor] = useState(false);
  const [left, setLeft] = useState(null);
  const [top, setTop] = useState(null);
  const [postId, setPostId] = useState(props.postId);

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  function handleLikeClick(e) {
    if (!props.likeList.includes(currentUserId)) {
      setLikeStatus(true);
      dispatch(addLike({ postId: postId, userId: currentUserId }));
    } else {
      setLikeStatus(false);
      dispatch(addLike({ postId: postId, userId: currentUserId }));
    }
  }
  const styles = {
    circleImageLayout: {
      width: 50,
      height: 50,
      borderRadius: 50 / 2,
    },
    circle: {
      width: 30,
      height: 30,
      borderRadius: 30 / 2,
    },

    color: {
      backgroundColor: "#282828",
    },
    name: {
      textTransform: "capitalize",
    },
  };

  function handleShareClick(e) {
    dispatch(addShare({ postId: postId, userId: currentUserId }));
    dispatch(getFollowingPosts());
  }

  function handleDelClick(e) {
    dispatch(del({ postId: postId }));
    dispatch(getFollowingPosts());
  }

  function handleCommentButtonClick(e) {
    setCommentStatus(!commentStatus);
  }

  function handleCommentContentChange(e) {
    e.preventDefault();

    setCommentContent(e.target.value);

    if (commentContent.length - 1 >= 0 && commentContent.length - 1 <= 100) {
      setSendButtonDisable(false);
    } else {
      setSendButtonDisable(true);
    }
  }

  function toggleSuggestor(metaInformation) {
    const hookType = metaInformation;
    const cursor = metaInformation;

    if (hookType === "start") {
      setShowSuggestor(true);
      setLeft(cursor.left);
      setTop(cursor.top + cursor.height); // we need to add the cursor height so that the dropdown doesn't overlap with the `@`.
    }
    if (hookType === "cancel") {
      setShowSuggestor(false);
      setLeft("");
      setTop(""); // we need to add the cursor height so that the dropdown doesn't overlap with the `@`.
    }
  }
  function sendComment(e) {
    dispatch(
      addComment({
        postId: postId,
        newComment: {
          userId: localStorage.getItem("UserId"),
          userFullname:
            localStorage.getItem("UserFirstName") +
            " " +
            localStorage.getItem("UserLastName"),
          content: commentContent,
        },
      })
    );
    setCommentContent("");
  }

  return (
    <div className="border shadow rounded-3 p-3 mt-3" style={styles.color}>
      <Row>
        <div className="d-flex align-items-center mb-3">
          <div className="mx-3">
            <img src={props.ava} style={styles.circleImageLayout}></img>
          </div>

          <div className="d-flex flex-column">
            <div className="fw-bold" style={styles.name}>
              {props.firstName + " " + props.lastName}
            </div>
            <div className="text-secondary">
              {timeAgo.format(new Date(props.postDate).getTime(), "twitter")}
            </div>
          </div>
          <div
            class="d-flex flex-row-reverse"
            color="primary"
            onClick={handleDelClick}
          >
            <IconButton>
              <ClearIcon />
            </IconButton>
          </div>
        </div>
        <div className="mx-3">
          <div>
            <p>{props.content}</p>
          </div>
          {props.image !== null ? (
            <div className="d-flex justify-content-center align-items-center mb-3">
              <img src={props.image} alt="" />
            </div>
          ) : (
            <span></span>
          )}
        </div>

        {/* Sub-functions cuar  post */}

        <div className="d-flex justify-content-center align-items-center">
          {/* Sub-function like  */}
          <div className="mx-3">
            <span
              className={`${styles.likeButton} mx-1 fs-4`}
              onClick={handleLikeClick}
            >
              {likeStatus ? (
                <RiHeartFill className="text-danger" />
              ) : (
                <RiHeartLine className="text-danger" />
              )}
            </span>
            <span>
              {props.likeList.length > 0 ? props.likeList.length : null}
            </span>
          </div>

          {/* Sub-function comment button */}
          <div className="mx-3">
            <span
              className={`${styles.commentButton} mx-1 fs-4`}
              onClick={handleCommentButtonClick}
            >
              <RiMessage2Fill className="text-primary" />
            </span>
            <span>
              {props.commentList.length > 0 ? props.commentList.length : null}
            </span>
          </div>

          {/* Sub-function share button */}
          <div className="mx-3">
            <span
              className={`${styles.shareButton} mx-1 fs-4`}
              onClick={handleShareClick}
            >
              <RiShareForwardFill className="text-success" />
            </span>
            <span>
              {props.shareList.length > 0 ? props.shareList.length : null}
            </span>
          </div>
        </div>

        {/* Comment List */}
        {commentStatus === true ? (
          <div className="mt-3">
            <div className="d-flex align-items-center">
              <Form className="w-100 mx-1">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Viết bình luận..."
                    value={commentContent}
                    onChange={handleCommentContentChange}
                  />
                  {/* <InputTrigger
                  trigger={{
                    keyCode: 50,
                    shiftKey: true,
                  }}
                  onStart={(metaData) => {toggleSuggestor(metaData);} }
                  onCancel={(metaData) => { toggleSuggestor(metaData); }}
                  >
                  <textarea
                  value={commentContent}
                  onChange={handleCommentContentChange}
                  placeholder="Viết bình luận..."
                    style={{
                      height: '50px',
                      width: '450px',
                      lineHeight: '1em',
                    }}
                  />
                </InputTrigger>
                <div
                  id="dropdown"
                  style={{
                    position: "absolute",
                    width: "200px",
                    borderRadius: "6px",
                    background: "blue",
                    boxShadow: "rgba(0, 0, 0, 0.4) 0px 1px 4px",  
                    display: showSuggestor ? "block" : "none",
                    top: top,
                    left: left,
                  }}
                >
                </div> */}
                  {/* <MentionsInput type = "text" value={commentContent} onChange={handleCommentContentChange} placeholder="Viết bình luận...">
                    <Mention
                    trigger="@"
                    data=""
                    />
                  </MentionsInput> */}
                </Form.Group>
              </Form>
              <span className="mx-1">{commentContent.length}/100</span>
              <div className="ms-auto">
                <Button
                  variant="success"
                  className="p-1"
                  disabled={sendButtonDisable}
                  onClick={sendComment}
                >
                  <RiSendPlane2Fill className="fs-4" />
                </Button>
              </div>
            </div>
            {props.commentList.map((commentItem) => (
              <div className="border rounded border-info my-3 px-2 pb-2">
                <div className="d-flex align-items-center my-2">
                  <div className="me-auto mx-1">
                    <img src={props.ava} style={styles.circle}></img>
                  </div>
                  <div className="w-100 mx-1 fw-bold">
                    <span>{commentItem.userFullname}</span>
                  </div>
                </div>
                <div>{commentItem.content}</div>
              </div>
            ))}
          </div>
        ) : (
          <span></span>
        )}
      </Row>
    </div>
  );
}

export default PostItem;
