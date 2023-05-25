import React, { useState } from 'react';
import './Auth.css';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // Implementiere hier die Login-Logik
  };

  const handleSignup = (event) => {
    event.preventDefault();
    // Implementiere hier die Signup-Logik
  };

  return (
    <div className="login-container">
      <form className="login-form">
        <h2>Login</h2>
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
        <button onClick={handleLogin}>Anmelden</button>
        <p className="signup-link">
          Noch kein Konto? <a href="#signup" onClick={handleSignup}>Registrieren</a>
        </p>
      </form>
    </div>
  );
};

export default Auth;
