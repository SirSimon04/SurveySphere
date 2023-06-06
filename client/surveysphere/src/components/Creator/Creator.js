import React, { useState } from 'react';
import './Creator.css';
import CreaNavBar from '../CreaNavBar/CreaNavBar.js';
import CreateQuestionCard from '../CreateQuestionCard/CreateQuestionCard';

function Creator() {
  const [questionCards, setQuestionCards] = useState([{ question: '', answerOptions: ['', '', ''], singleSelect: true }]);

  const addQuestionCard = () => {
    setQuestionCards([...questionCards, { question: '', answerOptions: [''], singleSelect: true }]);
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

  const convertToServerData = () => {
    const serverData = {
      name: 'Das ist ein erster Test',
      isMultiSelect: false,
      questions: questionCards.map((card) => ({
        question: card.question,
        answerOptions: card.answerOptions.map((option) => ({
          text: option
        }))
      }))
    };
    console.log(serverData);
    return serverData;
  };

  return (
    <div className='creatorContainer'>
      <CreaNavBar />
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
          />
        ))}
        <div className='addCardButtonContainer'>
          <button className='addCardButton' onClick={addQuestionCard}>+</button>
        </div>
        <button onClick={convertToServerData}>Daten an Server senden</button>
      </div>
    </div>
  );
}

export default Creator;
