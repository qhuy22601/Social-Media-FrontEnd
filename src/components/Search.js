import axios from "axios";
import { useEffect, useState } from "react";
import "./styles/App.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllAccounts } from "../feature/followingAccounts/followingAccountSlice";
import FollowerAccountItem from "./FollowerAccountItem";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
function Search() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [initialList, setInitialList] = useState([]);
  const [search, setSearch] = useState("");
  const [fullName, setFullName] = useState(
    localStorage.getItem("UserFirstName") +
      " " +
      localStorage.getItem("UserLastName")
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const storeFollowerAccounts = useSelector(
    (state) => state.followingAccountReducer.followerAccounts
  );
  const handleSearch = ({ target }) => {
    setSearch(target.value);
    if (!target.value) {
      setItems(initialList);
      return;
    }
    const lowerSeach = target.value.toLowerCase();
    const filter = items.filter(({ lastName }) =>
      lastName.toLowerCase().includes(lowerSeach)
    );
    setItems(filter);
  };
  const getAllAccounts = createAsyncThunk(
    "/api/auth/users",
    async (thunkAPI) => {
      const response = await axios({
        method: "post",
        url: "/api/auth/users",
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      }).then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setInitialList(result);
        },
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      );
    }
  );
  async function load() {
    fetch("http://localhost:3001/user")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
          setInitialList(result);
        },
        (error) => {
          setIsLoaded(false);
          setError(error);
        }
      );
  }

  useEffect(() => {
    load();
  }, []);

  const styles = {
    search: {
      marginTop: 300,
    },
    text: {
      color: "black",
    },
  };

  return (
    <>
      {error && <div>Error: {error.message}</div>}
      {!isLoaded && <div>Loading...</div>}
      {items.length > 0 && (
        <div className="wrapper">
          <div className="inp">
            <input
              placeholder="Search..."
              className="search-t"
              type="text"
              name="search"
              value={search}
              onChange={handleSearch}
              
            />
          </div>
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
      )}
    </>
  );
}

export default Search;
