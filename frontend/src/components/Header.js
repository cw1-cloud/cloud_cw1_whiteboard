import React from "react";
import "../styles/Header.scss";

const Header = ({ userName }) => {
  return (
    <div className="headerbar">
      <div className="header-text"> BrainCanvas </div>
      <div className="header-user"> Current User: {userName} </div>
    </div>
  );
};

export default Header;
