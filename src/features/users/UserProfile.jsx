import React from "react";
import "../profiles/ProfilePage.css";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { followedUser } from "../loginpage/LoginPageSlice"
import axios from "axios"
import { store } from './../../app/store';


const followUser = async(followId,token,dispatch)=>{
  try{
    const { data }= await axios.post(`https://socialMedia.vaibhavdesai888.repl.co/profile/follow`,{
      followId
    },
    {
      headers: {
        Authorization: token,
      }
    }) 
    const id = data.profileFollowers._id
    dispatch(followedUser({id}))

  }catch(error){
    console.log(error.message)
  }
}

const unFollowUser = async(followId, token, dispatch)=>{
  try{
    const { data }= await axios.post(`https://socialMedia.vaibhavdesai888.repl.co/profile/unfollow`,{
      followId
    },
    {
      headers: {
        Authorization: token,
      }
    }

    ) 
    
    const id = data.profileFollowers._id
    dispatch(followedUser({id}))
  }catch(error){
    console.log(error.message)
  }
}

export function UserProfile() {
  const [ user, setUser ] = useState({})
  const { userId } = useParams()
  const userToken = useSelector((state) => state.users.token);
  const loggedInUserData = useSelector((state)=>state.users.decodedUserData)
  const dispatch = useDispatch()


  useEffect(()=>{
    (async function(){
      try{
        const { data } = await axios.get(`https://socialMedia.vaibhavdesai888.repl.co/profile/user/${userId}` )
        console.log(data,"yeh hai data aya useffectmeh")
        setUser(data)
      }catch(error){
        console.log(error.message)
      }
    }())
  },[userId,loggedInUserData])

  
  return (<div>
      <div className="profile-card">
        <div className="profile-card-header">
          <img
            className="profile-avatar"
            alt=""
            src={user?.user?.pictureUrl}
          />

          <div className="profile-card-name">
            <p><strong>{user.user && user.user.name}</strong></p>
            <button onClick={ ()=>loggedInUserData.following.includes(userId) ? unFollowUser(user.user._id,userToken,dispatch) : followUser(user.user._id,userToken,dispatch)} className="profile-card-buttons">{loggedInUserData.following.includes(userId) ? `FOLLOWING`:`FOLLOW`}</button>
          </div>
          <div>&nbsp;</div>
        </div>

        <div className="profile-card-userdetails">
          <span className="profile-card-separation">
            <p>POST</p>
            <p>{user.user && user.posts.length}</p>
          </span>
          <span className="profile-card-separation">
            <p>FOLLOWERS</p>
            <p>{user.user && user.user.followers.length}</p>
          </span>
          <span className="profile-card-separation">
            <p>FOLLOWING</p>
            <p>{user.user && user.user.following.length}</p>
          </span>
        </div>

        <section className="profile-card-posts">
          {user.user && user.posts.map((post)=><div key={post._id}>
            <img
              className="profile-card-post"
              alt=""
              src={post.pictureUrl}
            />
          </div>)}
        </section>
      </div>
    </div>
  );
}
