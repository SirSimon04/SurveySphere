import React from 'react'
import impressumImage from "../../media/fingerprint.png";
import { useNavigate, useLocation } from 'react-router-dom';
import './ImpressumButton.css';

function ImpressumButton() {
    const navigate = useNavigate();
    let useLocation = useLocation();
  return (
    <button className="impressum" onClick={() => navigate('/impressum')}>
      <img src={impressumImage} alt="Impressum" className="impressumImage"/>
    </button>
  )
}

export default ImpressumButton