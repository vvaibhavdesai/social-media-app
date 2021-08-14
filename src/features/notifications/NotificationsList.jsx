import React from "react";
import "./NotificationsList.css";
export function NotificationsList() {
  const Avatar = () => {
    return (
      <img
        className="m-postcard-avatar-img"
        alt=""
        src="https://images.unsplash.com/photo-1622495966087-4b72dd849db7"
      />
    );
  };

  const trial = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    marginTop:"5rem",
  };

  return (
    <section style={trial}>
      <div>welcome to notifications</div>
      <div className="m-notifications">
        <Avatar />
        <div className="m-notifications-txt">
          <p>
            <strong>amilly jenna</strong> liked your photo
          </p>
        </div>
      </div>
    </section>
  );
}
