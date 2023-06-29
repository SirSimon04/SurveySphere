import React, { useEffect, useState } from 'react'
import './SurveyPage.css'
import NavBar from '../../components/NavBar/NavBar';
import SurveyQuestionCard from './components/SurveyQuestionCard/SurveyQuestionCard.js';
import { getSurvey, voteAll } from '../../api';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setLoading } from '../../app/loadingSlice';
import { useDispatch } from 'react-redux';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import CancelButton from '../../components/CancelButton/CancelButton';
import Modal from 'react-modal';
import modalStyles from '../../constants/modalStyles';

function SurveyPage() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { id } = useParams();

  const [survey, setSurvey] = useState({ questions: [] });

  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const token = useSelector(state => state.auth.jwt);

  const [modalHeading, setModalHeading] = useState('');
  const [modalText, setModalText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const openModal = (heading, text) => {
    setModalText(text);
    setModalHeading(heading);
    setIsOpen(true);
  }

  const closeModal = (navigationTarget) => {
    setIsOpen(false);
    if(navigationTarget){
      navigate(navigationTarget);
    }
  };

  useEffect(() => {
    loadSurvey();
    // eslint-disable-next-line
  }, []);

    async function loadSurvey() {
      try{

        dispatch(setLoading({
          status: true
        }));

        const dbSurvey = await getSurvey(id);

        dispatch(setLoading({
          status: false
        }));

        setSurvey(dbSurvey.data);
        setSelectedAnswers(new Array(dbSurvey.data.questions.length).fill([]));
      } catch (e){
        openModal('Es ist ein Fehler aufgetreten', 'Die Umfrage mit der eingegebenen ID wurde nicht gefunden')
      }
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
        newSelectedAnswers[questionIndex] = newSelectedAnswers[questionIndex].filter((id) => id !== answerId);
      } else {
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

    const postData = {
      id,
      selectedAnswers
    }

    try {

      dispatch(setLoading({
        status: true
      }));

      await voteAll(token, postData);

      dispatch(setLoading({
        status: false
      }));

      openModal('Antworten hochgeladen', 'Deine Antworten wurden erfolgreich gespeichert.')
    } catch (e){
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
        {survey.questions.length > 0 && 
        <div className='endSequenz'>
          <p>Vielen Dank für deine Teilnahme!</p>
          <SubmitButton onClick={() => submitSurvey()} text={'Abschicken'}/>
        </div>}
      </div>
      <div>
        <Modal
          isOpen={isOpen}
          style={modalStyles}
          contentLabel="Dialog"
        >
          <h2>{modalHeading}</h2>
          <p>{modalText}</p>
          <SubmitButton onClick={() => closeModal('/overview')} text={'Schließen'}/>
        </Modal>
      </div>
    </div>  
  )
}

export default SurveyPage;