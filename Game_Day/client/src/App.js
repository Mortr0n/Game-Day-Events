import React, { useState } from 'react';
import './App.css';
import Main from './views/Main';
import { Router } from '@reach/router';
import CreateEvent from './views/CreateEvent';
import EventList from './views/EventList';
import EventDetails from './views/EventDetails';
import EditEvent from './views/EditEvent';
import LogReg from './views/LogReg';

function App() {
  const [ gameEvents, setGameEvents ] = useState([]);
  const [ user, setUser ] = useState({});

  return (
    <div className="App">
      <Router>
        <LogReg default path="/events" />
        <Main path="/events/home" user={user} setUser={setUser} />
        <CreateEvent path="/events/new" gameEvents={gameEvents} setGameEvents={setGameEvents}/>
        <EventList path="/events/list" gameEvents={gameEvents} setGameEvents={setGameEvents} />
        <EventDetails path="/events/:id" />
        <EditEvent path="/events/:id/edit" gameEvents={gameEvents} setGameEvents={setGameEvents} />
      </Router>
      
    </div>
  );
}

export default App;
