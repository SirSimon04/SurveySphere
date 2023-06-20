import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import './Auth.css';
import { useDispatch } from 'react-redux';
import { login } from "./authSlice";
import { signIn, signUp } from "../../api/index";

const Auth = () => {

  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatedPassword, setRepeatedPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate();

  function switchMode() {
    setIsLogin((prev) => !prev);
  }

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleUserNameChange = event => {
    setUserName(event.target.value);
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleRepeatedPasswordChange = (event) => {
    setRepeatedPassword(event.target.value);
  }

  const handleLogin = async (event) => {
    event.preventDefault();

    const formData = {
      email,
      password
    };

    try{

      const res = await signIn(formData);  

      const token = res.data.token;
      const id = res.data.result._id;
      const userName = res.data.result.userName;
      dispatch(login({
        mail: email,
        jwt: token,
        id: id,
        userName
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

  const handleSignUp = async event => {
    event.preventDefault();

    const formData = {
      email,
      password,
      confirmPassword: repeatedPassword,
      userName
    };

    try {

      const res = await signUp(formData);

      const token = res.data.token;
      const id = res.data.result._id;

      dispatch(login({
        mail: email,
        jwt: token,
        id: id,
        userName
      }));

      navigate("/overview");

    } catch (e) {
      console.log({e});
      let error;
      switch(e.response.status){
        case 409:
          error = "Der Nutzer existiert bereits";
          break;
        case 401:
          error = "Die Passwörter stimmen nicht überein";
          break;
        default:
          error = "Es ist ein unbestimmter Fehler aufgetreten";
      }
      alert(error);
    }
  }

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
        <>
          <input
            type="password"
            placeholder="Passwort wiederholen"
            value={repeatedPassword}
            onChange={handleRepeatedPasswordChange}
          />
          <input
            type="text"
            placeholder="Nutzername eingeben"
            value={userName}
            onChange={handleUserNameChange}
          />
        </>
        }
        <button onClick={isLogin ? handleLogin : handleSignUp}>{ isLogin ? "Anmelden" : "Registrieren"}</button>
        <p className="signup-link">
          { isLogin ? "Noch kein Konto?" : "Schon ein Konto?"} <a href="#signup" onClick={switchMode}>{ isLogin ? "Registieren" : "Login"}</a>
        </p>
      </form>
    </div>
  );
};

export default Auth;