import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFollowerAccounts } from "../feature/followingAccounts/followingAccountSlice";
import FollowerAccountItem from "./FollowerAccountItem";
import classNames from "classnames/bind";
import styles from "../components/SearchInput/SearchInput.module.scss";

const cx = classNames.bind(styles);

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
      <h1 className={cx('title')}>Người theo dõi</h1>
      {storeFollowerAccounts ? (
        storeFollowerAccounts.map((followerAccount) => {
          return (
            <FollowerAccountItem
              key={followerAccount.id}
              id={followerAccount.id}
              firstName={followerAccount.firstName}
              lastName={followerAccount.lastName}
              username = {followerAccount.username}
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