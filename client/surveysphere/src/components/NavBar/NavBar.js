import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import './NavBar.css';

const NavBar = ({ onTitleChange, middle, right, showGreeting = false }) => {

  const userName = useSelector(state => state.auth.userName);

  const navigate = useNavigate();

  const handleLogoClick = (event) => {
    navigate("/overview");
  };

  const handleLogout = (event) => {
    console.log("Logout");
  };

  return (
      <div className="navBar">
        <div className="left">
          {showGreeting && <span className='greeting'>Hallo, {userName}!</span>}
        </div>
        <div className="middle">
          {middle}
        </div>
        <div className="right">
          {right}
        </div>
      </div>
    );
}

export default NavBar