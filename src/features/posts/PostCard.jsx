import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./PostCard.css";
import axios from "axios";

export function PostCard() {
  const { postid } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(
          `https://socialMedia.vaibhavdesai888.repl.co/posts/postdetails/${postid}`
        );
        console.log(data.posts);
        setPost(data.posts);
      } catch (error) {
        console.log(error.response);
      }
    })();
  }, []);

  return (
    <section className="post-feed-adjuster">
      {post.postOwner ? (
        <article className="i-postcard">
          <div >
            <img
              className="i-postcard-img"
              alt={`${post.body}`}
              src={post.pictureUrl}
            />
          </div>
          <div className="i-postcard-content">
            <div className="i-postcard-userDetail">
              <img
                className="i-postcard-avatar"
                alt=""
                src={post.postOwner.pictureUrl}
              />
              <p>
                <strong>{post.postOwner.name}</strong>
              </p>
            </div>
            <div className="i-postcard-comments">
              {post.comments.map((comment) => (
                <span className="i-postcard-comment"key={comment._id}>
                  <p className="i-postcard-comment-username">{comment.postOwner.name}</p>
                  <p className="i-postcard-comment-text">{comment.text}</p>
                </span>
              ))}
            </div>
          </div>
        </article>
      ) : (
        <>...loading</>
      )}
    </section>
  );
}
