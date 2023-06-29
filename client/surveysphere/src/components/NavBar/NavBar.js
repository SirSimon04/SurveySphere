import React from 'react';
import { useSelector } from 'react-redux';
import './NavBar.css';

const NavBar = ({ middle, right, showGreeting = false }) => {
  const userName = useSelector((state) => state.auth.userName);

  return (
    <div className="navBar">
      <div className="left">
        {showGreeting && <span className="greeting">Hallo, {userName}!</span>}
      </div>
      <div className="middle">{middle}</div>
      <div className="right">{right}</div>
    </div>
  );
};

export default NavBar;
