import React from 'react'
import { useNavigate } from "react-router-dom";
import './SurveyQuestionCard.css';

function SurveyQuestionCard() {
  return (
    <div className='basicCard'>
        <p>Frage 1: Welche dieser Farben magst Du am meisten?</p>
        <div className='answerGrid'>
            <button className='answer'>Antwort 1</button>
            <button className='answer'>Antwort 2</button>
            <button className='answer'>Antwort 3</button>
            <button className='answer'>Antwort 4</button>
        </div>
    </div>
  )
}

export default SurveyQuestionCard