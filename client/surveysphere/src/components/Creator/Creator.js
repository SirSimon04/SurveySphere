import React from 'react'
import './Creator.css'
import CreaNavBar from '../CreaNavBar/CreaNavBar.js';
import CreateQuestionCard from '../CreateQuestionCard/CreateQuestionCard';

function Creator() {
  return (
    <div className='creatorContainer'>
        <CreaNavBar />
        <div className='createCardContainer'>
          <CreateQuestionCard />
          <CreateQuestionCard />
          <CreateQuestionCard />
          <CreateQuestionCard />
        </div>
    </div>
  )
}

export default Creator