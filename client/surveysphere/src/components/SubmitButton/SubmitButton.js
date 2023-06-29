import React from 'react'
import './SubmitButton.css'

function SubmitButton({ onClick, text, ...passedProps }) {
  return (
    <button {...passedProps} className='submitButton' onClick={onClick}>{text}</button>
  )
}

export default SubmitButton