import "../posts/PostsLists.css";
export const PreviewTemplate = ({ image, title, body }) => {
  return (
    <article className="m-postcard">
      <div className="m-postcard-container">
        <img alt="" className="m-postcard-img" src={image} />
      </div>
      <div className="m-postcard-caption">
        <span className="m-postcard-caption-title">{title}</span>
        <span className="m-postcard-caption-body">{body}</span>
        {/* <span className="m-postcard-likes">{post.likes.length} Likes</span> */}
      </div>
    </article>
  );
};
