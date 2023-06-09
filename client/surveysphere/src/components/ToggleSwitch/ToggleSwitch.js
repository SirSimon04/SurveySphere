import React from 'react';
import './ToggleSwitch.css';

function ToggleSwitch({ onChange, singleSelect}) {

  return (
    <label className={`toggleSwitch ${singleSelect ? 'checked' : ''}`}>
      <input type="checkbox" checked={singleSelect} onChange={onChange} />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleSwitch;
