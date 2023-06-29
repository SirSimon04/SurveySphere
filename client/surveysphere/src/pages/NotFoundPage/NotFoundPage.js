import React from 'react'
import notFound from './media/404.svg'
import './NotFoundPage.css'

function NotFoundPage() {
  return (
    <div className="imageContainer">
        <img src={notFound} alt="Not found" />
    </div>
  )
}

export default NotFoundPage