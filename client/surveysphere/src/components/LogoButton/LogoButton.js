import React from 'react'
import { useNavigate } from 'react-router-dom';
import logoImage from '../../surveysphere_bg3.png'
import './LogoButton.css';

function LogoButton() {

    const navigate = useNavigate();

  return (
    <button className='logoButton' onClick={() => navigate('/overview')}>
        <img src={logoImage} alt="logo-surveysphere" className="imageButtonImage"/>
    </button>
  )
}

export default LogoButton