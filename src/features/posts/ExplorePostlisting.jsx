import React, { useState, useEffect } from "react";
import "./PostsLists.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchexplorePosts } from "./exploreSlice";
import { likeToggled } from "./exploreSlice";
import { PostTemplate } from "./PostTemplate";
import axios from "axios";

const likePost = async (id, token, dispatch) => {
  try {
    const { data } = await axios.post(
      `https://socialMedia.vaibhavdesai888.repl.co/posts/like`,
      {
        data: {
          postId: id,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    // const newData = data.data;
    const newData = data;
    dispatch(likeToggled({ newData }));
  } catch (error) {
    console.log(error.message);
  }
};

const unLikePost = async (id, token, dispatch) => {
  try {
    const { data } = await axios.post(
      `https://socialMedia.vaibhavdesai888.repl.co/posts/unlike`,
      {
        data: {
          postId: id,
        },
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
    const newData = data;
    dispatch(likeToggled({ newData }));
  } catch (error) {
    console.log(error.message);
  }
};

const postComment = async (comment, token, postId) => {
  try {
    const { data } = await axios.post(
      `https://socialMedia.vaibhavdesai888.repl.co/posts/comment`,
      {
        text: comment,
        postId,
      },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

export function ExplorePostListing() {
  const postsData = useSelector((state) => state.explore.posts);
  const postsStatus = useSelector((state) => state.explore.status);
  const userToken = useSelector((state) => state.users.token);
  const userId = useSelector((state) => state.users.decodedUserData?._id);
  const [comment, setComment] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchexplorePosts(userToken));
    }
  }, [dispatch, postsStatus, userToken]);

  const Image = ({ classN, img }) => {
    console.log(img);
    return img.map((image) => (
      <img className={classN} alt="" src={image.src} />
    ));
  };

const props = {
  likePost, 
  unLikePost,
  userId,
  userToken,
  dispatch,
  setComment,
  postComment, 
  comment
}

  const posts = postsData.map((post) => (
    <PostTemplate key={post._id} post={post} {...props}/>
  ));

  let content;

  if (postsStatus === "loading") {
    content = <div>"...loading"</div>;
  } else if (postsStatus === "fulfilled") {
    content = posts;
  }
  // else if( postsStatus === "error"){
  //   content = <div>{error}</div>

  // }

  return <section className="post-feed-adjuster">{content}</section>;
}
