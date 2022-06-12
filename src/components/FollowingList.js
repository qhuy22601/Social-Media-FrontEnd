import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFollowingAccounts } from "../feature/followingAccounts/followingAccountSlice";
import FollowingAccountItem from "./FollowingAccountItem";
import styles from "./styles/Following.module.css";

function FollowingList() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeFollowingAccounts = useSelector(
    (state) => state.followingAccountReducer.followingAccounts
  );

  useEffect(() => {
    if (localStorage.getItem("Token") === null) {
      navigate("/unauthorized");
    }

    dispatch(getFollowingAccounts());
  }, []);

  return (
    <div>
      <h1 className={styles.title}>Người đang theo dõi</h1>
      {storeFollowingAccounts ? (
        storeFollowingAccounts.map((followingAccount) => {
          return (
            <FollowingAccountItem
              key={followingAccount.id}
              id={followingAccount.id}
              firstName={followingAccount.firstName}
              lastName={followingAccount.lastName}
              ava={followingAccount.avata}
            />
          );
        })
      ) : (
        <span></span>
      )}
    </div>
  );
}

export default FollowingList;
