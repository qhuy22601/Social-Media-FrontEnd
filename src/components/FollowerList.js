import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFollowerAccounts } from "../feature/followingAccounts/followingAccountSlice";
import FollowerAccountItem from "./FollowerAccountItem";
import styles from "./styles/Following.module.css";

function FollowerList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeFollowerAccounts = useSelector(
    (state) => state.followingAccountReducer.followerAccounts
  );

  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/unauthorized");
    }

    dispatch(getFollowerAccounts());
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Người theo dõi</h1>
      {storeFollowerAccounts ? (
        storeFollowerAccounts.map((followerAccount) => {
          return (
            <FollowerAccountItem
              key={followerAccount.id}
              id={followerAccount.id}
              firstName={followerAccount.firstName}
              lastName={followerAccount.lastName}
              ava={followerAccount.avata}
            />
          );
        })
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default FollowerList;
