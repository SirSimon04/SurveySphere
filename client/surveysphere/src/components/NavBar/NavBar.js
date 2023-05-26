import React from 'react'
import { useNavigate } from "react-router-dom";
import './NavBar.css';

function navBar() {
    return (
        <div className="navBar">
          <div className="left">
            <span>Hallo, Martin</span>
          </div>
          <div className="middle">
            <h1>Titel dieser Survey</h1>
          </div>
          <div className="right">
            <button>Umfrage verlassen</button>
          </div>
        </div>
      );
}

export default navBar