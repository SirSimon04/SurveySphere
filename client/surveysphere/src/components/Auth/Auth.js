import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  function switchMode() {
    setIsLogin((prev) => !prev);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatedPasswordChange = (event) => {
    setRepeatedPassword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implementiere hier die Login-Logik
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>{ isLogin ? "Login" : "Signup" }</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={handlePasswordChange}
        />
        { !isLogin && 
        <input
          type="password"
          placeholder="Passwort wiederholen"
          value={repeatedPassword}
          onChange={handleRepeatedPasswordChange}
        />}
        <button onClick={handleSubmit}>{ isLogin ? "Anmelden" : "Registrieren"}</button>
        <p className="signup-link">
          { isLogin ? "Noch kein Konto?" : "Schon ein Konto?"} <a href="#signup" onClick={switchMode}>{ isLogin ? "Registieren" : "Login"}</a>
        </p>
      </form>
    </div>
  );
};

export default Auth;
