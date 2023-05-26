import React from 'react'
import { useNavigate } from "react-router-dom";
import './NavBar.css';

function navBar() {
    return (
        <div className="navBar">
          <div className="left">
            <span>Hello, user</span>
          </div>
          <div className="middle">
            <h1>Title</h1>
          </div>
          <div className="right">
            <button>Button</button>
          </div>
        </div>
      );
}

export default navBar