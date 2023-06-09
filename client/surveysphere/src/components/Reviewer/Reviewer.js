import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOwnSurveys } from '../../api/index';
import { useSelector } from 'react-redux';
import './Reviewer.css';

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

  const handleSurveyClick = (id) => {
    navigate(`/result/${id}`);
  };

  return (
    <div className="surveyListContainer">
      <h1 className="surveyListTitle">Deine erstellen Umfragen</h1>
      {surveys.map((survey) => (
        <div
          key={survey.id}
          className="surveyItem"
          onClick={() => handleSurveyClick(survey._id)}
        >
          <a className="surveyItemLink" href="/result">
            {survey.name}
          </a>
        </div>
      ))}
    </div>
  );
};

export default Reviewer;
