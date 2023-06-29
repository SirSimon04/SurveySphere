import React from 'react';
import './CreateQuestionCard.css';
import ToggleSwitch from '../../../../components/ToggleSwitch/ToggleSwitch';
import DeleteButton  from '../../../../components/DeleteButton/DeleteButton';
import BasicCard from '../../../../components/BasicCard/BasicCard';

function CreateQuestionCard({ question, answerOptions, singleSelect, onQuestionChange, onAnswerOptionChange, onAddAnswerOption, onRemoveAnswerOption, onQuestionTypeChange, onDeleteQuestion, questionIndex }) {
  return (
    <BasicCard>
      {questionIndex >= 1 && (
        <DeleteButton className='questionDelete' onClick={onDeleteQuestion}/>
      )}
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
              <DeleteButton onClick={() => onRemoveAnswerOption(index)} />
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
    </BasicCard>
  );
}

export default CreateQuestionCard;
