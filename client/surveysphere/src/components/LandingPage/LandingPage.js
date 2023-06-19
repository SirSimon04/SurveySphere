import React  from "react";
import './LandingPage.css';
import results from './media/results.svg';
import survey from './media/survey.svg';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux';
import AnimatedInput from "../AnimatedInput/AnimatedInput.js";
import NavBar from "../NavBar/NavBar";
import CancelButton from "../CancelButton/CancelButton";
import { useDispatch } from 'react-redux';
import { logout } from "../Auth/authSlice";

function LandingPage() {

    const userName = useSelector(state => state.auth.userName);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            const inputValue = event.target.value;
            if(inputValue === ""){
                navigate(`/surveyor/647f1a85cbcc63bc04f45200`);
            }
            else{
                navigate(`/surveyor/${inputValue}`);
            }
        }
    };

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
        middle={<h1>Moin Meister</h1>}
        right={<CancelButton text={'Ausloggen'} handleCancel={handleLogout} />}
    />
    <div class="page">
    <h1 class="title">Hallo, {userName}</h1>

        <div class="inputContainer">
            {/* <input class="inputField" type="text" placeholder="Enter ID to join survey"></input>     */}
            <AnimatedInput onKeyDown={handleKeyDown} class="inputField" placeholder="Enter an ID to join survey"/>
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