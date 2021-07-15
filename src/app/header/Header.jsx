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
import { useState, useEffect } from "react";
import { axios } from 'axios';

export function Header() {
  const [search, setSearch] = useState("");

  async function fetchSearch(query){
    try{
      const { data } = await axios.get(`https://socialMedia.vaibhavdesai888.repl.co/profile/search`,{
        searchId:query
      })
      console.log(data,"yeh aya search ka data")
    }catch(error){
      console.log(error.message)
    }
  }

  return (
    <header className="m-header">
      <h1 className="m-header-title">Antigram</h1>
      <span>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="m-header-search"
        />
        {search ? (
          <ul
            style={{
              border:"5px solid lightgray",
              borderRadius:"20px",
              position: "fixed",
              width: "20rem",
              zIndex:"7",
              textAlign: "left",
              listStyle: "none",
              padding: "0.2rem 0",
              height:"7rem",
              overflow:"scroll",
              overflowX:"hidden"
            }}
          >
            <li style={{ margin: "0.7rem 0 0.5rem 0.5rem",borderBottom:"1px solid lightgray" }}>"helolo"</li>
            <li style={{ margin: "0.5rem 0 0.5rem 0.5rem",borderBottom:"1px solid lightgray" }}>"helolo"</li>
            <li style={{ margin: "0.5rem 0 0.5rem 0.5rem",borderBottom:"1px solid lightgray" }}>"helolo"</li>
            <li style={{ margin: "0.5rem 0 0.5rem 0.5rem",borderBottom:"1px solid lightgray" }}>"helolo"</li>
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
