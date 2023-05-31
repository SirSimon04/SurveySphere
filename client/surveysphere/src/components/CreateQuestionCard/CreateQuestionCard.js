import React from 'react'
import './CreateQuestionCard.css'


function CreateQuestionCard() {
  return (
    <div className='basicCard'>
      <input className='answer question' placeholder='Frage eingeben:'></input>
      <div className='answerGrid'>
        <input className='answer' placeholder='Antwortmöglichkeit eingeben:'/>
        <input className='answer' placeholder='Antwortmöglichkeit eingeben:'/>
        <input className='answer' placeholder='Antwortmöglichkeit eingeben:'/>
        <input className='answer' placeholder='Antwortmöglichkeit eingeben:'/>
      </div>
    </div>
  )
}

export default CreateQuestionCard