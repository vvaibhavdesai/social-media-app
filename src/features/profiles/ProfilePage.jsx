import "./ProfilePage.css";
import { IoSettingsOutline } from "react-icons/io5";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { updatedProfilePicture } from "../loginpage/LoginPageSlice";
import axios from "axios";

export function ProfilePage() {
  const userData = useSelector((state) => state.users.decodedUserData) || {};
  const dispatch = useDispatch();
  const token = useSelector((state) => state.users.token);
  const [postsData, setPostData] = useState([]);
  const [showInput, setShowInput] = useState(false);
  const [img, setImg] = useState("");
  const [ url, setUrl ] = useState("")
  console.log(userData,"me")

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
  
  useEffect(()=>{
    console.log(url,"yeh dekh url useEffect meh agya hai ")
    if(url){
      updateToDb(url);
      dispatch(updatedProfilePicture({ url }));
    }
  },[url])

  const CLOUDINARY_URL_API =
    "https://api.cloudinary.com/v1_1/dqn2jzk2n/image/upload ";

  const updateProfilePicture = (image) => {
    console.log(image,"yeh dekh function call hogya ")
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
      console.log(data.secure_url,"yeh meh hu cloudinary wala")
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
      console.log(url,"yeh h url")
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div className="profile-card">
        <div className="profile-card-header">
          <img
            className="profile-avatar"
            alt=""
            src={
              userData?.pictureUrl
                ? userData.pictureUrl
                : "http://placeimg.com/640/480/people"
            }
          />

          <div className="profile-card-name">
            <p>
              <strong>{userData.name}</strong>
            </p>
            <button
              onClick={() => setShowInput((prev) => !prev)}
              className="profile-card-buttons"
            >
              Edit Profile
            </button>
          </div>
          <button>
            <i className="profile-card-settings">
              <IoSettingsOutline />
            </i>
          </button>
        </div>
        <div>
          {showInput && <div><input onChange={(e) => setImg(e.target.files[0])} type="file" />
          <button onClick={() => updateProfilePicture(img)}>Update</button></div>}
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
