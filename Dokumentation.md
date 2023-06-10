# Surveysphere - Technische Dokumentation

<!-- [![Netlify Status](https://api.netlify.com/api/v1/badges/2c5a5a29-b440-4d68-a7ce-8e3b451bbe30/deploy-status)](https://app.netlify.com/sites/serene-peony-70ab98/deploys) -->

## Struktur der Website

### Willkommensseite
Das ist die erste Seite, auf die der Nutzer geleitet wird, wenn er die Website besucht. Hier erfolgt eine Erklärung, wie die Applikation zu bedienen ist, damit der Nutzer weiß, was zu tun ist. Von dieser Seite kann auf die Anmelde-Seite navigiert werden.

### Anmelde-Seite
Auf dieser Seite kann der Nutzer sich entweder anmelden, wenn er schon eine Account hat, oder einen neuen Account erstellen. Unabhängig davon, ob der Nutzer sich anmeldet oder registriert, wird er danach auf die Übersichtsseite geleitet.

### Übersichtsseite
Diese Seite stellt den zentralen Bedienpunkt der Anwendung dar. Von hier aus gibt es verschiedene Dinge, die der Nutzer tun kann. Die Eingabe der ID einer Umfrage ist möglich, darauf folgt eine Navigation auf die Antwortseite. Außerdem ist es möglich, auf die Erstellseite und die Ergebnisseite zu navigieren.

### Antwortseite
Auf dieser Seite ist es dem Nutzer möglich, seine Antworten zu einer Umfrage einzugeben. Die Umfrage kann entweder abgebrochen oder abgeschickt werden. In beiden Fällen erfolgt eine Navigation zurück auf die Übersichtsseite.

### Erstellseite
Diese Seite dient dem Erstellen von neuen Umfragen. Es kann ein Titel eingegeben und Antworten hinzugefügt werden. Es ist möglich, beliebig viele Fragen und zu jeder Frage Antwortmöglichkeiten hinzuzufügen. Damit die Umfrage hochgeladen werden kann, muss jede hinzugefügte Frage und Antwortmöglichkeit ausgefüllt werden. Nach dem erfolgreichen Erstellen wird auch wieder zurück auf die Übersichtsseite geleitet.

### Ergebnisseite
Auf dieser Seite können die Ergebnisse von erstellten Umfragen eingesehen werden. Dafür gibt es zuerst eine Liste, die alle selbst erstellten Umfragen enthält. Bei Auswahl einer dieser Umfragen wird weiter auf die eigentliche Seite mit den Ergebnissen navigiert, auf der zu jeder Frage die Verteilung der Antworten eingesehen werden kann.