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
import { loginUserDetail, signupUserDetail } from "./features/loginpage/LoginPageSlice";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { PostCard } from './features/posts/PostCard';
import { ExplorePostListing } from "./features/posts/ExplorePostlisting"


function App() {
  const  user  = useSelector(state=>state.users) 
  const dispatch = useDispatch()
  const navigate = useNavigate()

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
        const data = res.data.user;
        console.log(data);
        dispatch(loginUserDetail({ data }));
        navigate("/");
      } catch (error) {
        console.log(error.message);
      }
    })();
  }, []);

  useEffect(()=>{
    if(user.token){
      console.log(user.token,"hum data user hai")
      navigate('/')
    }
  },[user.token ,navigate])

  return (
    <div className="App">
     {user.token && <Header />}
     {user.token &&<Navbar />}
      <section className="post-section">
        <Routes>
          <PrivateRoute path="/" element={<PostsListing />} />
          <PrivateRoute path="/createposts" element={<CreatePosts />} />
          <PrivateRoute path="/profile" element={<ProfilePage />} />
          <PrivateRoute path="/explore" element={<ExplorePostListing />} />
          <Route path="/notifications" element={<NotificationsList />} />
          <Route path="/userprofile/:userId" element={<UserProfile />} />
          <Route path="/register" element={<LoginPage />} />
          <Route path='/posts/:postid' element= {<PostCard/>} />
        </Routes>
      </section>
    </div>
  );
}

export default App;
