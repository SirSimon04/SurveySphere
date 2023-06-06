import React, { useState } from 'react';
import './CreateQuestionCard.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function CreateQuestionCard({ onDelete }) {
  const [question, setQuestion] = useState('');
  const [answerOptions, setAnswerOptions] = useState(['', '', '']);
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

  const removeAnswerOption = (index) => {
    const updatedOptions = [...answerOptions];
    updatedOptions.splice(index, 1);
    setAnswerOptions(updatedOptions);
  };

  const handleQuestionTypeChange = () => {
    setSingleSelect((prev) => !prev);
  };

  return (
    <div className='basicCard'>
      <button className='closeButton' onClick={() => onDelete()}>
        X
      </button>
      <input
        className='answer question'
        placeholder='Frage eingeben:'
        value={question}
        onChange={handleQuestionChange}
      />
      <div className='answerGrid'>
        {answerOptions.map((option, index) => (
          <div key={index} className='answerContainer'>
            <input
              className='answer'
              placeholder='Antwortmöglichkeit eingeben:'
              value={option}
              onChange={(e) => handleAnswerOptionChange(e, index)}
            />
            {index >= 2 && (
              <button
                className='closeButton'
                onClick={() => removeAnswerOption(index)}
              >
                X
              </button>
            )}
          </div>
        ))}
        <button className='addOptionButton' onClick={addAnswerOption}>
          +
        </button>
      </div>
      <div className='questionType'>
        <label className='questionTypeLabel'>
          {singleSelect ? 'Single Select' : 'Multi Select'}
        </label>
        <ToggleSwitch
          onChange={handleQuestionTypeChange}
          singleSelect={singleSelect}
        />
      </div>
    </div>
  );
}

export default CreateQuestionCard;
