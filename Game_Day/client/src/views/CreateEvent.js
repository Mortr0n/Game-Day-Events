import { navigate } from '@reach/router';
import axios from 'axios';
import React from 'react';
import EventForm from '../components/EventForm';
import NavBar from '../components/NavBar';

const CreateEvent = (props) => {
    const { gameEvents, setGameEvents } = props;

    // take in new game event object and post to api logging the result or error
    const createEventHandler = (gameEvent) => {
        axios.post('http://localhost:8000/api/events', gameEvent)
            .then((res) => {
                console.log(res.data);
                // add event to the gameEvents array
                setGameEvents([...gameEvents, res.data]);
                navigate('/events/list')
            })
            .catch((err) => {
                console.log(err.response);
            })
    }

    return(
        <div className='createEvent'>
            <NavBar />
            <h1 className='pageTitle'>New Event</h1>
            {/* Setting initial values for the form since it will be used for 
            both create and update */}
            
            <EventForm 
            onSubmitProp={createEventHandler}
            initialEventName=""
            initialStreetAddress=""
            initialCity=""
            initialState=""
            initialZip=""
            initialAttendeeMax=""
            initialDate=""
            initialSuggestedGame=""
            initialEventDescription=""
            />
        </div>
    )
}
export default CreateEvent;