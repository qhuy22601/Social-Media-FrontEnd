import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getFollowingAccounts } from "../feature/followingAccounts/followingAccountSlice";
import FollowingAccountItem from "./FollowingAccountItem";
import classNames from "classnames/bind";
import styles from "../components/SearchInput/SearchInput.module.scss";

const cx = classNames.bind(styles);


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
    const styles = {

    }

    dispatch(getFollowingAccounts());
  }, []);

  return (
    <div>
      <h1 className={cx('title')}>Người đang theo dõi</h1>
      {storeFollowingAccounts ? (
        storeFollowingAccounts.map((followingAccount) => {
          return (
            <FollowingAccountItem
              key={followingAccount.id}
              id={followingAccount.id}
              firstName={followingAccount.firstName}
              lastName={followingAccount.lastName}
              username = {followingAccount.username}
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