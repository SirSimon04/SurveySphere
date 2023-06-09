import React, { useState } from 'react';
import './Creator.css';
import CreaNavBar from '../CreaNavBar/CreaNavBar.js';
import CreateQuestionCard from '../CreateQuestionCard/CreateQuestionCard';
import { createSurvey } from '../../api/index';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import SubmitButton from '../SubmitButton/SubmitButton';

function Creator() {

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


  const convertToServerData = () => {
    console.log()
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
    console.log(serverData);
    return serverData;
  };

  const uploadSurvey = async () => {

    if (title.trim() === '') {
      alert('Bitte gib einen Titel für die Umfrage ein.');
      return;
    }

    const allQuestionsAnswered = questionCards.every((card) => {
      return (
        card.question.trim() !== '' &&
        card.answerOptions.every((option) => option.trim() !== '')
      );
    });

    if (!allQuestionsAnswered) {
      alert('Bitte fülle alle Fragen und Antwortoptionen aus, bevor du die Umfrage hochlädst.');
      return;
    }

    const data = convertToServerData();

    try{

      const res = await createSurvey(token, data);

      console.log(res);

      const id = res.data._id;

      alert(`Erfolgreich erstellt ${id}`);

      navigate('/overview');

    } catch (e) {
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
    <div className='creatorContainer'>
      <CreaNavBar title={title} onTitleChange={handleTitleChange} />
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
    </div>
  );
}

export default Creator;
