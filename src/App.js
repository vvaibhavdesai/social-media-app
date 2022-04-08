import React from "react";
import "./App.css";
import { Routes, Route, useNavigate } from "react-router";
import { Navbar } from "./app/navbar/Navbar";
import { Header } from "./app/header/Header";
import { PostsListing } from "./features/posts/PostsListing";
import { NotificationsList } from "./features/notifications/NotificationsList";
import { ProfilePage } from "./features/profiles/ProfilePage";
import { UserProfile } from "./features/users/UserProfile";
import { LoginPage } from "./features/loginpage/LoginPage";
import { CreatePosts } from "./features/createpost/CreatePosts";
import { PrivateRoute } from "./features/privateRoute/PrivateRoute";
import axios from "axios";
import {
  loginUserDetail,
  signupUserDetail,
} from "./features/loginpage/LoginPageSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostCard } from "./features/posts/PostCard";
import { ExplorePostListing } from "./features/posts/ExplorePostlisting";
import { notify } from "./utils/notify";

function App() {
  const user = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      try {
        const response = await axios.get(
          "https://socialMedia.vaibhavdesai888.repl.co/"
        );
        console.log(response, "response");
      } catch (e) {
        console.log(e)
        // notify("We are fixing our server please come back later");
      }
    })();
  }, []);

  useEffect(() => {
    (async function () {
      try {
        const { token } = JSON.parse(localStorage?.getItem("login"));
        const res = await axios.post(
          "https://socialMedia.vaibhavdesai888.repl.co/users/secret",
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const data = res.data;
        dispatch(loginUserDetail({ data }));
        navigate("/explore");
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  return (
    <div className="App">
      {user.token && <Header />}
      {user.token && <Navbar />}
      <section className="post-section">
        <Routes>
          <PrivateRoute path="/" element={<PostsListing />} />
          <PrivateRoute path="/createposts" element={<CreatePosts />} />
          <PrivateRoute path="/profile" element={<ProfilePage />} />
          <PrivateRoute path="/explore" element={<ExplorePostListing />} />
          <Route path="/notifications" element={<NotificationsList />} />
          <Route path="/userprofile/:userId" element={<UserProfile />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path="/posts/:postid" element={<PostCard />} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
