import React, { useState } from 'react';
import './CreateQuestionCard.css';

function CreateQuestionCard() {
  const [question, setQuestion] = useState('');
  const [answerOptions, setAnswerOptions] = useState(['', '']);
  const [questionType, setQuestionType] = useState('single');

  const handleQuestionChange = (e) => {
    setQuestion(e.target.value);
  };

  const handleAnswerOptionChange = (e, index) => {
    const updatedOptions = [...answerOptions];
    updatedOptions[index] = e.target.value;
    setAnswerOptions(updatedOptions);
  };

  const addAnswerOption = () => {
    setAnswerOptions([...answerOptions, '']);
  };

  const handleQuestionTypeChange = (e) => {
    setQuestionType(e.target.value);
  };

  return (
    <div className='basicCard'>
      <input className='answer question' placeholder='Frage eingeben:' value={question} onChange={handleQuestionChange} />
      <div className='answerGrid'>
        {answerOptions.map((option, index) => (
          <input
            key={index}
            className='answer'
            placeholder='Antwortmöglichkeit eingeben:'
            value={option}
            onChange={(e) => handleAnswerOptionChange(e, index)}
          />
        ))}
        <button className='addOptionButton' onClick={addAnswerOption}>+</button>
      </div>
      <div className='questionType'>
        <label>
          <input type='radio' value='single' checked={questionType === 'single'} onChange={handleQuestionTypeChange} />
          Single Select
        </label>
        <label>
          <input type='radio' value='multi' checked={questionType === 'multi'} onChange={handleQuestionTypeChange} />
          Multi Select
        </label>
      </div>
    </div>
  );
}

export default CreateQuestionCard;
