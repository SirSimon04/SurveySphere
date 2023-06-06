import React, { useState } from 'react';
import './Creator.css'
import CreaNavBar from '../CreaNavBar/CreaNavBar.js';
import CreateQuestionCard from '../CreateQuestionCard/CreateQuestionCard';

function Creator() {
  const [questionCards, setQuestionCards] = useState([<CreateQuestionCard />]);

  const addQuestionCard = () => {
    setQuestionCards([...questionCards, <CreateQuestionCard />]);
  };

  return (
    <div className='creatorContainer'>
      <CreaNavBar />
      <div className='createCardContainer'>
        {questionCards}
        <div className='addCardButtonContainer'>
          <button className='addCardButton' onClick={addQuestionCard}>+</button>
        </div>
      </div>
    </div>
  )
}

export default Creator