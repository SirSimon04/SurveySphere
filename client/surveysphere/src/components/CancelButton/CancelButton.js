import React from 'react'
import './CancelButton.css';
import CancelImage from '../../media/logout.png'

function CancelButton({ handleCancel, text }) {
  return (
    <div>
        <button className='cancelButton' onClick={handleCancel}>
          <div>{text}</div>
          <img id='cancelImage' src={CancelImage} alt={text} />
          </button>
    </div>
  )
}

export default CancelButton