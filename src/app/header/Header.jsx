import React from "react";
import {
  BiMessageSquareDetail,
  BiHomeSmile,
  BiPlus,
  BiBell,
} from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import "../navbar/Navbar.css";
import "./Header.css";
import { Link } from "react-router-dom";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

export function Header() {
  const [search, setSearch] = useState([]);

  async function fetchSearch(event) {
    const { value } = event.target;
    console.log(value, "yeh hai search field");
    try {
      if(value){
      const { data } = await axios.post(
        `https://socialMedia.vaibhavdesai888.repl.co/profile/search`,
        {
          searchId: value,
        }
      );
      console.log(data, "yeh aya search ka data");
      setSearch(data.user)}
      else{
        setSearch([])
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
  const debounceCaller = useCallback(debouncer(fetchSearch, 500),[]);

  return (
    <header className="m-header">
      <h1 className="m-header-title">Antigram</h1>
      <span>
        <input onChange={debounceCaller} className="m-header-search" />
        {search.length > 0 ? (
          <ul
            style={{
              border: "5px solid lightgray",
              borderRadius: "20px",
              position: "fixed",
              width: "20rem",
              zIndex: "7",
              textAlign: "left",
              listStyle: "none",
              padding: "0.2rem 0",
              height: "7rem",
              overflow: "scroll",
              overflowX: "hidden",
            }}
          >
            {search.map(user=>
            <li
            key={user._id}
              style={{
                margin: "0.7rem 0 0.5rem 0.5rem",
                borderBottom: "1px solid lightgray",
              }}
            >
              {user.name}
            </li>)}
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
