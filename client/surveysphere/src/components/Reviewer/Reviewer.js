import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOwnSurveys } from '../../api/index';
import { useSelector } from 'react-redux';
import './Reviewer.css';
import NavBar from '../NavBar/NavBar';
import CancelButton from '../CancelButton/CancelButton';
import LogoButton from '../LogoButton/LogoButton';

const Reviewer = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.auth.jwt);
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    loadSurvey();
    // eslint-disable-next-line
  }, []);

  async function loadSurvey() {
    try {
      const dbSurveys = await getOwnSurveys(token);
      setSurveys(dbSurveys.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(surveys);
  }, [surveys]);

  const handleSurveyClick = (survey) => {
    navigate(`/result`, { state: { survey } });
  };

  return (
    <>
      <NavBar 
          showGreeting={true}
          middle={<h1 className="surveyListTitle">Deine erstellen Umfragen</h1>}
          right={<LogoButton />}
        />
      <div className="surveyListContainer">
        {surveys.map((survey) => (
          <div
            key={survey.id}
            className="surveyItem"
            onClick={() => handleSurveyClick(survey)}
          >
            <a className="surveyItemLink" href="/result">
              {survey.name}
            </a>
          </div>
        ))}
      </div>
    </>
  );
};

export default Reviewer;
