import React, { useEffect, useState } from 'react';
import { getOwnSurveys } from '../../api/index';
import { useSelector } from 'react-redux';

function Reviewer() {
  const token = useSelector((state) => state.auth.jwt);
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    loadSurvey();
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

  return <div>
    {surveys.map((survey) => (
        <div key={survey._id}>
          <h3>{survey.name}</h3>
        </div>
      ))}
  </div>;
}

export default Reviewer;
