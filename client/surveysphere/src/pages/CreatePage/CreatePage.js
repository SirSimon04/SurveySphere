import React, { useState } from 'react';
import './CreatePage.css';
import CreateQuestionCard from './components/CreateQuestionCard/CreateQuestionCard';
import { createSurvey } from '../../api/index';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import NavBar from '../../components/NavBar/NavBar';
import CancelButton from '../../components/CancelButton/CancelButton';
import Modal from 'react-modal';
import modalStyles from '../../constants/modalStyles';
import { setLoading } from '../../app/loadingSlice';
import { useDispatch } from 'react-redux';

function CreatePage() {

  const [modalHeading, setModalHeading] = useState('');
  const [modalText, setModalText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [shouldNavigate, setShouldNavigate] = useState(false);
  const [createdSurveyID, setCreatedSurveyID] = useState();

  const dispatch = useDispatch();

  const openModal = (heading, text) => {
      setModalText(text);
      setModalHeading(heading);
      setIsOpen(true);
    }

    const closeModal = (navigationTarget) => {
      setIsOpen(false);
      if(navigationTarget && shouldNavigate){
        navigator.clipboard.writeText(createdSurveyID);
        navigate(navigationTarget);
      }
    };

  const navigate = useNavigate();

  const token = useSelector(state => state.auth.jwt);

  const [title, setTitle] = useState('');
  const [questionCards, setQuestionCards] = useState([{ question: '', answerOptions: ['', ''], singleSelect: true }]);

  const addQuestionCard = () => {
    setQuestionCards([...questionCards, { question: '', answerOptions: ['', ''], singleSelect: true }]);
  };

  const handleDeleteQuestion = (index) => {
    const updatedQuestions = [...questionCards];
    updatedQuestions.splice(index, 1);
    setQuestionCards(updatedQuestions);
  };

  const handleQuestionChange = (e, index) => {
    const updatedQuestionCards = [...questionCards];
    updatedQuestionCards[index].question = e.target.value;
    setQuestionCards(updatedQuestionCards);
  };

  const handleAnswerOptionChange = (e, index, optionIndex) => {
    const updatedQuestionCards = [...questionCards];
    updatedQuestionCards[index].answerOptions[optionIndex] = e.target.value;
    setQuestionCards(updatedQuestionCards);
  };

  const addAnswerOption = (index) => {
    const updatedQuestionCards = [...questionCards];
    updatedQuestionCards[index].answerOptions.push('');
    setQuestionCards(updatedQuestionCards);
  };

  const removeAnswerOption = (index, optionIndex) => {
    const updatedQuestionCards = [...questionCards];
    updatedQuestionCards[index].answerOptions.splice(optionIndex, 1);
    setQuestionCards(updatedQuestionCards);
  };

  const handleQuestionTypeChange = (index) => {
    const updatedQuestionCards = [...questionCards];
    updatedQuestionCards[index].singleSelect = !updatedQuestionCards[index].singleSelect;
    setQuestionCards(updatedQuestionCards);
  };

   const handleTitleChange = (e) => {
      setTitle(e.target.value);
    };

    const handleCancel = (event) => {
      navigate("/overview");
    };


  const convertToServerData = () => {
    const serverData = {
      name: title,
      isMultiSelect: false,
      questions: questionCards.map((card) => ({
        question: card.question,
        isSingleSelect: card.singleSelect,
        answerOptions: card.answerOptions.map((option) => ({
          text: option
        }))
      }))
    };
    return serverData;
  };

  const uploadSurvey = async () => {

    if (title.trim() === '') {
      openModal('Es ist ein Fehler aufgetreten', 'Bitte gib einen Titel für die Umfrage ein.');
      return;
    }

    const allQuestionsAnswered = questionCards.every((card) => {
      return (
        card.question.trim() !== '' &&
        card.answerOptions.every((option) => option.trim() !== '')
      );
    });

    if (!allQuestionsAnswered) {
      openModal('Es ist ein Fehler aufgetreten', 'Bitte fülle alle Fragen und Antwortoptionen aus, bevor du die Umfrage hochlädst.')
      return;
    }

    const data = convertToServerData();

    try{

      dispatch(setLoading({
        status: true
      }));

      const res = await createSurvey(token, data);

      dispatch(setLoading({
        status: false
      }));

      const id = res.data._id;

      setCreatedSurveyID(id);

      setShouldNavigate(true);
      openModal('Erfolgreich erstellt', `Deine Umfrage wurde erfolgreich hochgeladen. Die ID ist ${id}`)

    } catch (e) {
      let error;
      switch(e.response.status){
        default:
          error = "Es ist ein unbestimmer Fehler aufgetreten";
      }
      openModal('Es ist ein Fehler aufgetreten', error);
    }

  }

  return (
    <div className='creatorContainer'>
      <NavBar 
      showGreeting={true}
        middle={<input
            id='titleInput'
            placeholder='Titel eingeben'
            value={title}
            onChange={handleTitleChange}
          ></input>}
        right={<CancelButton 
                  handleCancel={handleCancel} 
                  text={'Erstellen abbrechen'}/>
              }
      />
      <div className='createCardContainer'>
        {questionCards.map((card, index) => (
          <CreateQuestionCard
            key={index}
            question={card.question}
            answerOptions={card.answerOptions}
            singleSelect={card.singleSelect}
            onQuestionChange={(e) => handleQuestionChange(e, index)}
            onAnswerOptionChange={(e, optionIndex) => handleAnswerOptionChange(e, index, optionIndex)}
            onAddAnswerOption={() => addAnswerOption(index)}
            onRemoveAnswerOption={(optionIndex) => removeAnswerOption(index, optionIndex)}
            onQuestionTypeChange={() => handleQuestionTypeChange(index)}
            onDeleteQuestion={() => handleDeleteQuestion(index)}
            questionIndex={index} 
          />
        ))}
        <div className='addCardButtonContainer'>
          <button className='addCardButton' onClick={addQuestionCard}>+</button>
        </div>
        <div className='endSequenz'>
          <p>Dein Umfrage ist fertig?</p>
          <SubmitButton onClick={uploadSurvey} text={'Hochladen!'}/>
        </div>
      </div>
      <div>
        <Modal
          isOpen={isOpen}
          style={modalStyles}
          contentLabel="Dialog"
        >
          <h2>{modalHeading}</h2>
          <p>{modalText}</p>
          <SubmitButton onClick={() => closeModal('/overview')} text={shouldNavigate ? 'ID kopieren' : 'Schließen'}/>
          
        </Modal>
      </div>
    </div>
  );
}

export default CreatePage;
