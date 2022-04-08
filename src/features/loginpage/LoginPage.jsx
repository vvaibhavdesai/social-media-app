import styled from "styled-components";
import { useState } from "react";
import "../../app/header/Header.css";
import { useDispatch } from "react-redux";
import { signupUserDetail, signinUserDetail } from "./LoginPageSlice";
import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Toast, callToast } from "../../utils/Toast";
import { ToastContainer } from "react-toastify";

import axios from "axios";
import { notify } from "../../utils/notify";

const FormContainer = styled.div`
  min-height: 80vh;
  max-height: 100%;
  margin-top: 5rem;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Form = styled.form`
  height: 550px;
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
const black = {
  background: "black",
};
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
  text-align: center;
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users);

  useEffect(() => {
    if (user.token) {
      navigate("/explore");
    }
  }, [navigate, user.token]);

  const userDetailCollector = (data) => {
    if (!signup) {
      dispatch(signinUserDetail({ data }));
    } else if (signup) {
      dispatch(signupUserDetail({ data }));
    }
  };

  const LOGIN_ROUTE_API = process.env.REACT_APP_LOGIN_URL;
  const SIGNUP_ROUTE_API = process.env.REACT_APP_SIGNUP_URL;

  const loginHandler = async (email, password) => {
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
      console.log(data, " yeh dekho data ");
      userDetailCollector(data);
    } catch (error) {
      notify(error.response.data.message);

      console.log(error.response.data.message);
    }
  };

  const signUpHandler = async (userName, email, password) => {
    try {
      const { data } = await axios.post(SIGNUP_ROUTE_API, {
        data: {
          name: userName,
          email,
          password,
        },
      });
      localStorage.setItem(
        "login",
        JSON.stringify({ userLoggedIn: true, token: data.token })
      );
      userDetailCollector(data);
    } catch (error) {
      notify(error.response.data.message);
      console.log(error.message);
    }
  };

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <header className="m-header">
        <h1 className="m-header-title">Antigram</h1>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
      </header>
      <div>
        <ToastContainer
          position="bottom-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
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
              required
            ></FormInput>
          </div>
          <div>
            <FormInput
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="password"
              required
            ></FormInput>
            {signup && (
              <>
                <div>
                  <FormInput
                    onChange={(e) => setUserName(e.target.value)}
                    placeholder="username"
                    required={signup ? true : false}
                  ></FormInput>
                </div>
              </>
            )}
          </div>
          <SubmitBtn
            onClick={() =>
              signup
                ? signUpHandler(userName, email, password)
                : loginHandler(email, password)
            }
            type="submit"
            placeholder="Submit"
          ></SubmitBtn>
          <SubmitBtn
            onClick={() => loginHandler("vaibhavdesai818@gmail.com", "vaibhav")}
            type="submit"
            placeholder="Guest Login"
          ></SubmitBtn>
        </Form>
      </FormContainer>
    </div>
  );
}
