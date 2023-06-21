import React from 'react';
import './ResultPage.css';
import ResultCard from './components/ResultCard/ResultCard';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

function ResultPage() {
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

export default ResultPage;


