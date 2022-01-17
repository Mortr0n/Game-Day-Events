import React, { useState } from 'react';
import './App.css';
import Main from './views/Main';
import { Router } from '@reach/router';
import CreateEvent from './views/CreateEvent';
import EventList from './views/EventList';
import EventDetails from './views/EventDetails';

function App() {
  const [ gameEvents, setGameEvents ] = useState([]);

  return (
    <div className="App">
      <Router>
        <Main path="/events"/>
        <CreateEvent path="/events/new" gameEvents={gameEvents} setGameEvents={setGameEvents}/>
        <EventList path="/events/list" gameEvents={gameEvents} setGameEvents={setGameEvents} />
        <EventDetails path="/events/:id" />
      </Router>
      
    </div>
  );
}

export default App;
