import React from 'react'
import './ImpressumPage.css'
import CancelButton from '../../components/CancelButton/CancelButton';

function ImpressumPage() {
  const goBack = () => {
    window.history.back();
  };
  return (
    <div className='impressum-container'>
        <h1>Impressum</h1>
        <p>Angaben gemäß § 5 TMG</p>
        <br />
        <p>Simon Engel</p>
        <p>DHBW-Straße 1</p>
        <p>76133 Karlsruhe</p>
        <br />
        <p><b>Vertreten durch:</b></p>
        <p>Simon Engel</p>
        <p>Niklas Opiela</p>
        <br />
        <p><b>Kontakt:</b></p>
        <p>Telefon: 01-23456789</p>
        <p>E-Mail: <a href="mailto:simi@engelnetz.de">simi@engelnetz.de</a></p>
        <br />
        <p><b>Hauftungsauschluss:</b></p>
        <br />
        <p><b>Haftung für Inhalte</b></p>
        <br />
        <p>Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
        <br />
        <p><b>Datenschutz</b></p>
        <br />
        <p>Die Nutzung unserer Webseite ist in der Regel ohne Angabe personenbezogener Daten möglich. Soweit auf unseren Seiten personenbezogene Daten (beispielsweise Name, Anschrift oder eMail-Adressen) erhoben werden, erfolgt dies, soweit möglich, stets auf freiwilliger Basis. Diese Daten werden ohne Ihre ausdrückliche Zustimmung nicht an Dritte weitergegeben.
        Wir weisen darauf hin, dass die Datenübertragung im Internet (z.B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
        Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten durch Dritte zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit ausdrücklich widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-Mails, vor.</p>
        <div id='linkSection'>
          <a href="https://www.flaticon.com/free-icons/share" title="share icons">Share icons created by Freepik - Flaticon</a> <br/>
          <a href="https://www.flaticon.com/free-icons/identification" title="identification icons">Identification icons created by Pixel perfect - Flaticon</a>
          <a href="https://www.flaticon.com/free-icons/logout" title="logout icons">Logout icons created by Afian Rochmah Afif - Flaticon</a>
        </div>
        <div id='backButtonDiv'>
          <CancelButton
            text={"Zurück"}
            handleCancel={goBack}/>
        </div>
    </div>    
  );
}

export default ImpressumPage