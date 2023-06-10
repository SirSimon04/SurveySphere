import React from 'react'
import notFound from './media/404.svg'
import './NotFound.css'

function NotFound() {
  return (
    <div className="imageContainer">
        <img src={notFound} alt="Not found" />
    </div>
  )
}

export default NotFound