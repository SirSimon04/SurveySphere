import React from 'react';
import './SurveyQuestionCard.css';
import BasicCard from '../../../../components/BasicCard/BasicCard';

function SurveyQuestionCard({ question, handleAnswerSelect, index, selectedAnswers }) {
  const isAnswerSelected = (answerId) => {
    return selectedAnswers.includes(answerId);
  };

  return (
    <BasicCard>
      <p className="questionTitle">{question.question}</p>
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
    </BasicCard>
  );
}

export default SurveyQuestionCard;
