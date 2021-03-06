import "./ProfilePage.css";
import { IoSettingsOutline } from "react-icons/io5";
import { FiCamera } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updatedProfilePicture } from "../loginpage/LoginPageSlice";
import { MdCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { userLoggedOut } from "../loginpage/LoginPageSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { fetchProfilePosts } from "./profileSlice";

export function ProfilePage() {
  const userData = useSelector((state) => state.users.decodedUserData);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const profileStatus = useSelector((state) => state.profile.status);
  const [logoutButton, setLogoutButton] = useState(false);
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");
  const profilePosts = useSelector((state) => state.profile.posts);
  const navigate = useNavigate();
  useEffect(() => {
    (async function () {
      if (profileStatus === "idle") {
        dispatch(fetchProfilePosts(token));
      }
    })();
  }, []);

  const logoutUser = async () => {
    localStorage.removeItem("login");
    dispatch(userLoggedOut());
    navigate("/register");
  };

  useEffect(() => {
    if (url) {
      updateToDb(url);
      dispatch(updatedProfilePicture({ url }));
    }
  }, [url]);

  const CLOUDINARY_URL_API =
    "https://api.cloudinary.com/v1_1/dqn2jzk2n/image/upload ";

  const updateProfilePicture = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "anti-gram");
    data.append("cloud_name", "dqn2jzk2n");
    postImagetoCloudinary(data);
  };

  const postImagetoCloudinary = async (imgData) => {
    try {
      const { data } = await axios.post(CLOUDINARY_URL_API, imgData);
      setUrl(data.secure_url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const updateToDb = async (img) => {
    try {
      const { data } = await axios.post(
        `https://socialMedia.vaibhavdesai888.repl.co/users/update`,
        {
          img,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setImg("");
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      {userData ? (
        <div className="profile-card">
          <div className="profile-card-header">
            <div className="profile-avatar-container">
              <img
                className="profile-avatar"
                alt=""
                src={
                  userData?.pictureUrl
                    ? userData.pictureUrl
                    : "http://placeimg.com/640/480/people"
                }
              />
              <label
                className="profile-uploadpic-action"
                htmlFor="icon-button-file"
              >
                <input
                  accept="image/*"
                  id="icon-button-file"
                  type="file"
                  data-max-size="2048"
                  onChange={(e) => setImg(e.target.files[0])}
                />
                <FiCamera className="profile-upload-icon" />
              </label>
              <div className="profile-image-update">
                <div
                  className={`profile-image-update-modal ${
                    img ? "show" : "hide"
                  }`}
                >
                  <span className="profile-image-update-name">{img?.name}</span>
                  <span>
                    <button
                      className="profile-image-update-actionbtn"
                      onClick={() => updateProfilePicture(img)}
                    >
                      <i>
                        <TiTick />
                      </i>
                    </button>
                    <button
                      className="profile-image-update-actionbtn"
                      onClick={() => setImg("")}
                    >
                      <i>
                        <MdCancel />
                      </i>
                    </button>
                  </span>
                </div>
              </div>
            </div>
            <div className="profile-card-name">
              <p>
                <strong>{userData.name}</strong>
              </p>
            </div>
            <div className="profile-buttons">
              <button onClick={() => setLogoutButton((prev) => !prev)}>
                <i className="profile-card-settings">
                  <IoSettingsOutline />
                </i>
              </button>
              {logoutButton && (
                <button
                  onClick={logoutUser}
                  className=" logout-button profile-card-buttons"
                >
                  Logout
                </button>
              )}
            </div>
            {/* <div className="logout-button">
          </div> */}
          </div>

          <div className="profile-card-userdetails">
            <span className="profile-card-separation">
              <p>POST</p>
              <p>{profilePosts?.length}</p>
            </span>
            <span className="profile-card-separation">
              <p>FOLLOWERS</p>
              <p>{userData.followers.length}</p>
            </span>
            <span className="profile-card-separation">
              <p>FOLLOWING</p>
              <p>{userData.following.length}</p>
            </span>
          </div>

          <section className="profile-card-posts">
            {profilePosts?.map((post) => (
              <div key={post._id}>
                <img
                  className="profile-card-post"
                  alt=""
                  src={post.pictureUrl}
                />
              </div>
            ))}
          </section>
        </div>
      ) : (
        <>Loading....</>
      )}
    </div>
  );
}
