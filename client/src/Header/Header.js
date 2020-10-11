import React from "react";
import logo from '../UIELements/assets/logo.jpg';

import './Header.css';
const Header = () => {
  return <div className="header__container">
      <img src={logo} alt="logo"/>
  </div>;
};

export default Header;