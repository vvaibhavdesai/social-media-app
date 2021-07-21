import { useNavigate, Link } from "react-router-dom";
import { TiHeartOutline } from "react-icons/ti";
import { FaRegCommentDots } from "react-icons/fa";
import { RiSendPlaneLine } from "react-icons/ri";

export const PostTemplate = ({ post, likePost, unLikePost, userId, userToken, dispatch, setComment, postComment, comment }) => {
    const navigate = useNavigate()
    
    const Avatar = ({ img }) => {
        return <img className="m-postcard-avatar-img" alt="" src={`${img}`} />;
      };

    return (
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
          <input
            onChange={(e) => setComment(e.target.value)}
            className="m-postcard-comment-input-area"
            type="text"
          />
          <button onClick={() => postComment(comment, userToken, post._id)}>
            <i className={`post-comment-icon `}>
              <RiSendPlaneLine />
            </i>
          </button>
        </div>
      </article>
    );
  };