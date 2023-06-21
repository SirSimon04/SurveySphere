import React, { useState }  from "react";
import './LandingPage.css';
import results from './media/results.svg';
import survey from './media/survey.svg';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import AnimatedInput from "../../components/AnimatedInput/AnimatedInput.js";
import NavBar from "../../components/NavBar/NavBar";
import CancelButton from "../../components/CancelButton/CancelButton";
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
        if(surveyIDInput === ""){
            navigate(`/surveyor/647f1a85cbcc63bc04f45200`);
        }
        else{
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
        middle={<h1 class="title">Hallo, {userName}</h1>}
        right={<CancelButton text={'Ausloggen'} handleCancel={handleLogout} />}
    />
    <div class="page">

        <div class="inputContainer">
            {/* <input class="inputField" type="text" placeholder="Enter ID to join survey"></input>     */}
            <AnimatedInput 
            onKeyDown={handleKeyDown} 
            class="inputField" 
            placeholder="Enter an ID to join survey"
            onChange={handleInputChange}
            />
            <SubmitButton 
            text="Los gehts"
            onClick={handleSurveyClick}
            style={{fontSize: '16px'}}
            />
        </div>

        <div class="cardContainer">
            <div class="card" onClick={onNewClick}>
                <h2 class="cardTitle">Create</h2>
                <img src={survey} alt="Survey"/>
                <p class="cardContent">Create a new survey</p>
            </div>
            <div class="card" onClick={onResultClick}>
                <h2 class="cardTitle">Results</h2>
                <img src={results} alt="Results"/>
                <p class="cardContent">Shows results of your survey</p>
            </div>
        </div>

    </div>
    </>
    );
}

export default LandingPage;