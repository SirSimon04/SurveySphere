import React from 'react'
import './CancelButton.css';

function CancelButton({ handleCancel, text}) {
  return (
    <div>
        <button className='cancelButton' onClick={handleCancel}>{text}</button>
    </div>
  )
}

export default CancelButton