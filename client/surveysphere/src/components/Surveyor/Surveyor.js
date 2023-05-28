import React, { useEffect, useState } from 'react'
import './Surveyor.css'
import NavBar from './../NavBar/NavBar.js';
import SurveyQuestionCard from './../SurveyQuestionCard/SurveyQuestionCard.js';
import { getSurvey } from '../../api';
import { useParams } from 'react-router-dom';

function Surveyor() {

  const { id } = useParams();

  const [survey, setSurvey] = useState({ questions: [] });

  //this function is executed once, when the component is loaded
  useEffect(() => {
    loadSurvey();
  });

  //647078de2ff4f9b8e4a7f710
  async function loadSurvey(){
    const survey = await getSurvey(id);
    setSurvey(survey.data);
  }

  return (
    <div className='surveyContainer'>
      <NavBar />
      <div className='surveyCardContainer'>
        {survey?.questions.map(question => <SurveyQuestionCard question={question} key={question._id}/>)}
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