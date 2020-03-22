import React from "react";
import "./Header.css";
import { Link } from "react-router-dom";

import logo from "../assets/logo.svg";
import camera from "../assets/camera.svg";

const Header = props => {
  return (
    <header id="main-header">
      <div className="header-content">
        <Link to="/">
          <img src={logo} alt="InstaRocket"></img>
        </Link>
        <Link to="/new">
          <img src={camera} alt="Enviar Publicação"></img>
        </Link>
      </div>
    </header>
  );
};

export default Header;
