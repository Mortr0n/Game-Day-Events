import React, { useState } from 'react';
import './App.css';
import Main from './views/Main';
import { Router } from '@reach/router';
import CreateEvent from './views/CreateEvent';
import EventList from './views/EventList';
import EventDetails from './views/EventDetails';
import EditEvent from './views/EditEvent';

function App() {
  const [ gameEvents, setGameEvents ] = useState([]);

  return (
    <div className="App">
      <Router>
        {/* TODO: when login/reg complete remove the default from here */}
        <Main default path="/events"/>
        <CreateEvent path="/events/new" gameEvents={gameEvents} setGameEvents={setGameEvents}/>
        <EventList path="/events/list" gameEvents={gameEvents} setGameEvents={setGameEvents} />
        <EventDetails path="/events/:id" />
        <EditEvent path="/events/:id/edit" gameEvents={gameEvents} setGameEvents={setGameEvents} />
      </Router>
      
    </div>
  );
}

export default App;
