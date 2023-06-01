import React, {useState, useEffect}  from "react";
import './LandingPage.css';
import results from './media/results.svg';
import survey from './media/survey.svg';

export const AnimatedInput = ({placeholder: passedPlaceholder = "", ...passedProps}) => {
    const [placeholder, setPlaceholder] = useState(passedPlaceholder.slice(0, 0));
    const [placeholderIndex, setPlaceholderIndex] = useState(0);


    useEffect(() => {
        const intr = setTimeout(() => {
            setPlaceholder(passedPlaceholder.slice(0, placeholderIndex));
            if (placeholderIndex + 1 > passedPlaceholder.length) {
                setPlaceholderIndex(0)
            } else {
                setPlaceholderIndex(placeholderIndex + 1)
            }
        }, 150);
        return () => {
            clearTimeout(intr)
        }
    },);


    return <input {...passedProps} placeholder={placeholder}/>
};

function LandingPage() {
    return (
    <>
    <div class="page">
    <h1 class="title">Hallo, Name</h1>

        <div class="inputContainer">
            {/* <input class="inputField" type="text" placeholder="Enter ID to join survey"></input>     */}
            <AnimatedInput class="inputField" placeholder="Enter an ID to join survey"/>
        </div>

        <div class="cardContainer">
            <div class="card">
                <h2 class="cardTitle">Create</h2>
                <img src={survey} alt="Survey"/>
                <p class="cardContent">Create a new survey</p>
            </div>
            <div class="card">
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