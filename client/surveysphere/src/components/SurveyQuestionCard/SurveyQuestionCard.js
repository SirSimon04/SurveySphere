import React from 'react';
import './SurveyQuestionCard.css';

function SurveyQuestionCard({ question, handleAnswerSelect, index, selectedAnswers }) {
  const isAnswerSelected = (answerId) => {
    return selectedAnswers.includes(answerId);
  };

  return (
    <div className='basicCard'>
      <p>{question.question}</p>
      <div className='answerGrid'>
        {question.answerOptions.map((option) => (
          <button
            key={option._id}
            className={`answer ${isAnswerSelected(option._id) ? 'answer-selected' : ''}`}
            onClick={() => handleAnswerSelect(index, option._id)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SurveyQuestionCard;
