import React from 'react';
import trashBinIcon from './media/trash-bin.png';
import './DeleteButton.css';

function DeleteButton({ onClick, className }) {
  return (
    <button className={`deleteButton ${className}`} onClick={onClick}>
      <img src={trashBinIcon} alt='Delete' className={`deleteIcon ${className}${className !== undefined ? 'Icon' : ''}`} />
    </button>
  );
}

export default DeleteButton;
