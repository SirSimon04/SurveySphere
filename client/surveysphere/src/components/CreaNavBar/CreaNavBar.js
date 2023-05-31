import React from 'react'
import { useNavigate } from "react-router-dom";
import './CreaNavBar.css';

const CreaNavBar = () => {
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
          <input id='titleInput' placeholder='Titel eingeben'></input>
        </div>
        <div className="right">
          <button className='cancelButton' onClick={handleCancel}>Erstellen abbrechen</button>
        </div>
      </div>
    );
}

export default CreaNavBar