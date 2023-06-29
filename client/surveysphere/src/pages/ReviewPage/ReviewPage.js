import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOwnSurveys } from '../../api/index';
import { useSelector } from 'react-redux';
import './ReviewPage.css';
import NavBar from '../../components/NavBar/NavBar';
import LogoButton from '../../components/LogoButton/LogoButton';
import copyImg from './media/shareIconWhite.png';

const ReviewPage = () => {
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
    }
  }

  const handleSurveyClick = (survey) => {
    navigate(`/result`, { state: { survey } });
  };

  const copySurveyId = (surveyId) => {
    navigator.clipboard.writeText(surveyId);
  };

  return (
    <>
      <NavBar 
          showGreeting={true}
          middle={<h1 className="surveyListTitle">Deine erstellen Umfragen</h1>}
          right={<LogoButton />}
        />
      <div className="surveyListContainer">
        <div className="surveyResultContainer">
          {surveys.map((survey) => (
            <div
              key={survey.id}
              className="surveyItem"
              onClick={() => handleSurveyClick(survey)}
              >
              <p>{survey.name}</p>
              <p className ='message'>Link in Zwischenablage kopiert</p>
              <button className='copyButton' onClick={(event) => { event.stopPropagation(); copySurveyId(survey._id)}}>
                <img className='copyImage' src={copyImg} alt="" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ReviewPage;
