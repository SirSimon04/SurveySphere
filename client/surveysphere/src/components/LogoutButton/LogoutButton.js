import React from 'react'
import './LogoutButton.css';
import LogoutImage from '../../media/logout.png'

function LogoutButton({ handleLogout }) {
  return (
    <div>
        <button className='logoutButton' onClick={handleLogout}>
          <div>Logout</div>
          <img id='cancelImage' src={LogoutImage} alt='Logout' />
          </button>
    </div>
  )
}

export default LogoutButton