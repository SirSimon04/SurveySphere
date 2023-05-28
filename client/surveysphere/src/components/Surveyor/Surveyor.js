import React, { useEffect, useState } from 'react'
import './Surveyor.css'
import NavBar from './../NavBar/NavBar.js';
import SurveyQuestionCard from './../SurveyQuestionCard/SurveyQuestionCard.js';
import { getSurvey } from '../../api';

function Surveyor() {

  const [survey, setSurvey] = useState({ questions: [] });

  //this function is executed once, when the component is loaded
  useEffect(() => {
    loadSurvey();
  }, []);

  async function loadSurvey(){
    const survey = await getSurvey("647078de2ff4f9b8e4a7f710");
    setSurvey(survey.data);
  }

  return (
    <div className='surveyContainer'>
      <NavBar />
      <div className='surveyCardContainer'>
        {survey?.questions.map(question => <SurveyQuestionCard question={question}/>)}
        {/* <SurveyQuestionCard />
        <SurveyQuestionCard />
        <SurveyQuestionCard />
        <SurveyQuestionCard />
        <SurveyQuestionCard /> */}
        <div className='endSequenz'>
          <p>Vielen Dank für deine Teilnahme!</p>
          <button>Abschicken!</button>
        </div>
      </div>
    </div>  
  )
}

export default Surveyor