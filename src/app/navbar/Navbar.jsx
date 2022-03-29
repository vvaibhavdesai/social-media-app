import React, { useState } from "react";
import { BiHomeSmile, BiSearchAlt2, BiPlus, BiCompass } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import "./Navbar.css";

export function Navbar() {
  return (
    <nav className="m-nav">
      <Link to="/">
        <button>
          <i className="m-nav-icons">
            <BiHomeSmile />
          </i>
        </button>
      </Link>
      <Link to="/explore">
        <button>
          <i className="m-nav-icons">
            <BiCompass />
          </i>
        </button>
      </Link>
      <Link to="/createposts">
        <button>
          <i className="m-nav-icons">
            <BiPlus />
          </i>
        </button>
      </Link>
      <Link to="/profile">
        <button>
          <i className="m-nav-icons">
            <CgProfile />
          </i>
        </button>
      </Link>
    </nav>
  );
}
