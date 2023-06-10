import React from 'react';
import BasicCard from '../BasicCard/BasicCard';
import SubmitButton from '../SubmitButton/SubmitButton';
import { useNavigate } from 'react-router-dom';
import './StartingPage.css';

function StartingPage() {
  const navigate = useNavigate();

  return (
    <div className='startContainer'>
      <BasicCard>
        <h2>Herzlich Willkommen zu Surveysphere</h2>
        <p>Hier kannst du einfach und schnell Umfragen erstellen.</p>
        <p>TODO: hier muss noch eine grobe Anleitung eingefügt werden, was noch so gemacht werden muss</p>
        <div className='submitButtonContainer'>
          <SubmitButton
            className='submitButton'
            text='Zur Anmeldung'
            onClick={() => navigate('/auth')}
          />
        </div>
      </BasicCard>
    </div>
  );
}

export default StartingPage;