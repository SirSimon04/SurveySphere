import React from 'react';
import BasicCard from '../../components/BasicCard/BasicCard';
import SubmitButton from '../../components/SubmitButton/SubmitButton';
import { useNavigate } from 'react-router-dom';
import './StartingPage.css';

function StartingPage() {
  const navigate = useNavigate();

  return (
    <div className='startContainer'>
      <BasicCard>
        <h2>Herzlich Willkommen zu Surveysphere</h2>
        <p>Hier kannst du einfach und schnell Umfragen erstellen.
        <br />
        <br />  
        Dafür ist es zuerst nötig, dass Du Dir einen Account erstellst. So kann gespeichert werden, an welchen Umfragen du bereits teilgenommen hast. Nach der Accounterstellung wirst du auf eine Übersichts-Seite weitergeleitet. Von dieser kannst du zu verschiedenen Seiten navigieren. Über das Eingabefeld oben auf der Seite ist es möglich, an Umfragen teilzunehmen und diese zu beantworten. 
        <br />
        <br />
        Außerdem kannst du zum Erstellen von Umfragen gelangen: Hier ist es möglich, beliebig viele Fragen und Antwortmöglichkeiten hinzuzufügen. Nach dem Hochladen erhälst du eine ID, die Du mit anderen Teilen kannst, damit diese an deiner Umfrage teilnehmen können.
        <br />
        <br />
        Auch auch auf deine erstelltem Umfragen kannst du navigieren: Hier ist es  möglich, Einsicht über die Antworten deiner Umfragen zu erhalten, um diese Auswerten zu können.</p>
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