import React from 'react'
import impressumImage from "../../media/fingerprint.png";
import { useNavigate, useLocation } from 'react-router-dom';
import './ImpressumButton.css';
import { useDispatch } from 'react-redux';
import { setLoading } from '../../app/loadingSlice';

function ImpressumButton() {

  const dispatch = useDispatch();

    const navigate = useNavigate();
    const location = useLocation();
  return (
    location.pathname && location.pathname !== '/impressum' &&
    <button className="impressum" onClick={() => dispatch(setLoading({status: true}))}>
      <img src={impressumImage} alt="Impressum" className="impressumImage"/>
    </button>
  )
}

export default ImpressumButton