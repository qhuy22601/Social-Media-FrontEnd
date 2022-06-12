import React from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import AllAccounts from "./AllAccounts";
import Chat from "./Chat";
import EditForm from "./EditForm";
import { EmailConfirm } from "./EmailConfirm";
import FollowerList from "./FollowerList";
import FollowingList from "./FollowingList";
import Game from "./game/Game";
import HomePage from "./HomePage";
import MyProfile from "./MyProfile";
import NewsFeed from "./NewsFeed";
import NewsFeedContent from "./NewsFeedContent";
import NotFoundPage from "./NotFoundPage";
import Profile from "./Profile";
import ResetPassword from "./ResetPassword";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import UnauthorizedPage from "./UnauthorizedPage";

function AppContainer() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot" element={<EmailConfirm />} />
        <Route path="/newsfeed" element={<NewsFeed />}>
          <Route path="reset" element={<ResetPassword />} />
          <Route path="" element={<NewsFeedContent />} />
          <Route path="following" element={<FollowingList />} />
          <Route path="follower" element={<FollowerList />} />
          <Route path="profile" element={<Profile />} />
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="editform" element={<EditForm />} />
          <Route path="allaccounts" element={<AllAccounts />} />
          <Route path="game" element={<Game />} />
          <Route path="chat" element={<Chat />} />
        </Route>
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}

export default AppContainer;
