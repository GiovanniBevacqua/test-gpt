# test-gpt-react
# Chat con integrazione GPT-3.5
Questo progetto implementa una semplice applicazione web dove gli utenti possono interagire con il modello GPT-3.5 attraverso una interfaccia di chat. Gli utenti possono inserire domande o messaggi e ricevere risposte generate dal modello GPT-3.5.

## Tecnologie Utilizzate
React + Vite + TypScript: Library frontend per la costruzione dell'interfaccia utente.
Node.js / Express: Server backend per la gestione delle richieste API.
OpenAI API: Integrazione con il modello GPT-3.5 per il processamento del linguaggio naturale.

## Prerequisiti
Node.js installato sul tuo computer
API Key per OpenAI GPT-3.5 (sostituire <OPENAI_API_KEY> con la tua chiave API effettiva in server.js)

## Setup

## Clonare il repository
git clone https://github.com/GiovanniBevacqua/test-gpt.git

## Installare le dipendenze per il frontend
cd test-gpt/frontend
npm install vite typescript

## Installare le dipendenze per il backend
cd ../backend
npm install

# Avvio dell'applicazione
## Avviare il frontend (React)
cd ../frontend
npm run dev

Il frontend sarà disponibile all'indirizzo http://localhost:5173.

## Avviare il backend (Node.js con Express)
cd ../backend
node index.js

Il backend sarà disponibile all'indirizzo http://localhost:5000.

## Utilizzo
Accedere all'applicazione nel browser all'indirizzo http://localhost:5173.
Inserire una domanda o un messaggio nel campo di input e premere "Invia".
La domanda sarà inviata al server backend che a sua volta invierà la query al modello GPT-3.5 tramite l'API di OpenAI.
Una volta ricevuta la risposta dal modello, questa verrà visualizzata nella finestra di chat.
