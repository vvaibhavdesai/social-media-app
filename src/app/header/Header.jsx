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
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

export function Header() {
  const [search, setSearch] = useState([]);
  const navigate = useNavigate();

  async function fetchSearch(event) {
    const { value } = event.target;
    console.log(value, "yeh hai search field");
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
          onChange={debounceCaller}
          placeholder="search users"
          className="m-header-search"
        />
        {search.length > 0 ? (
          <ul className="search-modal">
            {search.map((user) => (
              <li
                key={user._id}
                className="search-modal-list"
                onClick={() => navigate(`/userprofile/${user._id}`)}
              >
                <span>{user.name}</span> <img className="search-list-userAvatar" src={user.pictureUrl} alt=""/>
              </li>
            ))}
          </ul>
        ) : (
          ""
        )}
      </span>
      <div>
        <Link to="/">
          <button>
            <i className="m-nav-icons icons ">
              <BiHomeSmile />
            </i>
          </button>
        </Link>
        <Link to="/explore">
          <button>
            <i className="m-nav-icons icons ">
              <BiCompass />
            </i>
          </button>
        </Link>
        <Link to="createposts">
          <button>
            <i className="m-nav-icons icons">
              <BiPlus />
            </i>
          </button>
        </Link>
        <Link to="/profile">
          <button>
            <i className="m-nav-icons icons">
              <CgProfile />
            </i>
          </button>
        </Link>
      </div>
    </header>
  );
}
