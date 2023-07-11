import React from 'react'
import { useSelector } from 'react-redux';
import './LoadingIndicator.css'

function LoadingIndicator() {
  const isLoading = useSelector((state) => state.loading.isLoading);
  
  return (
    isLoading && (
      <div className="loading-overlay">
        <div className="loading-spinner"></div>
      </div>
    )
  );
}

export default LoadingIndicator