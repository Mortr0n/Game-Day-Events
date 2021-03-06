import React, { useState } from 'react';
import './App.css';
import Main from './views/Main';
import { Router } from '@reach/router';
import CreateEvent from './views/CreateEvent';
import EventList from './views/EventList';
import EventDetails from './views/EventDetails';
import EditEvent from './views/EditEvent';
import LogReg from './views/LogReg';
import UserAccount from './views/UserAccount';
import EditUserAccount from './views/EditUserAccount';

function App() {
  const [ gameEvents, setGameEvents ] = useState([]);
  const [ user, setUser ] = useState({});

  return (
    <div className="App">
      <Router>
        <LogReg default path="/events" />
        <UserAccount path="/user" user={user} setUser={setUser} />
        <EditUserAccount path="/users/edit/:id" user={user} setUser={setUser} />
        <Main path="/events/home" user={user} setUser={setUser} />
        <CreateEvent path="/events/new" gameEvents={gameEvents} setGameEvents={setGameEvents}/>
        <EventList path="/events/list" gameEvents={gameEvents} setGameEvents={setGameEvents} user={user} setUser={setUser} />
        <EventDetails path="/events/:id" />
        <EditEvent path="/events/:id/edit" gameEvents={gameEvents} setGameEvents={setGameEvents} />
      </Router>
      
    </div>
  );
}

export default App;
