import React from 'react';
import './Result.css';
import ResultCard from '../ResultCard/ResultCard';
import { useLocation } from 'react-router-dom';

function Result() {
  const location = useLocation();
  const survey = location.state?.survey;

  console.log({survey})

  return (
    <div className="resultContainer">
      {survey && survey.questions.map((question) => (
        <ResultCard question={question} />
      ))}
    </div>
  );
}

export default Result;


