import React, { useState } from 'react';
import './ToggleSwitch.css';

function ToggleSwitch() {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    setChecked(!checked);
  };

  return (
    <label className={`toggleSwitch ${checked ? 'checked' : ''}`}>
      <input type="checkbox" checked={checked} onChange={handleChange} />
      <span className="slider"></span>
    </label>
  );
}

export default ToggleSwitch;
