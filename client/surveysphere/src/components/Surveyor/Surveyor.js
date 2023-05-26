import React from 'react'
import './Surveyor.css'
import NavBar from './../NavBar/NavBar.js';
import SurveyQuestionCard from './../SurveyQuestionCard/SurveyQuestionCard.js';

function Surveyor() {
  return (
    <div className='surveyContainer'>
      <NavBar />
      <div className='surveyCardContainer'>
        <SurveyQuestionCard />
        <SurveyQuestionCard />
        <SurveyQuestionCard />
        <SurveyQuestionCard />
        <SurveyQuestionCard />
        <div className='endSequenz'>
          <p>Vielen Dank für deine Teilnahme!</p>
          <button>Abschicken!</button>
        </div>
      </div>
    </div>  
  )
}

export default Surveyor