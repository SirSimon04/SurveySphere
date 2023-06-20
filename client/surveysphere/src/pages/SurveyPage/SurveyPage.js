import React, { useEffect, useState } from 'react'
import './SurveyPage.css'
import NavBar from '../../components/NavBar/NavBar';
import SurveyQuestionCard from './components/SurveyQuestionCard/SurveyQuestionCard.js';
import { getSurvey, voteAll } from '../../api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import CancelButton from '../../components/CancelButton/CancelButton';

function SurveyPage() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [survey, setSurvey] = useState({ questions: [] });

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const token = useSelector(state => state.auth.jwt);

  //this function is executed once, when the component is loaded
  useEffect(() => {
    loadSurvey();
    // eslint-disable-next-line
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

      await voteAll(token, postData);

      alert("Deine Antworten wurden gespeichert");

      navigate('/overview');
    } catch (e){
      console.log({e});
      let error;
      switch(e.response.status){
        case 409:
          error = "Du hast bereits an dieser Umfrage teilgenommen";
          break;
        default:
          error = "Es ist ein unbestimmer Fehler aufgetreten";
      }
      alert(error);
    }

  }

  return (
    <div className='surveyContainer'>
      <NavBar 
        showGreeting={true}
        middle={<h1>{survey.name}</h1>}
        right={<CancelButton
            text={'Umfrage verlassen'}
            handleCancel={() => navigate('/overview')}
          />}
      />
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
          <SubmitButton onClick={() => submitSurvey()} text={'Abschicken'}/>
        </div>
      </div>
    </div>  
  )
}

export default SurveyPage