import React, { useState } from 'react';
import './CreateQuestionCard.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function CreateQuestionCard() {
  const [question, setQuestion] = useState('');
  const [answerOptions, setAnswerOptions] = useState(['', '']);
  const [singleSelect, setSingleSelect] = useState(true);

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

  const handleQuestionTypeChange = () => {
    setSingleSelect(prev => !prev);
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
        <label className='questionTypeLabel'>Single Select</label>
        <ToggleSwitch onChange={handleQuestionTypeChange} singleSelect={singleSelect}/>
      </div>
    </div>
  );
}

export default CreateQuestionCard;
