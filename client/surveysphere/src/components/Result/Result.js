import React from 'react';
import './Result.css';
import ResultCard from '../ResultCard/ResultCard';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';

function Result() {
  const location = useLocation();
  const survey = location.state?.survey;

  console.log({survey})

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/reviewer');
  };

  return (
    <>
      <NavBar 
        middle={<h1>{survey.name}</h1>}
        right={<button onClick={handleBackClick}>Zurück</button>}
      />
      <div className="resultContainer">
        {survey && survey.questions.map((question) => (
          <ResultCard question={question} />
        ))}
      </div>
    </>
    
  );
}

export default Result;


