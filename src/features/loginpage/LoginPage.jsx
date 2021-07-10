import styled from "styled-components";
import { useState } from "react";
import "../../app/header/Header.css";
import { useDispatch } from "react-redux";
import { loginUserDetail, signupUserDetail } from "./LoginPageSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Toast, callToast } from '../../utils/Toast'
import axios from "axios";

const FormContainer = styled.div`
  min-height: 80vh;
  max-height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  height: 500px;
  width: 350px;
  text-align: center;
  align-items: center;
  background: rgba(239, 225, 225, 0.25);
  box-shadow: 10px 10px 18px 0px rgba(0, 0, 0, 0.75);
  -webkit-box-shadow: 10px 10px 18px 0px rgba(0, 0, 0, 0.75);
  -moz-box-shadow: 10px 10px 18px 0px rgba(0, 0, 0, 0.75);

  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  border-radius: 10px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  transform-style: perserve-3d;

  // @keyframes shake {
  //   0% {
  //     transform: rotate(0.5deg);
  //   }
  //   50% {
  //     transform: rotate(-0.5deg);
  //   }
  //   100% {
  //     transform: rotate(0.5deg);
  //   }
  // }
`;

const FormHeader = styled.h3`
  font-size: 30px;
  padding: 30px 0;
  color: #535353;
  letter-spacing: 3px;
`;

const FormInput = styled.input`
  outline: none;
  border: none;
  height: 40px;
  width: 82%;
  background: transparent;
  color: #535353;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.5) inset;
  font-size: 1rem;
  padding: 0 10px;
  margin: 15px 0;
  letter-spacing: 1px;
  border-radius: 1rem;

  &:focus {
    color: #1c1b18;
    border: 1px solid #fca311;
    -webkit-box-shadow: 0 0 0px 1000px #dddddd inset;
    transition: background-color 5000s ease-in-out 0s;
  }
`;

const SubmitBtn = styled.input`
  width: 90%;
  cursor: pointer;
  //   background: #fca311;
  background: #6267b8;
  background: -webkit-linear-gradient(to right, #6267b8 0%, #ee7f00 100%);
  background: -moz-linear-gradient(to right, #6267b8 0%, #ee7f00 100%);
  background: linear-gradient(to right, #6267b8 0%, #ee7f00 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-top: 30px;
  border-radius: 50px;
  padding: 0 10px;
  height: 40px;
  color: #ccc;
  font-size: 1.2rem;
  font-weight: 500;
  transition: 0.3s all ease;
  &:hover {
    letter-spacing: 4px;
    animation: shake 75ms infinite;
    animation-timing-function: linear;
  }
`;

export function LoginPage() {
  const [signup, setSignUp] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [img, setImg] = useState("");
  const [url, setUrl] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users);
  const CLOUDINARY_URL_API =
    "https://api.cloudinary.com/v1_1/dqn2jzk2n/image/upload ";

  const signupProfilePicture = (image) => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "anti-gram");
    data.append("cloud_name", "dqn2jzk2n");
    console.log(data);
    postImagetoCloudinary(data);
    sendPostsToDb();
  };

  const postImagetoCloudinary = async (imgData) => {
    try {
      const { data } = await axios.post(CLOUDINARY_URL_API, imgData);
      setUrl(data.secure_url);
    } catch (error) {
      console.log(error.message);
    }
  };

  const sendPostsToDb = async () => {
    try {
      const res = await axios.post(
        `https://socialMedia.vaibhavdesai888.repl.co/users/signup`,
        {
          data: {
            email,
            password,
            pictureUrl: url,
            name:userName,
          },
        }
      );
      console.log(res, "yeh hai response re bhava");
    } catch (error) {
      console.log(error.message);
    }
  };

  // useEffect(() => {
  //   (async function () {
  //     try {
  //       const { token } = JSON.parse(localStorage?.getItem("login"));
  //       const res = await axios.post(
  //         "https://socialMedia.vaibhavdesai888.repl.co/users/secret",
  //         {},
  //         {
  //           headers: {
  //             Authorization: token,
  //           },
  //         }
  //       );
  //       const data = res.data.user;
  //       dispatch(loginUserDetail({ data }));
  //       navigate("/");
  //     } catch (error) {
  //       console.log(error.message);
  //     }
  //   })();
  // }, []);

  useEffect(() => {
    if (user.token) {
      navigate("/");
    }
  }, [navigate, user.token]);

  const userDetailCollector = (data) => {
    if (!signup) {
      console.log(data," yeh data collector ")
      dispatch(loginUserDetail({ data }));
    } else if (signup) {
      dispatch(signupUserDetail({ data }));
    }
  };

  const LOGIN_ROUTE_API =
    "https://socialMedia.vaibhavdesai888.repl.co/users/login";

  const loginHandler = async () => {
    try {
      const { data } = await axios.post(LOGIN_ROUTE_API, {
        data: {
          email,
          password,
        },
      });
      localStorage.setItem(
        "login",
        JSON.stringify({ userLoggedIn: true, token: data.token })
      );
      console.log(data," yeh dekho data ")
      userDetailCollector(data);
    } catch (error) {
      callToast(error.response.data.message)
      console.log(error);

      console.log(error.response.data.message);
    }
  };

  const signUpHandler = async () => {
    try {
      const { data } = await axios.post(
        "https://socialMedia.vaibhavdesai888.repl.co/users/signup",
        {
          data: {
            userName,
            email,
            password,
          },
        }
      );
      userDetailCollector(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>  <div style={{width:"100%"}}>
      <header className="m-header">
        <h1 className="m-header-title">Antigram</h1>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </header>
      <FormContainer>
        <Form onSubmit={(e) => e.preventDefault()}>
          <FormHeader>
            {signup ? "SignUp" : "Login"}
            <>
              <button onClick={() => setSignUp((prev) => !prev)}>
                {signup ? `login` : `signup`}
              </button>
            </>
          </FormHeader>
          <div>
            <FormInput
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="email"
            ></FormInput>
          </div>
          <div>
            <FormInput
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
            ></FormInput>
            {signup && (
              <>
                <div>
                  <FormInput
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="username"
                  ></FormInput>
                </div>

                <input
                  onChange={(e) => setImg(e.target.files[0])}
                  type="file"
                />
              </>
            )}
          </div>
          <SubmitBtn
            onClick={() =>
              signup
                ? img
                  ? signupProfilePicture(img)
                  : signUpHandler()
                : loginHandler()
            }
            type="submit"
            placeholder="Submit"
          ></SubmitBtn>
        </Form>
      </FormContainer>
      <div><Toast/></div>
      </div>
    </>
  );
}