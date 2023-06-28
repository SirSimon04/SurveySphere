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
import Modal from 'react-modal';
import modalStyles from '../../constants/modalStyles';

function SurveyPage() {

  const navigate = useNavigate();

  const { id } = useParams();

  const [survey, setSurvey] = useState({ questions: [] });

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const token = useSelector(state => state.auth.jwt);

  const [modalHeading, setModalHeading] = useState('');
  const [modalText, setModalText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (heading, text) => {
    setModalText(text);
    setIsOpen(true);
  }

  const closeModal = () => {
    setIsOpen(false);
  };

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
      openModal('Es ist ein Fehler aufgetreten', 'Bitte beantworte alle Fragen, bevor du das Formular abschickst.');
      return; 
    }

    console.log(selectedAnswers);

    const postData = {
      id,
      selectedAnswers
    }

    try {

      await voteAll(token, postData);

      openModal('Antworten hochgeladen', 'Deine Antworten wurden erfolgreich gespeichert.')

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
      openModal('Es ist ein Fehler aufgetreten', error);
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
      <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          style={modalStyles}
          contentLabel="Dialog"
        >
          <h2>Es ist ein Fehler aufgetreten</h2>
          <p>{modalText}</p>
          <button onClick={closeModal}>Schließen</button>
        </Modal>
      </div>
    </div>  
  )
}

export default SurveyPage