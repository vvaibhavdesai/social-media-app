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

export function Header() {
  return (
    <header className="m-header">
      <h1 className="m-header-title">Antigram</h1>
      <input className="m-header-search"></input>
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
