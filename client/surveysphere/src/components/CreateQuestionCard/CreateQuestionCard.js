import React from 'react';
import './CreateQuestionCard.css';
import ToggleSwitch from '../ToggleSwitch/ToggleSwitch';

function CreateQuestionCard({ question, answerOptions, singleSelect, onQuestionChange, onAnswerOptionChange, onAddAnswerOption, onRemoveAnswerOption, onQuestionTypeChange, onDeleteQuestion }) {
  return (
    <div className='basicCard'>
      <button className='deleteButton' onClick={onDeleteQuestion}>
        X
      </button>
      <input
        className='answer question'
        placeholder='Frage eingeben:'
        value={question}
        onChange={onQuestionChange}
      />
      <div className='answerGrid'>
        {answerOptions.map((option, index) => (
          <div key={index} className='answerContainer'>
            <input
              className='answer'
              placeholder='Antwortmöglichkeit eingeben:'
              value={option}
              onChange={(e) => onAnswerOptionChange(e, index)}
            />
            {index >= 2 && (
              <button
                className='closeButton'
                onClick={() => onRemoveAnswerOption(index)}
              >
                X
              </button>
            )}
          </div>
        ))}
        <button className='addOptionButton' onClick={onAddAnswerOption}>+</button>
      </div>
      <div className='questionType'>
        <label className='questionTypeLabel'>
          Single Select
        </label>
        <ToggleSwitch
          onChange={onQuestionTypeChange}
          singleSelect={singleSelect}
        />
      </div>
    </div>
  );
}

export default CreateQuestionCard;
