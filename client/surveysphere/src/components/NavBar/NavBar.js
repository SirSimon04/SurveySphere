import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import './NavBar.css';

const NavBar = ({title}) => {

  const userName = useSelector(state => state.auth.userName);

  const navigate = useNavigate();
  const handleCancel = (event) => {
    navigate("/overview");
  };
  return (
      <div className="navBar">
        <div className="left">
          <span className='greeting'>Hallo, {userName}!</span>
        </div>
        <div className="middle">
          <h1>{title}</h1>
        </div>
        <div className="right">
          <button className='cancelButton' onClick={handleCancel}>Umfrage verlassen</button>
        </div>
      </div>
    );
}

export default NavBar