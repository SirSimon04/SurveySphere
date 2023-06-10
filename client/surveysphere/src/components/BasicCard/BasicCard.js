import React from 'react'
import './BasicCard.css';

function BasicCard({ children }) {
  return (
    <div className='basicCard'>
        {children}
    </div>
  )
}

export default BasicCard