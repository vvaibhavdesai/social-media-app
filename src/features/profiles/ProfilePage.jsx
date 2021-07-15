import "./ProfilePage.css";
import { IoSettingsOutline } from "react-icons/io5";
import { FiCamera } from "react-icons/fi";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updatedProfilePicture } from "../loginpage/LoginPageSlice";
import { MdCancel } from "react-icons/md";
import { TiTick } from "react-icons/ti"
import axios from "axios";

export function ProfilePage() {
  const userData = useSelector((state) => state.users.decodedUserData) || {};
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const [postsData, setPostData] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");
  console.log(img, "me");

  useEffect(() => {
    (async function () {
      try {
        const { data } = await axios.get(
          `https://socialMedia.vaibhavdesai888.repl.co/posts/mypost`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPostData(data.mypost);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    console.log(url, "yeh dekh url useEffect meh agya hai ");
    if (url) {
      updateToDb(url);
      dispatch(updatedProfilePicture({ url }));
    }
  }, [url]);

  const CLOUDINARY_URL_API =
    "https://api.cloudinary.com/v1_1/dqn2jzk2n/image/upload ";

  const updateProfilePicture = (image) => {
    console.log(image, "yeh dekh function call hogya ");
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "anti-gram");
    data.append("cloud_name", "dqn2jzk2n");
    console.log(data);
    postImagetoCloudinary(data);
  };

  const postImagetoCloudinary = async (imgData) => {
    try {
      const { data } = await axios.post(CLOUDINARY_URL_API, imgData);
      console.log(data.secure_url, "yeh meh hu cloudinary wala");
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
      console.log(data, "yeh h data");
      console.log(url, "yeh h url");
      setImg("")
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
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
              onChange={(e)=>setImg(e.target.files[0])}
              />
              <FiCamera className="profile-upload-icon" />
            </label>
        <div className="profile-image-update">
            <div className={`profile-image-update-modal ${ img ? "show":"hide"}`}>
              <span className="profile-image-update-name">{img?.name}</span>
              <span>
              <button className="profile-image-update-actionbtn" onClick={() => updateProfilePicture(img)}><i><TiTick/></i></button>
              <button className="profile-image-update-actionbtn" onClick={()=>setImg("")}><i><MdCancel/></i></button></span>
            </div>
        </div>
          </div>
          <div className="profile-card-name">
            <p>
              <strong>{userData.name}</strong>
            </p>
            {/* <button className="profile-card-buttons">Edit Profile</button> */}
          </div>
          <button>
            <i className="profile-card-settings">
              <IoSettingsOutline />
            </i>
          </button>
        </div>

        <div className="profile-card-userdetails">
          <span className="profile-card-separation">
            <p>POST</p>
            <p>{postsData.length}</p>
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
          {postsData.map((post) => (
            <div key={post._id}>
              <img className="profile-card-post" alt="" src={post.pictureUrl} />
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}
