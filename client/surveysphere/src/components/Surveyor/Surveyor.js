import React, { useEffect, useState } from 'react'
import './Surveyor.css'
import NavBar from '../SurvNavBar/SurvNavBar.js';
import SurveyQuestionCard from './../SurveyQuestionCard/SurveyQuestionCard.js';
import { getSurvey, voteAll } from '../../api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";

function Surveyor() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [survey, setSurvey] = useState({ questions: [] });

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const token = useSelector(state => state.auth.jwt);

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

    const question = survey.questions[questionIndex];

    if(question.isSingleSelect){
      newSelectedAnswers[questionIndex] = [answerId];
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


  const allQuestionsAnswered = selectedAnswers.every(
    (answers) => answers.length > 0
  );

  async function submitSurvey() {

     if (!allQuestionsAnswered) {
      alert('Bitte beantworte alle Fragen, bevor du das Formular abschickst.');
      return; 
    }

    console.log(selectedAnswers);

    const postData = {
      id,
      selectedAnswers
    }

    try {

      const res = await voteAll(token, postData);

      alert("Deine Antworten wurden gespeichert");

      navigate('/overview');
    } catch (e){
      console.log({e});
      let error;
      switch(e.response.status){
        default:
          error = "Es ist ein unbestimmer Fehler aufgetreten";
      }
      alert(error);
    }

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