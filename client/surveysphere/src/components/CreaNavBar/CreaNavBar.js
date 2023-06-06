import React from 'react'
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import './CreaNavBar.css';

const CreaNavBar = ({ title, onTitleChange }) => {

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
          <input
            id='titleInput'
            placeholder='Titel eingeben'
            value={title}
            onChange={onTitleChange}
          ></input>
        </div>
        <div className="right">
          <button className='cancelButton' onClick={handleCancel}>Erstellen abbrechen</button>
        </div>
      </div>
    );
}

export default CreaNavBar