import React, { useEffect, useState } from 'react'
import './Surveyor.css'
import NavBar from './../NavBar/NavBar.js';
import SurveyQuestionCard from './../SurveyQuestionCard/SurveyQuestionCard.js';
import { getSurvey } from '../../api';
import { useParams } from 'react-router-dom';

function Surveyor() {

  const { id } = useParams();

  const [survey, setSurvey] = useState({ questions: [] });

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  //this function is executed once, when the component is loaded
  useEffect(() => {
    loadSurvey();
  }, []);

  //647334aa5e584ce8067d2bcc
  //id of a survey with some more data
    async function loadSurvey() {
    const dbSurvey = await getSurvey(id);
    setSurvey(dbSurvey.data);
    setSelectedAnswers(new Array(dbSurvey.data.questions.length).fill([]));
  }

  const handleAnswerSelect = (questionIndex, answerId) => {
  setSelectedAnswers((prevSelectedAnswers) => {
    const newSelectedAnswers = [...prevSelectedAnswers];

    if (newSelectedAnswers[questionIndex].includes(answerId)) {
      newSelectedAnswers[questionIndex] = newSelectedAnswers[questionIndex].filter((id) => id !== answerId);
    } else {
      newSelectedAnswers[questionIndex] = [...newSelectedAnswers[questionIndex], answerId];
    }

    return newSelectedAnswers;
  });
};

  function submitSurvey() {
    console.log(selectedAnswers);
  }

  return (
    <div className='surveyContainer'>
      <NavBar />
      <div className='surveyCardContainer'>
        {survey?.questions.map((question, index) => (
          <SurveyQuestionCard
            question={question}
            handleAnswerSelect={handleAnswerSelect}
            selectedAnswers={selectedAnswers[index] || []}
            index={index}
            key={question._id}
          />
        ))}
        {/* <SurveyQuestionCard />
        <SurveyQuestionCard />
        <SurveyQuestionCard />
        <SurveyQuestionCard />
        <SurveyQuestionCard /> */}
        <div className='endSequenz'>
          <p>Vielen Dank für deine Teilnahme!</p>
          <button onClick={() => submitSurvey()}>Abschicken!</button>
        </div>
      </div>
    </div>  
  )
}

export default Surveyor