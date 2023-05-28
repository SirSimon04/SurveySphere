import React from 'react'
import './SurveyQuestionCard.css';

function SurveyQuestionCard({ question, handleAnswerSelect, selectedAnswer, index }) {

  return (
    <div className='basicCard'>
      <p>{question.question}</p>
        {/* <p>Frage 1: Welche dieser Farben magst Du am meisten?</p> */}
        <div className='answerGrid'>
            {question.answerOptions.map(option => 
            <button 
              key={option._id} 
              className={`answer ${selectedAnswer === option._id ? 'answer-selected' : ''}`}
              onClick={() => handleAnswerSelect(index, option._id)}
            >
              {option.text}
            </button>)}
            {/* <button className='answer'>Antwort 1</button>
            <button className='answer'>Antwort 2</button>
            <button className='answer'>Antwort 3</button>
            <button className='answer'>Antwort 4</button> */}
        </div>
    </div>
  )
}

export default SurveyQuestionCard