import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Auth.css';
import { useSelector, useDispatch } from 'react-redux';
import { login } from "./authSlice";
import { signIn } from "../../api/index";

const Auth = () => {

  const jwt = useSelector(state => state.auth.jwt);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = {
      email,
      password
    };

    try{

      const res = await signIn(formData);  

      const token = res.data.token;
      const id = res.data.result._id;
      dispatch(login({
        mail: email,
        jwt: token,
        id: id
      }));

      navigate("/overview");

    } catch(e) {
      console.log({e});
      let error;
      switch(e.response.status){
        case 401: 
          error = "Falsches Passwort";
          break;
        case 404:
          error = "Kein Nutzer mit dieser Mail";
          break;
        default:
          error = "Es ist ein unbestimmer Fehler aufgetreten";
      }
      alert(error);
    }

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
