import React, { useState, useEffect } from "react";
import "./PostsLists.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchexplorePosts } from "./exploreSlice";
import { likeToggled } from "./exploreSlice";
import { useNavigate, Link } from "react-router-dom";
import { TiHeartOutline } from "react-icons/ti";
import { FaRegCommentDots } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";
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
  const navigate = useNavigate()

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

const Avatar = ({ img }) => {
  return <img className="m-postcard-avatar-img" alt="" src={`${img}`} />;
};

  const posts = postsData.map((post) => (
    <article key={post._id} className="m-postcard">
        <div className="m-postcard-header">
          <Avatar
            onClick={() => navigate(`/userprofile/${post.postOwner._id}`)}
            img={post.postOwner.pictureUrl}
          />
          <Link to={`/userprofile/${post.postOwner._id}`}>
            {" "}
            <h5>{post.postOwner.name}</h5>
          </Link>
        </div>
        {/* <Image classN={`m-postcard-img`}img={post.image} /> */}

        <div className="m-postcard-container">
          <img
            alt={post.pictureUrl ? "" : post.name}
            className="m-postcard-img"
            src={post.pictureUrl}
          />
        </div>

        <div className="m-postcard-caption">
          <span className="m-postcard-caption-title">{post.title}</span>
          <span className="m-postcard-caption-body">{post.body}</span>
          <span className="m-postcard-likes">{post.likes.length} Likes</span>
        </div>

        <div className="m-postcard-footer">
          <button>
            {post.likes.find((ids) => ids === userId) ? (
              <i className="m-postcard-footer-icons">
                <TiHeartOutline
                  onClick={() => unLikePost(post._id, userToken, dispatch)}
                  style={{ fill: "#ff5757" }}
                />
              </i>
            ) : (
              <i className="m-postcard-footer-icons">
                <TiHeartOutline
                  onClick={() => likePost(post._id, userToken, dispatch)}
                />
              </i>
            )}
          </button>

          <button onClick={() => navigate(`/posts/${post._id}`)}>
            <i className="m-postcard-footer-icons">
              <FaRegCommentDots />
            </i>
          </button>
        </div>
        <div className="m-postcard-comment-input">
        </div>
      </article>
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
