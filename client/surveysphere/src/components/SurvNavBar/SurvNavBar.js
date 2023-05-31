import React from 'react'
import { useNavigate } from "react-router-dom";
import './SurvNavBar.css';

const NavBar = () => {
  const navigate = useNavigate();
  const handleCancel = (event) => {
    navigate("/overview");
  };
  return (
      <div className="navBar">
        <div className="left">
          <span className='greeting'>Hallo, Martin!</span>
        </div>
        <div className="middle">
          <h1>Titel dieser Survey</h1>
        </div>
        <div className="right">
          <button className='cancelButton' onClick={handleCancel}>Umfrage verlassen</button>
        </div>
      </div>
    );
}

export default NavBar