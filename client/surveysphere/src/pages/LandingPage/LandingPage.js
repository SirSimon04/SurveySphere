import React, { useState }  from "react";
import './LandingPage.css';
import results from './media/results.svg';
import survey from './media/survey.svg';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import AnimatedInput from "../../components/AnimatedInput/AnimatedInput.js";
import NavBar from "../../components/NavBar/NavBar";
import LogoutButton from "../../components/LogoutButton/LogoutButton";
import { useDispatch } from 'react-redux';
import { logout } from "../AuthPage/authSlice";
import SubmitButton from "../../components/SubmitButton/SubmitButton";

function LandingPage() {

    const userName = useSelector(state => state.auth.userName);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [surveyIDInput, setSurveyIDInput] = useState("");

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSurveyClick();
        }
    };

    const handleSurveyClick = () => {
        if(surveyIDInput === '42'){
            navigate(`/surveyor/64ae8f4dea3078a6f8fa97a0`);
        }
        else if(surveyIDInput !== ""){
            navigate(`/surveyor/${surveyIDInput}`);
        }
    }

    const handleInputChange = (event) => {
        setSurveyIDInput(event.target.value);
    }

    const onNewClick = () => {
        navigate('/creator');
    }

    const onResultClick = () => {
        navigate('/reviewer');
    }

    const handleLogout = () => {
        dispatch(logout());
        navigate('/auth');
    }

    return (
    <>
    <NavBar 
        middle={<h1 className="title">Hallo, {userName}</h1>}
        right={<LogoutButton handleLogout={handleLogout} />}
    />
    <div className="page">
        <div className="inputContainer">
            <AnimatedInput 
            onKeyDown={handleKeyDown} 
            placeholder="ID eingeben, um an Umfrage teilzunehmen..."
            className="inputField" 
            onChange={handleInputChange}
            />
            <SubmitButton 
            text="Los gehts"
            onClick={handleSurveyClick}
            style={{fontSize: '16px'}}
            />
        </div>
        <div className="cardContainer">
            <div className="card" onClick={onNewClick}>
                <h2 className="cardTitle">Erstellen</h2>
                <img src={survey} alt="Survey"/>
                <p className="cardContent">Erstelle eine survey</p>
            </div>
            <div className="card" onClick={onResultClick}>
                <h2 className="cardTitle">Ergebnisse</h2>
                <img src={results} alt="Results"/>
                <p className="cardContent">Ergebnisse deiner surveys</p>
            </div>
        </div>

    </div>
    </>
    );
}

export default LandingPage;