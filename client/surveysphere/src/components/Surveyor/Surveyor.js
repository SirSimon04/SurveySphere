import React, { useEffect, useState } from 'react'
import './Surveyor.css'
import NavBar from './../NavBar/NavBar.js';
import SurveyQuestionCard from './../SurveyQuestionCard/SurveyQuestionCard.js';
import { getSurvey, voteAll } from '../../api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Surveyor() {

  const { id } = useParams();

  const [survey, setSurvey] = useState({ questions: [] });

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const token = useSelector(state => state.auth.jwt);

  const isMultiselect = false;

  //this function is executed once, when the component is loaded
  useEffect(() => {
    loadSurvey();
  }, []);

  //647e34d70ea1ab66af49e073
  //id of a survey with some more data
    async function loadSurvey() {
    const dbSurvey = await getSurvey(id);
    setSurvey(dbSurvey.data);
    setSelectedAnswers(new Array(dbSurvey.data.questions.length).fill([]));
  }

  const handleAnswerSelect = (questionIndex, answerId) => {
  setSelectedAnswers((prevSelectedAnswers) => {
    const newSelectedAnswers = [...prevSelectedAnswers];

    if(!survey.isMultiSelect){
      newSelectedAnswers[questionIndex] = [answerId]
    }
    else {
      if (newSelectedAnswers[questionIndex].includes(answerId)) {
        //if answer is selected, remove it
        newSelectedAnswers[questionIndex] = newSelectedAnswers[questionIndex].filter((id) => id !== answerId);
      } else {
        //if answer is not selected add it to the previous selected ones
        newSelectedAnswers[questionIndex] = [...newSelectedAnswers[questionIndex], answerId];
      }
    }

    return newSelectedAnswers;
  });
};

  async function submitSurvey() {

    console.log(selectedAnswers);

    const postData = {
      id,
      selectedAnswers
    }

    const res = await voteAll(token, postData);

    console.log(res);
  }

  return (
    <div className='surveyContainer'>
      <NavBar title={survey.name}/>
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