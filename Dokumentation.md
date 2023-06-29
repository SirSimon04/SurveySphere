# Surveysphere - Technische Dokumentation

<!-- [![Netlify Status](https://api.netlify.com/api/v1/badges/2c5a5a29-b440-4d68-a7ce-8e3b451bbe30/deploy-status)](https://app.netlify.com/sites/serene-peony-70ab98/deploys) -->

## Struktur und Aufbau der Website

### Willkommensseite
Das ist die erste Seite, auf die der Nutzer geleitet wird, wenn er die Website besucht. Hier erfolgt eine Erklärung, wie die Applikation zu bedienen ist, damit der Nutzer weiß, was zu tun ist. Von dieser Seite kann auf die Anmelde-Seite navigiert werden.

### Anmelde-Seite
Auf dieser Seite kann der Nutzer sich entweder anmelden, wenn er schon eine Account hat, oder einen neuen Account erstellen. Unabhängig davon, ob der Nutzer sich anmeldet oder registriert, wird er danach auf die Übersichtsseite geleitet.
Die Seite ist simpel aufgebaut: Zentral ist die Komponente, in der mit Textfeldern Informationen eingegeben werden. Über einen Link am unteren Ende der Komponente kann zwischen Anmeldung und Registrierung gewechselt werden. Unter den Textfeldern ist ein Knopf, der durch den die Anmelde- oder Registrierung ausgeführt werden kann.

### Übersichtsseite
Diese Seite stellt den zentralen Bedienpunkt der Anwendung dar. Von hier aus gibt es verschiedene Dinge, die der Nutzer tun kann. Die Eingabe der ID einer Umfrage ist möglich, darauf folgt eine Navigation auf die Antwortseite. Außerdem ist es möglich, auf die Erstellseite und die Ergebnisseite zu navigieren.

### Antwortseite
Auf dieser Seite ist es dem Nutzer möglich, seine Antworten zu einer Umfrage einzugeben. Die Umfrage kann entweder abgebrochen oder abgeschickt werden. In beiden Fällen erfolgt eine Navigation zurück auf die Übersichtsseite.

### Erstellseite
Diese Seite dient dem Erstellen von neuen Umfragen. Es kann ein Titel eingegeben und Antworten hinzugefügt werden. Es ist möglich, beliebig viele Fragen und zu jeder Frage Antwortmöglichkeiten hinzuzufügen. Damit die Umfrage hochgeladen werden kann, muss jede hinzugefügte Frage und Antwortmöglichkeit ausgefüllt werden. Nach dem erfolgreichen Erstellen wird auch wieder zurück auf die Übersichtsseite geleitet.

### Ergebnisseite
Auf dieser Seite können die Ergebnisse von erstellten Umfragen eingesehen werden. Dafür gibt es zuerst eine Liste, die alle selbst erstellten Umfragen enthält. Bei Auswahl einer dieser Umfragen wird weiter auf die eigentliche Seite mit den Ergebnissen navigiert, auf der zu jeder Frage die Verteilung der Antworten eingesehen werden kann.

## Frontend
Das Frontend der Applikation wird grundsätzlich mit ReactJS aufgebaut. Für jede Seite, die auf der Website angezeigt wird, gibt es einen eigenen Ordner, indem für die Seite das HTML aufgebaut und das CSS gespeichert wird. Dabei ist ReactJS grundsätzlich Komponenten-basiert aufgebaut: Für jede Seite gibt es eine Komponente im Ordner *pages* und Komponenten, die in mehreren Seiten verwendet werden, wie zum Beispiel Buttons, sind im Ordner *components* zu finden. React-Komponenten sind Funktionen, die HTML-Code zurückgeben. Zu jeder Komponente gibt es eine gleichnamige css-Datei, die in dieser importiert wird. 

### Technischer Aufbau
Anhand des Login-/ Signup-Prozesses kann der technische Aufbau der Seiten gut illustriert werden. Über alle Seiten hinweg werden sogenannte Hooks eingesetzt. In React ermöglich Hooks, dass Komponenten zusätzliche Funktionalitäten erhalten. Der meistgenutze Hook ist der sogenannte *useState*-Hook: Mit diesem kann der Zustand in den funktionalen Komponenten verwaltet werden (*State Management*). So können Zustandsvariablen erstellt und aktualisert werden, der Hook gibt auperdem eine Funktion zurück, um den Zustand zu aktualisieren. Dadurch können bei jeder Zustandsänderung die von der Veränderung betroffenen Teile der UI mit dem aktualisierten Zustand neu gebaut werden. Dieser Hook wird beim Login genutzt, um die Inhalte der Textfelder auszulesen und die sich daraus ergebenden Zustandsvariablen zu verarbeiten. Außerdem wird über einen *useState*-Hook gespeichert, ob der Nutzer sich im Login- oder Signup-Modus befindet. Dieser Modus kann über die jeweilige Schaltfläche geändert werden ("Registieren"/"Login"). Befindet der Nutzer sich im Registrieren-Modus, werden zwei zusätzliche Textfelder sichtbar, indem die Zustandsvariable überprüft wird: Ein Feld für die Passwortwiederholung sowie ein Feld für den Nutzernamen.

Beim Einloggen bzw. Registrieren wird eine Anfrage an das Backend gesendet: Alle diese Anfragen befinden sich im *api*-Ordner. Zum Senden der Requests wird das npm-Paket [axios](https://www.npmjs.com/package/axios) verwendet, da dieses einfach und schnell zu benutzen ist. Der Aufruf der Methoden im *api*-Ordner erfolgt immer in einem try-catch-Block: Tritt bei der Anfrage ein Fehler auf, kann entsprechend des HTTP-Codes, der vom Backend gesendet wird, ein Fehler angezeigt werden. Beim Login sind dies zum Beispiel ein 404, wenn die E-Mailadresse nicht gefunden wurde oder ein 401 bei falscher Passworteingabe.

Nach erfolgreicher Antwort vom Server wird auf die Übersichtsseite geleitet. Um das Routing innerhalb der Applikation zu gewährleisten, wird das npm-Paket [React Router](https://www.npmjs.com/package/react-router-dom) verwendet. In der Datei App.js wird zunächst ein Router erstellt, bevor die einzelnen Routen angelegt werden können. Jeder URL kann eine React-Komponente zugewiesen werden, die bei Aufruf der URL angezeigt wird. Auch für den Fall, dass eine URL unbekannt ist, kann eine Komponente angezeigt werden, in unserem Fall ein klassisches 404-Bild. Um aus React eine Route aufzurufen, wird erneut ein Hook benutzt, genauer der *useNavigate*-Hook, dem eine URL übergeben werden kann, auf die geroutet werden soll.

Zum globalen State-Management der Applikation wird [React Redux](https://react-redux.js.org/) verwendet. Dabei handelt es sich grundsätzlich um einen Container, in den Daten geschrieben werden können, auf die von überall zugegriffen werden kann. In der *index.js*-Datei, dem Einstiegspunkt der Applikation, wird der Store konfiguriert und hinzugefügt, sodass er allen Komponenten der Applikation zur Verfügung steht. Die Daten des Stores werden über sogenannte *Actions* verändert, die dispatched werden können. Nach erfolgreichem Login wird die Login-Action aufgerufen und einige Daten übergeben. Das Aufrufen der Actions erfolgt wieder über einen Hook, der von Redux zur Verfügung gestellt wird. Die Action wird mit mehreren Paramtern aufgerufen, wie dem Nutzernamen oder einem Token, welche dann in den Store geschrieben werden. Über den *useSelector*-Hook ist es in jedem Teil der Applikation möglich, auf die Daten des Stores zuzugreifen.

#### Darstellung der Ergebnisse
Zu den zentralen Anforderungen an die Applikation gehört die visuell ansprechende Darstellung der Umfrageergebnisse. Um diese einfach zu gestalten, ist die Wahl auf ein weiters npm-Paket für React gefallen, [ChartJS](https://www.npmjs.com/package/chart.js?activeTab=readme). Die Ergebnisse jeder Frage werden in der Komponente ResultCard angezeigt, in der entsprechend der Anzahl der Antwortmöglichkeiten die Visualisierung der Ergebnisse in einem Säulendiagramm erfolgt.

## Backend