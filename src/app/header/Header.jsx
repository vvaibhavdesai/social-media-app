import React from "react";
import {
  BiMessageSquareDetail,
  BiHomeSmile,
  BiPlus,
  BiCompass,
} from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import "../navbar/Navbar.css";
import "./Header.css";
import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { CustomLink } from "../../utils/ActiveRoute";

export function Header() {
  const [search, setSearch] = useState([]);
  const [target, setTarget] = useState("");
  const [focus, setFocus] = useState(false);
  const navigate = useNavigate();

  async function fetchSearch(event) {
    const { value } = event.target;
    console.log(target, "yeh hai search field");
    try {
      if (value) {
        const { data } = await axios.post(
          `https://socialMedia.vaibhavdesai888.repl.co/profile/search`,
          {
            searchId: value,
          }
        );
        setSearch(data.user);
      } else {
        setSearch([]);
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  const debouncer = (func, delay) => {
    let timer;
    return function (...args) {
      const context = this;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };
  const debounceCaller = useCallback(debouncer(fetchSearch, 500), []);

  return (
    <header className="m-header">
      <h1 className="m-header-title">Antigram</h1>
      <span>
        <input
          onFocus={() => setFocus(true)}
          onChange={debounceCaller}
          placeholder="search users"
          className="m-header-search"
        />
        {focus && search.length > 0 ? (
          <ul className="search-modal">
            {search.map((user) => (
              <li
                key={user._id}
                className="search-modal-list"
                onClick={() => {
                  setFocus(false);
                  navigate(`/userprofile/${user._id}`);
                }}
              >
                <span>{user.name}</span>{" "}
                <img
                  className="search-list-userAvatar"
                  src={user.pictureUrl}
                  alt=""
                />
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </span>
      <div>
        <CustomLink to={"/"}>
          <BiHomeSmile />
        </CustomLink>
        <CustomLink to={"/explore"}>
          <BiCompass />
        </CustomLink>
        <CustomLink to={"/createposts"}>
          <BiPlus />
        </CustomLink>
        <CustomLink to={"/profile"}>
          <CgProfile />
        </CustomLink>
      </div>
    </header>
  );
}
